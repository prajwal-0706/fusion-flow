"use client";

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
import { useState } from "react";

interface DeleteWorkflowDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
}

export default function DeleteWorkflowDialog({
  open,
  setOpen,
  workflowName,
}: DeleteWorkflowDialogProps) {
  const [confirmText, setConfirmText] = useState("");

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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={confirmText !== workflowName}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
