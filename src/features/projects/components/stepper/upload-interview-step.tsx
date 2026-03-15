"use client";

import { UploadDeliverableStep } from "@/features/projects/components/stepper/upload-deliverable-step";

type UploadInterviewStepProps = {
  onStart: () => void;
  onNext: () => void;
};

export function UploadInterviewStep(props: UploadInterviewStepProps) {
  return (
    <UploadDeliverableStep
      title="Upload Interview"
      description="Add the transcript of the interview conducted with the client or stakeholders. This helps Corekt understand the intent behind your analysis and cross-check it against your other artifacts."
      fileType="INTERVIEW"
      accept=".pdf"
      fileDescription="PDF format, up to 10 MB."
      {...props}
    />
  );
}
