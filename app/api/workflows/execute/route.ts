import { timingSafeEqual } from "crypto";
import { CronExpressionParser } from "cron-parser";

import prisma from "@/lib/prisma";
import { TaskRegistry } from "@/lib/workflows/tasks/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflows";
import { executeWorkflow } from "@/lib/workflows/execute-workflow";

function isValidSecret(secret: string) {
  const workflowExecutionSecret = process.env.WORKFLOW_EXECUTION_SECRET;

  if (!workflowExecutionSecret) return false;

  try {
    return timingSafeEqual(
      Buffer.from(secret),
      Buffer.from(workflowExecutionSecret),
    );
  } catch (error) {
    return false;
  }
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const secret = authHeader.split(" ")[1];

  if (!isValidSecret(secret)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const workflowId = searchParams.get("workflowId") as string;

  if (!workflowId) {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
  });

  if (!workflow) {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  let executionPlan: WorkflowExecutionPlan;
  try {
    executionPlan = JSON.parse(workflow.executionPlan!);
  } catch (error) {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  if (!executionPlan || !workflow.cron) {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  try {
    const cron = CronExpressionParser.parse(workflow.cron!);
    const nextRunAt = cron.next().toDate();
    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId,
        userId: workflow.userId,
        definition: workflow.definition,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        trigger: WorkflowExecutionTrigger.CRON,
        phases: {
          create: executionPlan.flatMap((phase) => {
            return phase.nodes.flatMap((node) => {
              return {
                userId: workflow.userId,
                status: ExecutionPhaseStatus.CREATED,
                number: phase.phase,
                node: JSON.stringify(node),
                name: TaskRegistry[node.data.type].label,
              };
            });
          }),
        },
      },
    });

    await executeWorkflow(execution.id, nextRunAt);
  } catch (error) {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }

  return new Response(null, { status: 200 });
}
