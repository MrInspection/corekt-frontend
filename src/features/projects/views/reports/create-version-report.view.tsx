"use client";

import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImportUserStoriesStep } from "@/features/projects/components/stepper/import-user-stories-step";
import { UploadBpmnStep } from "@/features/projects/components/stepper/upload-bpmn-step";
import { UploadDataModelStep } from "@/features/projects/components/stepper/upload-data-model-step";
import { UploadInterviewStep } from "@/features/projects/components/stepper/upload-interview-step";
import { useDirtyNavigationBlocker } from "@/features/projects/hooks/use-navigation-blocker.hook";
import { ConfirmationDialog } from "@/features/shared/ui/confirmation-dialog";
import {
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/layouts/dashboard-layout";
import { StepIndicator } from "@/features/shared/ui/step-indicator";

const TOTAL_STEPS = 4;

export function CreateVersionReportView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasStarted, setHasStarted] = useState(true);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const { controls } = useDirtyNavigationBlocker({ isDirty: hasStarted });

  const goToNextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));

  const stepProps = {
    onStart: () => setHasStarted(true),
    onNext: goToNextStep,
  };

  const handleCancel = () => {
    if (hasStarted) {
      setOpenCancelDialog(true);
    }
  };

  const cancelConfirmationDialog = (
    <ConfirmationDialog
      content={{
        title: "Cancel creation?",
        description:
          "Are you sure you want to cancel the creation process of your report?",
        confirmText: "Yes, quit",
      }}
      open={openCancelDialog}
      onOpenChange={setOpenCancelDialog}
      onConfirm={() => {
        setHasStarted(false);
        setOpenCancelDialog(false);
      }}
    />
  );

  return (
    <>
      <DashboardHeader className="flex items-center justify-between">
        <h3 className="font-semibold">Report generator</h3>
        <Button
          size="xs"
          variant="ghost"
          onClick={() => setOpenCancelDialog(true)}
        >
          <XIcon /> Cancel
        </Button>
      </DashboardHeader>
      <motion.div animate={controls} className="flex flex-1 flex-col">
        <DashboardContent className="container flex max-w-3xl flex-col justify-center">
          <div className="text-muted-foreground text-sm">
            Step {currentStep} of {TOTAL_STEPS}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              {currentStep === 1 && <UploadInterviewStep {...stepProps} />}
              {currentStep === 2 && <ImportUserStoriesStep {...stepProps} />}
              {currentStep === 3 && <UploadBpmnStep {...stepProps} />}
              {currentStep === 4 && <UploadDataModelStep {...stepProps} />}
            </motion.div>
          </AnimatePresence>
          <StepIndicator
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            className="mt-10"
          />
        </DashboardContent>
      </motion.div>
      {cancelConfirmationDialog}
    </>
  );
}
