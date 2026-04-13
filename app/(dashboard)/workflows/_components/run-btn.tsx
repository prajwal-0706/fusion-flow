"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { runWorkflow } from "@/actions/workflows/run-workflow";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

export default function RunBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success("Workflow run started successfully", {
        id: workflowId,
      });
    },
    onError: () => {
      toast.error("Failed to start workflow run", {
        id: workflowId,
      });
    },
  });
  return (
    <Button
      disabled={mutation.isPending}
      variant={"outline"}
      size={"sm"}
      className="flex items-center gap-2"
      onClick={() => {
        toast.loading("Starting workflow run...", {
          id: workflowId,
        });
        mutation.mutate({ workflowId });
      }}
    >
      <PlayIcon size={10} /> Run
    </Button>
  );
}
