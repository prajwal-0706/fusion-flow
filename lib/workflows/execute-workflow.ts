import "server-only";

import { revalidatePath } from "next/cache";
import { Page } from "puppeteer";

import prisma from "../prisma";
import { WorkflowExecutionStatus } from "@/types/workflows";
import { CustomReactFlowNode } from "@/types/custom-node";
import { IEnvironment, IExecutionEnvironment } from "@/types/executor";
import { TaskParamType } from "@/types/task";
import { ExecutionPhase } from "@prisma/client";
import { TaskRegistry } from "./tasks/registry";
import { ExecuteRegistry } from "./executors/registry";
import { Edge } from "@xyflow/react";

export async function executeWorkflow(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
    },
    include: {
      workflow: true,
      phases: true,
    },
  });

  if (!execution) throw new Error("Workflow execution not found");

  const edges = JSON.parse(execution.definition).edges as Edge[];
  const environment: IEnvironment = { phases: {} };

  await initializeWorkflowExecution(executionId, execution.workflowId);
  await initializePhaseStatus(execution);

  let executionFailed = false;
  let creditsConsumed = 0;

  for (const phase of execution.phases) {
    // TODO: Consume credits
    const phaseExecution = await executeWorkflowPhase(
      phase,
      environment,
      edges,
    );
    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
  }

  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creditsConsumed,
  );

  await cleanUpEnvironment(environment);

  revalidatePath("/workflow/runs");
}

async function initializeWorkflowExecution(
  executionId: string,
  workflowId: string,
) {
  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executionId,
    },
  });
}

async function initializePhaseStatus(execution: any) {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase: any) => phase.id),
      },
    },
    data: {
      status: WorkflowExecutionStatus.PENDING,
    },
  });
}

async function finalizeWorkflowExecution(
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
  creditsConsumed: number,
) {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;

  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed,
    },
  });

  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executionId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((err) => {
      // Ignoring the workflow error as this means a newer run has been started
      console.log(
        "Ignoring workflow update error, likely due to a newer run being started",
      );
    });
}

async function executeWorkflowPhase(
  phase: ExecutionPhase,
  environment: IEnvironment,
  edges: Edge[],
) {
  const startedAt = new Date();
  const node = JSON.parse(phase.node) as CustomReactFlowNode;
  setupEnvironmentForPhase(node, environment, edges);

  // Update the phase status to RUNNING
  await prisma.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: WorkflowExecutionStatus.RUNNING,
      startedAt,
      inputs: JSON.stringify(environment.phases[node.id]?.inputs || {}),
    },
  });

  const creditsRequired = TaskRegistry[node.data.type].credits;
  console.log(
    `Executing phase ${phase.name} of type ${node.data.type}, requires ${creditsRequired} credits`,
  );

  // TODO: decrement user balance (with required credits)

  const success = await executePhase(phase, node, environment);
  const outputs = environment.phases[node.id]?.outputs;

  await finalizePhase(phase.id, success, outputs);

  return { success };
}

async function finalizePhase(phaseId: string, success: boolean, outputs: any) {
  const finalStatus = success
    ? WorkflowExecutionStatus.COMPLETED
    : WorkflowExecutionStatus.FAILED;

  await prisma.executionPhase.update({
    where: {
      id: phaseId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs),
    },
  });
}

async function executePhase(
  phase: ExecutionPhase,
  node: CustomReactFlowNode,
  environment: IEnvironment,
): Promise<boolean> {
  const runFn = ExecuteRegistry[node.data.type];
  if (!runFn) {
    console.error(
      `No execution function found for node type ${node.data.type}`,
    );
    return false;
  }
  const executionEnvironment: IExecutionEnvironment<any> =
    createExecutionEnvironment(node, environment);
  return await runFn(executionEnvironment);
}

function setupEnvironmentForPhase(
  node: CustomReactFlowNode,
  environment: IEnvironment,
  edges: Edge[],
) {
  environment.phases[node.id] = {
    inputs: {},
    outputs: {},
  };

  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];

    if (input.type === TaskParamType.BROWSER_INSTANCE) continue;

    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // This means the input is likely coming from previous node
    const connectedEdge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name,
    );

    if (!connectedEdge) {
      console.error(
        "No connected edge found for input",
        input.name,
        "of node",
        node.id,
      );
      continue;
    }

    const outputValue =
      environment.phases[connectedEdge.source]?.outputs[
        connectedEdge.sourceHandle!
      ];

    environment.phases[node.id].inputs[input.name] = outputValue;
  }
}

function createExecutionEnvironment(
  node: CustomReactFlowNode,
  environment: IEnvironment,
): IExecutionEnvironment<any> {
  return {
    getInput: (name: string) => environment.phases[node.id]?.inputs[name],
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    },
    getBrowser: () => environment.browser,
    setBrowser: (browser) => (environment.browser = browser),
    getPage: () => environment.page,
    setPage: (page: Page) => (environment.page = page),
  };
}

async function cleanUpEnvironment(environment: IEnvironment) {
  if (environment.browser) {
    await environment.browser.close().catch((err) => {
      console.error("cannot close browser, reason:", err);
    });
  }
}
