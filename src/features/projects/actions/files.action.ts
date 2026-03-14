"use server";

import z from "zod";
import {
  type Deliverable,
  DeliverableTypeSchema,
} from "@/features/projects/validation/files.schema";
import { authAction } from "@/lib/safe-actions";
import { upfetchServer } from "@/lib/up-fetch/up-fetch-server";

export const uploadFileAction = authAction
  .inputSchema(
    z.object({
      projectId: z.uuid(),
      versionId: z.uuid(),
      fileType: DeliverableTypeSchema,
      file: z.instanceof(File),
    }),
  )
  .action(async ({ parsedInput: { file, fileType, versionId, projectId } }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", fileType);

    return await upfetchServer<Deliverable>(
      `/projects/${projectId}/versions/${versionId}/files`,
      {
        method: "POST",
        body: formData,
      },
    );
  });

const UploadFormSchema = z.object({
  file: z.instanceof(File, { message: "File is required." }),
});

export type UploadForm = z.infer<typeof UploadFormSchema>;
