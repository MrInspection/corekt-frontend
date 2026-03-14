import z from "zod";

export const VersionFormSchema = z.object({
  title: z
    .string()
    .nonempty({ error: "Title is required." })
    .max(50, { error: "Title must be at most 50 characters." }),
});

export type VersionForm = z.infer<typeof VersionFormSchema>;

export const VersionSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  status: z.enum(["DRAFT", "IN_PROGRESS", "COMPLETED", "FAILED"]),
  version: z.number(),
  issues: z.object({
    minor: z.number(),
    major: z.number(),
    critical: z.number(),
    resolved: z.number(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Version = z.infer<typeof VersionSchema>;
