import z from "zod";

export const DeliverableTypeSchema = z.enum(["INTERVIEW", "BPMN", "MCD"]);

export type DeliverableType = z.infer<typeof DeliverableTypeSchema>;

export const DeliverableSchema = z.object({
  fileId: z.uuid(),
  fileName: z.string(),
  fileType: DeliverableTypeSchema,
});

export type Deliverable = z.infer<typeof DeliverableSchema>;

export const DeliverableUploadSchema = z.object({
  file: z.instanceof(File, { message: "File is required." }),
});

export type DeliverableUpload = z.infer<typeof DeliverableUploadSchema>;
