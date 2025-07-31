"use client";

import { useReactFlow } from "@xyflow/react";

import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updateWorkflow } from "@/actions/workflows/update-workflow";
import { toast } from "sonner";

export default function SaveBtn({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success("workflow saved successfully!", { id: "save-workflow" });
    },
    onError: () => {
      toast.error("Failed to save workflow, please try again!", {
        id: "save-workflow",
      });
    },
  });

  return (
    <Button
      disabled={saveMutation.isPending}
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving workflow...", { id: "save-workflow" });
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDefinition,
        });
      }}
      className="flex items-center gap-2"
      variant="outline"
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  );
}
