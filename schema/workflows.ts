import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z
    .string({
      message: "Name is required, please enter the name",
    })
    .max(50),
  description: z.string().max(80).optional(),
});

export type CreateWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;
