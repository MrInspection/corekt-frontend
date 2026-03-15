"use client";

import { UploadDeliverableStep } from "@/features/projects/components/stepper/upload-deliverable-step";

type UploadDataModelStepProps = {
  onStart: () => void;
  onNext: () => void;
};

export function UploadDataModelStep(props: UploadDataModelStepProps) {
  return (
    <UploadDeliverableStep
      title="Upload Data Model"
      description="Add the conceptual data model (MCD) of your system. Corekt will extract its entities and relations to verify their consistency with your user stories and interview transcript."
      fileType="MCD"
      accept=".mcd,.xml"
      fileDescription="JMerise MCD or XML format, up to 10 MB."
      {...props}
    />
  );
}
