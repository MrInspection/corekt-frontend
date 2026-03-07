"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/features/shared/upload/file-uploader";

type UploadInterviewStepProps = {
  onStart: () => void;
  onNext: () => void;
};

export function UploadInterviewStep({
  onStart,
  onNext,
}: UploadInterviewStepProps) {
  const handleContinue = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onNext();
  };

  return (
    <>
      <h3 className="mt-1 font-medium text-3xl tracking-tight">
        Upload Interview
      </h3>
      <p className="mt-2 max-w-(--breakpoint-sm) text-pretty text-muted-foreground">
        Add the transcript of the interview conducted with the client or
        stakeholders. This helps Corekt understand the intent behind your
        analysis and cross-check it against your other artifacts.
      </p>
      <FileUpload className="mt-10" />
      <Button size="lg" className="mt-6 w-full" onClick={handleContinue}>
        Continue <ChevronRight className="size-4" />
      </Button>
    </>
  );
}
