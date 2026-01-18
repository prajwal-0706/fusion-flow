import "server-only";

import { revalidatePath } from "next/cache";

import prisma from "../prisma";
import { WorkflowExecutionStatus } from "@/types/workflows";
import { ExecutionPhase } from "@prisma/client";
import { CustomReactFlowNode } from "@/types/custom-node";
import { TaskRegistry } from "./tasks/registry";
import { ExecuteRegistry } from "./executors/registry";
import { IEnvironment, IExecutionEnvironment } from "@/types/executor";

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

  const environment: IEnvironment = { phases: {} };

  await initializeWorkflowExecution(executionId, execution.workflowId);
  await initializePhaseStatus(execution);

  let executionFailed = false;
  let creditsConsumed = 0;

  for (const phase of execution.phases) {
    // TODO: Consume credits
    const phaseExecution = await executeWorkflowPhase(phase, environment);
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

  // TODO: Cleanup resources

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
) {
  const startedAt = new Date();
  const node = JSON.parse(phase.node) as CustomReactFlowNode;
  setupEnvironmentForPhase(node, environment);

  // Update the phase status to RUNNING
  await prisma.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: WorkflowExecutionStatus.RUNNING,
      startedAt,
    },
  });

  const creditsRequired = TaskRegistry[node.data.type].credits;
  console.log(
    `Executing phase ${phase.name} of type ${node.data.type}, requires ${creditsRequired} credits`,
  );

  // TODO: decrement user balance (with required credits)

  const success = await executePhase(phase, node, environment);

  await finalizePhase(phase.id, success);

  return { success };
}

async function finalizePhase(phaseId: string, success: boolean) {
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
) {
  environment.phases[node.id] = {
    inputs: {},
    outputs: {},
  };

  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];

    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // This means the input is likely coming from previous node
  }
}

function createExecutionEnvironment(
  node: CustomReactFlowNode,
  environment: IEnvironment,
): IExecutionEnvironment<any> {
  return {
    getInput: (name: string) => environment.phases[node.id]?.inputs[name],
  };
}
