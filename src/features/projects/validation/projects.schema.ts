import z from "zod";

export const ProjectSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string(),
  totalVersions: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectFormSchema = z.object({
  title: z.string().nonempty({ error: "Title is required." }),
  description: z
    .string()
    .nonempty({ error: "Description is required." })
    .min(10, { error: "Description must be at least 10 characters." })
    .max(500, { error: "Description must be at most 500 characters." }),
});

export type ProjectForm = z.infer<typeof ProjectFormSchema>;

export const CreateVersionSchema = z.object({
  title: z.string().nonempty({ error: "Title is required." }),
});

export type CreateVersion = z.infer<typeof CreateVersionSchema>;
