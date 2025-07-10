"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { deleteWorkflow } from "@/actions/workflows/delete-workflow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface DeleteWorkflowDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workFlowId: string;
}

export default function DeleteWorkflowDialog({
  open,
  setOpen,
  workflowName,
  workFlowId,
}: DeleteWorkflowDialogProps) {
  const [confirmText, setConfirmText] = useState("");

  const deleteMutation = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", { id: workFlowId });
      setConfirmText("");
    },
    onError: () => {
      toast.error("Failed to delete workflow", { id: workFlowId });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="!text-center">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, it will not not able to recover it.
            <div className="flex flex-col py-4 gap-4">
              <p>
                If you are sure, enter{" "}
                <b className="text-black/75 px-1.5 py-1 border rounded-md bg-muted">
                  {workflowName}
                </b>{" "}
                to confirm:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={confirmText !== workflowName || deleteMutation.isPending}
            onClick={(e) => {
              toast.loading("Deleting workflow...", { id: workFlowId });
              deleteMutation.mutate(workFlowId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
