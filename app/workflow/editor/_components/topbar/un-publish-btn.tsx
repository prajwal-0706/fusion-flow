"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon, UploadIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { unpublishWorkflow } from "@/actions/workflows/un-publish-workflow";

export default function UnpublishBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: unpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow un published successfully", {
        id: workflowId,
      });
    },
    onError: () => {
      toast.error("Failed to unpublish workflow", { id: workflowId });
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Unpublishing workflow...", {
          id: workflowId,
        });
        mutation.mutate({
          id: workflowId,
        });
      }}
      variant="outline"
      className="flex items-center gap-2"
    >
      <DownloadIcon size={16} className="stroke-orange-400" />
      Unpublish
    </Button>
  );
}
