"use server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflows";
import { revalidatePath } from "next/cache";

export async function updateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthenticated");

  const workflow = await prisma.workflow.findUnique({
    where: { id, userId },
  });

  if (!workflow) throw new Error("Workflow not found");

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Only draft workflows can be updated");
  }

  await prisma.workflow.update({
    where: { id, userId },
    data: {
      definition,
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/workflows/${id}`);
}
