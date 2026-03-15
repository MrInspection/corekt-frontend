"use client";

import { UploadDeliverableStep } from "@/features/projects/components/stepper/upload-deliverable-step";

type UploadBpmnStepProps = {
  onStart: () => void;
  onNext: () => void;
};

export function UploadBpmnStep(props: UploadBpmnStepProps) {
  return (
    <UploadDeliverableStep
      title="Upload BPMN Diagram"
      description="Add the BPMN diagram modeling your business processes. Corekt will parse its actors, activities, and flows to cross-check them against your interview transcript and other artifacts."
      fileType="BPMN"
      accept=".bpmn,.xml"
      fileDescription="BPMN or XML format, up to 10 MB."
      {...props}
    />
  );
}
