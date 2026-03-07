import z from "zod";

export const CreateProjectSchema = z.object({
  title: z.string().nonempty({ error: "Title is required." }),
  description: z
    .string()
    .nonempty({ error: "Description is required." })
    .min(10, { error: "Description must be at least 10 characters." })
    .max(500, { error: "Description must be at most 500 characters." }),
});

export type ProjectType = z.infer<typeof CreateProjectSchema>;

export const CreateVersionSchema = z.object({
  title: z.string().nonempty({ error: "Title is required." }),
});

export type CreateVersionType = z.infer<typeof CreateVersionSchema>;
