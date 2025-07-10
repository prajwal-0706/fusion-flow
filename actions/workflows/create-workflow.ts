"use server";

import { auth } from "@clerk/nextjs/server";

import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schema/workflows";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflows";
import { redirect } from "next/navigation";

export async function createWorkflow(form: CreateWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) throw new Error("Invalid form data");

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthenticated");

  const res = await prisma.workflow.create({
    data: {
      userId,
      definition: "TODO",
      status: WorkflowStatus.DRAFT,
      ...data,
    },
  });

  if (!res) throw new Error("Failed to create a workflow, please try again!");

  redirect(`/workflow/editor/${res.id}`);
}
