import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import WorkflowEditor from "../_components/editor";

export default async function EdiorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = params;
  const { userId } = await auth();

  if (!userId) {
    return <div>UnAuthenticated</div>;
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId: userId,
    },
  });

  if (!workflow) {
    return <div className="">No workflow found for this ID: {workflowId}</div>;
  }

  return <WorkflowEditor workflow={workflow} />;
}
