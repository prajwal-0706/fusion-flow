"use server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { WorkflowExecutionPlan } from "@/types/workflows";
import FlowToExecutionPlan from "@/lib/workflows/execution-plan";

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
    parsedFlowDefinition.edges
  );

  if (result.error) {
    throw new Error("Invalid flow definition");
  }

  if (!result.executionPlan) {
    throw new Error("Failed to generate execution plan, please try again");
  }

  executionPlan = result.executionPlan;
  console.log("Execution Plan:", executionPlan);
}
