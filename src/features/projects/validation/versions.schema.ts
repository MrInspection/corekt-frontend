import z from "zod";

export const VersionFormSchema = z.object({
  title: z
    .string()
    .nonempty({ error: "Title is required." })
    .max(50, { error: "Title must be at most 50 characters." }),
});

export type VersionForm = z.infer<typeof VersionFormSchema>;

export const ParsedDataRefSchema = z.object({
  parsedDataId: z.string(),
  dataType: z.enum(["ACTOR", "FLOW", "ACTION", "US", "ENTITY", "RELATION"]),
  content: z.string(),
  fileId: z.string(),
  fileName: z.string(),
  fileType: z.enum(["BPMN", "US", "INTERVIEW", "MCD"]),
});

export const IssueSchema = z.object({
  id: z.string(),
  match: z.enum(["EXACT", "SEMANTIC", "MISSING"]),
  severity: z.enum(["CRITICAL", "MAJOR", "MINOR"]),
  confidenceScore: z.number(),
  justification: z.string(),
  suggestion: z.string().nullable(),
  sourceParsedData: ParsedDataRefSchema,
  targetParsedData: ParsedDataRefSchema,
});

export const VersionSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  status: z.enum(["DRAFT", "IN_PROGRESS", "COMPLETED", "FAILED"]),
  summary: z.string(),
  version: z.number(),
  issues: z.object({
    minor: z.number(),
    major: z.number(),
    critical: z.number(),
    resolved: z.number(),
  }),
  dataLinks: z.array(IssueSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Version = z.infer<typeof VersionSchema>;
