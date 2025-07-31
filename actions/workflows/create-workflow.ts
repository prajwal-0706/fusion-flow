"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Edge } from "@xyflow/react";

import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schema/workflows";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflows";
import { CustomReactFlowNode } from "@/types/custom-node";
import { CreateWorkflowNode } from "@/lib/workflows/create-workflow-node";
import { TaskType } from "@/types/task";

export async function createWorkflow(form: CreateWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) throw new Error("Invalid form data");

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthenticated");

  const initialFlow: { nodes: CustomReactFlowNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  initialFlow.nodes.push(CreateWorkflowNode(TaskType.LAUNCH_BROWSER));

  const res = await prisma.workflow.create({
    data: {
      userId,
      definition: JSON.stringify(initialFlow),
      status: WorkflowStatus.DRAFT,
      ...data,
    },
  });

  if (!res) throw new Error("Failed to create a workflow, please try again!");

  redirect(`/workflow/editor/${res.id}`);
}
