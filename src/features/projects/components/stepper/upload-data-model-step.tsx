"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/features/shared/upload/file-uploader";

type UploadDataModelStepProps = {
  onStart: () => void;
  onNext: () => void;
};

export function UploadDataModelStep({
  onStart,
  onNext,
}: UploadDataModelStepProps) {
  const handleContinue = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onNext();
  };

  return (
    <>
      <h3 className="mt-1 font-medium text-3xl tracking-tight">
        Upload Data Model
      </h3>
      <p className="mt-2 max-w-(--breakpoint-sm) text-pretty text-muted-foreground">
        Add the conceptual data model (MCD) of your system. Corekt will extract
        its entities and relations to verify their consistency with your user
        stories and interview transcript.
      </p>
      <FileUpload className="mt-10" />
      <Button size="lg" className="mt-6 w-full" onClick={handleContinue}>
        Continue <ChevronRight className="size-4" />
      </Button>
    </>
  );
}
