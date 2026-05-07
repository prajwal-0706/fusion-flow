import prisma from "@/lib/prisma";
import { getAppUrl } from "@/lib/helpers/app-url";
import { WorkflowStatus } from "@/types/workflows";

function triggerWorkflow(workflowId: string) {
  const triggerApiUrl = getAppUrl(
    `api/workflows/execute?workflowId=${workflowId}`,
  );

  fetch(triggerApiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.WORKFLOW_EXECUTION_SECRET}`,
    },
    cache: "no-store",
  }).catch((error) => {
    console.error(`Failed to trigger workflow ${workflowId}:`, error);
  });
}

export async function GET(req: Request) {
  const now = new Date();
  const workflows = await prisma.workflow.findMany({
    select: { id: true },
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: { not: null },
      nextRunAt: { lte: now },
    },
  });

  for (const workflow of workflows) {
    triggerWorkflow(workflow.id);
  }

  return Response.json(
    { workflowsTriggered: workflows.length },
    { status: 200 },
  );
}
