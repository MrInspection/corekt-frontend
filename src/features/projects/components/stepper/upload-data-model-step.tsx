"use client";

import { useForm } from "@tanstack/react-form";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { uploadFileAction } from "@/features/projects/actions/files.action";
import { DeliverableUploadSchema } from "@/features/projects/validation/files.schema";
import FileUpload from "@/features/shared/upload/file-uploader";

type UploadDataModelStepProps = {
  onStart: () => void;
  onNext: () => void;
};

export function UploadDataModelStep({ onStart, onNext }: UploadDataModelStepProps) {
  const { projectId, version } = useParams<{ projectId: string; version: string }>();

  const form = useForm({
    defaultValues: { file: null as File | null },
    validators: { onSubmit: DeliverableUploadSchema },
    onSubmit: async ({ value }) => {
      await uploadFileAction({
        projectId,
        versionId: version,
        fileType: "MCD",
        file: value.file!,
      });
      onNext();
    },
  });

  return (
    <>
      <h3 className="mt-1 font-medium text-3xl tracking-tight">Upload Data Model</h3>
      <p className="mt-2 max-w-(--breakpoint-sm) text-pretty text-muted-foreground">
        Add the conceptual data model (MCD) of your system. Corekt will extract its entities and
        relations to verify their consistency with your user stories and interview transcript.
      </p>
      <form
        id="upload-data-model-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="file">
          {(field) => (
            <FileUpload
              className="mt-10"
              accept=".mcd,.xml"
              description="JMerise MCD or XML format, up to 10 MB."
              onFileChange={(file) => {
                if (file) onStart();
                field.handleChange(file);
              }}
              externalErrors={
                field.state.meta.isTouched ? field.state.meta.errors.map(String) : []
              }
            />
          )}
        </form.Field>
        <form.Subscribe selector={(state) => ({ isSubmitting: state.isSubmitting, file: state.values.file })}>
          {({ isSubmitting, file }) => (
            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              disabled={!file || isSubmitting}
              isLoading={isSubmitting}
              isLoadingText="Uploading..."
            >
              Continue <ChevronRight className="size-4" />
            </Button>
          )}
        </form.Subscribe>
      </form>
    </>
  );
}
