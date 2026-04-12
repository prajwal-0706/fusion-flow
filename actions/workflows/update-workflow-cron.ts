"use server";

import { auth } from "@clerk/nextjs/server";
import { CronExpressionParser } from "cron-parser";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export async function updateWorkflowCron({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const interval = CronExpressionParser.parse(cron);
    console.log("Parsed cron interval:", interval);
    await prisma.workflow.update({
      where: { id, userId },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
  } catch (error: any) {
    console.log("invalid cron expression:", error.message);
    throw new Error("Invalid cron expression");
  }

  revalidatePath("/workflows");
}
