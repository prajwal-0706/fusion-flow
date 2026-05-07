"use client";

import { useCallback, useState } from "react";
import { CopyIcon, Layers2Icon, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomDialogHeader from "@/components/shared/custom-dialog-header";
import { useForm } from "react-hook-form";
import {
  DuplicateWorkflowSchemaType,
  duplicateWorkflowSchema,
} from "@/schema/workflows";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { duplicateWorkflow } from "@/actions/workflows/duplicate-workflow";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Workflow } from "@prisma/client";

export default function DuplicateWorkflowDialog({
  initialValues,
}: {
  initialValues: Workflow;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<DuplicateWorkflowSchemaType>({
    resolver: zodResolver(duplicateWorkflowSchema),
    defaultValues: {
      name: `${initialValues.name} Copy`,
      description: initialValues.description || "",
      workflowId: initialValues.id,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: duplicateWorkflow,
    onSuccess: () => {
      toast.success("Workflow duplicated", { id: "duplicate-workflow" });
      setIsOpen((prev) => !prev);
    },
    onError: () => {
      toast.success("Failed to duplicate workflow", {
        id: "duplicate-workflow",
      });
    },
  });

  const onSubmit = useCallback(
    (values: DuplicateWorkflowSchemaType) => {
      toast.loading("Creating Workflow...", { id: "duplicate-workflow" });
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        form.reset();
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "ml-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100",
          )}
        >
          <CopyIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <CustomDialogHeader icon={Layers2Icon} title="Duplicate Workflow" />
        <div className="p-2">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Create a new user" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="e.g. This workflow is used to create a new user in the database."
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your workflow in a few sentences.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className="w-full">
                {!isPending ? "Proceed" : <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
