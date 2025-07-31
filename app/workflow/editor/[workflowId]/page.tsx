import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import WorkflowEditor from "../_components/editor";

export default async function EditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = params;
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId: userId,
    },
  });

  if (!workflow) {
    return redirect("/workflows");
  }

  return <WorkflowEditor workflow={workflow} />;
}
