import { Loader2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

import { getWorkflowExecutionWithPhases } from "@/actions/workflows/get-workflow-execution";
import Topbar from "@/app/workflow/editor/_components/topbar/topbar";
import ExecutionViewer from "../_components/execution-viewer";

export default function ExecutionPage({
  params,
}: {
  params: { workFlowId: string; executionId: string };
}) {
  const { workFlowId, executionId } = params;
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        subtitle={`Run ID: ${executionId}`}
        workflowId={workFlowId}
        title="Workflow Run Details"
        hideActions={true}
      />

      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full w-full">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExectionViewWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
}

async function ExectionViewWrapper({ executionId }: { executionId: string }) {
  const workflowExecution = await getWorkflowExecutionWithPhases(executionId);

  if (!workflowExecution) {
    toast.error("Workflow execution not found");
    redirect("/workflows");
  }

  return <ExecutionViewer initialExecution={workflowExecution} />;
}
