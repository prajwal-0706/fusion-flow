"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";

import useExecutionPlan from "@/hooks/use-execution-plan";

import { publishWorkflow } from "@/actions/workflows/publish-workflow";

export default function PublishBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const mutation = useMutation({
    mutationFn: publishWorkflow,
    onSuccess: () => {
      toast.success("Workflow published successfully", {
        id: workflowId,
      });
    },
    onError: () => {
      toast.error("Failed to publish workflow", { id: workflowId });
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
        toast.loading("Publishing workflow...", {
          id: workflowId,
        });
        mutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
      variant="outline"
      className="flex items-center gap-2"
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  );
}
