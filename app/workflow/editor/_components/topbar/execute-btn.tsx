"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";

import useExecutionPlan from "@/hooks/use-execution-plan";
import { runWorkflow } from "@/actions/workflows/run-workflow";

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success("Workflow execution started", { id: "workflow-execution" });
    },
    onError: () => {
      toast.error("Workflow execution failed", { id: "workflow-execution" });
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          // As this is the client side validation, we just return
          return;
        }

        mutation.mutate({
          workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
      variant="outline"
      className="flex items-center gap-2"
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
}
