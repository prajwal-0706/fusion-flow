"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import CronExpressionParser from "cron-parser";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomDialogHeader from "@/components/shared/custom-dialog-header";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { updateWorkflowCron } from "@/actions/workflows/update-workflow-cron";
import { removeWorkflowCron } from "@/actions/workflows/remove-workflow-cron";
import { Separator } from "@/components/ui/separator";

export default function SchedulerDialog({
  cron: initialCron,
  workflowId,
}: {
  cron: string | null;
  workflowId: string;
}) {
  const [cron, setCron] = useState(initialCron || "");
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");
  const mutation = useMutation({
    mutationFn: updateWorkflowCron,
    onSuccess: () => {
      toast.success("Workflow schedule updated successfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Failed to update workflow schedule", { id: "cron" });
    },
  });

  const removeScheduleMutation = useMutation({
    mutationFn: removeWorkflowCron,
    onSuccess: () => {
      toast.success("Workflow schedule removed successfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Failed to remove workflow schedule", { id: "cron" });
    },
  });

  useEffect(() => {
    try {
      CronExpressionParser.parse(cron);
      const humanReadable = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanReadable);
    } catch (error) {
      setValidCron(false);
      setReadableCron("");
    }
  }, [cron]);

  const workflowValidCron = initialCron && initialCron.length > 0;
  const readableSavedCron =
    workflowValidCron && cronstrue.toString(initialCron!);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          size={"sm"}
          className={cn(
            "text-sm p-0 h-auto text-orange-500",
            workflowValidCron && "text-primary",
          )}
        >
          {workflowValidCron && (
            <div className="flex items-center gap-2">
              <ClockIcon />
              {readableSavedCron}
            </div>
          )}
          {!workflowValidCron && (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="h-3 w-3 mr-1" /> Set Schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={CalendarIcon}
          title="Schedule workflow execution"
        />
        <div className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Specify a cron expression to schedule periodic workflow execution.
            For example,{" "}
            <code className="bg-muted px-1 rounded">0 0 * * *</code> will run
            the workflow every day at midnight.
          </p>
          <Input
            value={cron}
            onChange={(e) => setCron(e.target.value)}
            placeholder="E.g: * * * * *"
          />
          {cron && (
            <div
              className={cn(
                "bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
                validCron && "border-primary text-primary",
              )}
            >
              {validCron ? readableCron : "Not a valid cron expression"}
            </div>
          )}
          {workflowValidCron && (
            <DialogClose asChild>
              <div>
                <Button
                  variant={"outline"}
                  disabled={
                    mutation.isPending || removeScheduleMutation.isPending
                  }
                  className="w-full text-destructive border-destructive hover:bg-destructive"
                  onClick={() => {
                    toast.loading("Removing schedule...", { id: "cron" });
                    removeScheduleMutation.mutate(workflowId);
                  }}
                >
                  Remove current schedule
                </Button>
                <Separator className="my-4" />
              </div>
            </DialogClose>
          )}
        </div>
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button className="w-full" variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={mutation.isPending || !validCron}
              onClick={() => {
                toast.loading("Saving...", { id: "cron" });
                mutation.mutate({ id: workflowId, cron });
              }}
              className="w-full"
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
