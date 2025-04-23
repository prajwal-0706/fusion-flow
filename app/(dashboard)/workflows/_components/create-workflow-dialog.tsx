"use client";

import { useState } from "react";
import { Layers2Icon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomDialogHeader from "@/components/shared/custom-dialog-header";

export default function CreateWorkflowDialog({
  triggerText,
}: {
  triggerText?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subtitle="Start building your workflow"
        />
      </DialogContent>
    </Dialog>
  );
}
