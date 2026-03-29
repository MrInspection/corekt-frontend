"use server";

import z from "zod";
import type { Issue } from "@/features/projects/validation/issues.types";
import { actionClient, authAction } from "@/lib/safe-actions";
import { upfetchServer } from "@/lib/up-fetch/up-fetch-server";

export const startAnalysisAction = actionClient
  .inputSchema(
    z.object({
      versionId: z.uuid(),
      projectId: z.uuid(),
    }),
  )
  .action(async ({ parsedInput: payload }) => {
    const { versionId, projectId } = payload;
    return await upfetchServer<Issue[]>(
      `/projects/${projectId}/versions/${versionId}/analysis/start`,
      { method: "GET" },
    );
  });

export const deleteDatalinkAction = actionClient
  .inputSchema(
    z.object({
      versionId: z.uuid(),
      projectId: z.uuid(),
      datalinkId: z.uuid(),
    }),
  )
  .action(async ({ parsedInput: payload }) => {
    const { versionId, projectId, datalinkId } = payload;
    return await upfetchServer(
      `/projects/${projectId}/versions/${versionId}/analysis/datalink/${datalinkId}`,
      {
        method: "DELETE",
      },
    );
  });

export const exportReportToPDFAction = authAction
  .inputSchema(
    z.object({
      versionId: z.uuid(),
      projectId: z.uuid(),
    }),
  )
  .action(async ({ parsedInput: payload }): Promise<ArrayBuffer> => {
    const { versionId, projectId } = payload;
    return await upfetchServer(
      `/projects/${projectId}/versions/${versionId}/export/pdf`,
      {
        method: "GET",
        parseResponse: (res) => res.arrayBuffer(),
      },
    );
  });
