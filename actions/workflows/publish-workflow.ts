"use server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflows";
import FlowToExecutionPlan from "@/lib/workflows/execution-plan";
import { calculateWorkflowCreditCost } from "@/lib/helpers/credits";
import { revalidatePath } from "next/cache";

export async function publishWorkflow({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const workflow = await prisma.workflow.findUnique({
    where: { id, userId },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not a draft");
  }

  let flow;
  try {
    flow = JSON.parse(flowDefinition);
  } catch (error) {
    throw new Error("Invalid flow definition");
  }

  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("flow definition is invalid: " + result.error);
  }

  if (!result.executionPlan) {
    throw new Error("Failed to generate execution plan");
  }

  const creditsCost = calculateWorkflowCreditCost(flow.nodes);

  await prisma.workflow.update({
    where: { id },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkflowStatus.PUBLISHED,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}
