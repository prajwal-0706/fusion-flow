import { getWorkflowExecutions } from "@/actions/workflows/get-workflow-executions";
import Topbar from "../../editor/_components/topbar/topbar";
import { Suspense } from "react";
import { InboxIcon } from "lucide-react";
import CustomLoading from "@/components/globals/custom-loading";
import ExecutionTable from "../_components/execution-table";

interface IExecutionWorkflow {
  workflowId: string;
}

export default function ExecutionsPage({
  params,
}: {
  params: IExecutionWorkflow;
}) {
  return (
    <div className="h-full w-full overflow-auto">
      <Topbar
        hideActions
        title="All Runs"
        subtitle="List of all your workflow runs"
        workflowId={params.workflowId}
      />
      <Suspense fallback={<CustomLoading />}>
        <ExecutionTableWrapper workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
}

async function ExecutionTableWrapper({ workflowId }: IExecutionWorkflow) {
  const executions = await getWorkflowExecutions(workflowId);

  if (!executions || executions.length === 0) {
    return (
      <div className="container w-full py-6">
        <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="font-bold">
              No Runs have triggered yet for this workflow
            </p>
            <p className="text-muted-foreground">
              Once you trigger a new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container w-full py-6">
      <ExecutionTable initialData={executions} workflowId={workflowId} />
    </div>
  );
}
