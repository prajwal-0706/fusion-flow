"use client";

import { useCallback, useState } from "react";
import { Layers2Icon, Loader2 } from "lucide-react";
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
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schema/workflows";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createWorkflow } from "@/actions/workflows/create-workflow";
import { toast } from "sonner";

export default function CreateWorkflowDialog({
  triggerText,
}: {
  triggerText?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      toast.success("Workflow Created", { id: "create-workflow" });
    },
    onError: () => {
      toast.success("Failedm to create workflow", { id: "create-workflow" });
    },
  });

  const onSubmit = useCallback(
    (values: CreateWorkflowSchemaType) => {
      toast.loading("Creating Workflow..."), { id: "create-workflow" };
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      form.reset();
      setIsOpen(open);
    }}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subtitle="Start building your workflow"
        />
        <div className="p6">
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
