"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflows";
import FlowToExecutionPlan from "@/lib/workflows/execution-plan";
import { TaskRegistry } from "@/lib/workflows/tasks/registry";
import { executeWorkflow } from "@/lib/workflows/execute-workflow";

export interface RunWorkflowSchema {
  workflowId: string;
  flowDefinition?: string;
}

export async function runWorkflow(form: RunWorkflowSchema) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const { workflowId, flowDefinition } = form;

  if (!workflowId) {
    throw new Error("Workflow ID is required");
  }

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId, userId },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;
  if (!flowDefinition) {
    throw new Error("Flow definition is required");
  }

  const parsedFlowDefinition = (() => {
    try {
      return JSON.parse(flowDefinition);
    } catch (e) {
      throw new Error("Invalid flow definition: not a valid JSON string.");
    }
  })();

  const result = FlowToExecutionPlan(
    parsedFlowDefinition.nodes,
    parsedFlowDefinition.edges,
  );

  if (result.error) {
    throw new Error("Invalid flow definition");
  }

  if (!result.executionPlan) {
    throw new Error("Failed to generate execution plan, please try again");
  }

  executionPlan = result.executionPlan;
  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("Workflow execution not created");
  }

  executeWorkflow(execution.id);
  redirect(`/workflow/runs/${workflow.id}/${execution.id}`);
}
