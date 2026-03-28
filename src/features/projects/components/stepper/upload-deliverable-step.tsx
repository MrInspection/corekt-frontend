"use client";

import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { type SyntheticEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { uploadFileAction } from "@/features/projects/actions/files.action";
import type { DeliverableType } from "@/features/projects/validation/files.schema";
import FileUpload from "@/features/shared/upload/file-uploader";

type UploadDeliverableStepProps = {
  title: string;
  description: string;
  fileType: DeliverableType;
  accept: string;
  fileDescription: string;
  onStart: () => void;
  onNext: () => void;
};

export function UploadDeliverableStep({
  title,
  description,
  fileType,
  accept,
  fileDescription,
  onStart,
  onNext,
}: UploadDeliverableStepProps) {
  const { projectId, version } = useParams<{
    projectId: string;
    version: string;
  }>();
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    startTransition(async () => {
      const result = await uploadFileAction({
        projectId,
        versionId: version,
        fileType,
        file,
      });
      if (result.serverError || result.validationErrors) return;
      onNext();
    });
  };

  return (
    <>
      <h3 className="mt-1 font-medium text-3xl tracking-tight">{title}</h3>
      <p className="mt-2 max-w-(--breakpoint-sm) text-pretty text-base text-muted-foreground max-sm:text-sm">
        {description}
      </p>
      <form onSubmit={handleSubmit}>
        <FileUpload
          className="mt-10"
          accept={accept}
          description={fileDescription}
          onFileChange={(selectedFile) => {
            if (selectedFile) onStart();
            setFile(selectedFile);
          }}
        />
        <Button
          type="submit"
          size="lg"
          className="mt-6 w-full"
          disabled={!file || isPending}
          isLoading={isPending}
          isLoadingText="Uploading..."
        >
          Continue <ChevronRight className="size-4" />
        </Button>
      </form>
    </>
  );
}
