"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/features/shared/upload/file-uploader";

type UploadBpmnStepProps = {
  onStart: () => void;
  onNext: () => void;
};

export function UploadBpmnStep({ onStart, onNext }: UploadBpmnStepProps) {
  const handleContinue = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onNext();
  };

  return (
    <>
      <h3 className="mt-1 font-medium text-3xl tracking-tight">
        Upload BPMN Diagram
      </h3>
      <p className="mt-2 max-w-(--breakpoint-sm) text-pretty text-muted-foreground">
        Add the BPMN diagram modeling your business processes. Corekt will parse
        its actors, activities, and flows to cross-check them against your
        interview transcript and other artifacts.
      </p>
      <FileUpload className="mt-10" />
      <Button size="lg" className="mt-6 w-full" onClick={handleContinue}>
        Continue <ChevronRight className="size-4" />
      </Button>
    </>
  );
}
