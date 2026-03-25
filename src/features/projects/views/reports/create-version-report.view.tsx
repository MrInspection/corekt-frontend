"use client";

import { XIcon } from "lucide-react";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { getIssuesAction } from "@/features/projects/actions/issues.action";
import { ReportGenerationLoadingState } from "@/features/projects/components/states/report-generation-loading-state";
import { ImportUserStoriesStep } from "@/features/projects/components/stepper/import-user-stories-step";
import { UploadBpmnStep } from "@/features/projects/components/stepper/upload-bpmn-step";
import { UploadDataModelStep } from "@/features/projects/components/stepper/upload-data-model-step";
import { UploadInterviewStep } from "@/features/projects/components/stepper/upload-interview-step";
import { useDirtyNavigationBlocker } from "@/features/projects/hooks/use-navigation-blocker.hook";
import { useProject } from "@/features/projects/hooks/use-projects.hook";
import { useVersion } from "@/features/projects/hooks/use-versions.hook";
import { DashboardSidebarSheet } from "@/features/shared/navigation/dashboard/dashboard-sidebar-sheet";
import { DynamicBreadcrumb } from "@/features/shared/navigation/dynamic-breadcrumb";
import { ConfirmationDialog } from "@/features/shared/ui/confirmation-dialog";
import {
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/dashboard-layout";
import { StepIndicator } from "@/features/shared/ui/step-indicator";

const TOTAL_STEPS = 4;

export function CreateVersionReportView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationFailed, setGenerationFailed] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const router = useRouter();
  const { controls } = useDirtyNavigationBlocker({ isDirty: hasStarted });
  const params = useParams<{ projectId: string; version: string }>();

  const { userId } = useAuth();
  useProject(params.projectId, userId);

  const { data: version } = useVersion({
    projectId: params.projectId,
    versionId: params.version,
  });

  const goToNextStep = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setIsGenerating(true);
    setGenerationFailed(false);

    const result = await getIssuesAction({
      projectId: params.projectId,
      versionId: params.version,
    });

    if (result?.data) {
      router.push(
        `/dashboard/projects/${params.projectId}/version/${params.version}`,
      );
      return;
    }

    setIsGenerating(false);
    setGenerationFailed(true);
  };

  const stepProps = {
    onStart: () => setHasStarted(true),
    onNext: goToNextStep,
  };

  return (
    <>
      <DashboardHeader className="flex items-center justify-between">
        <div className="inline-flex shrink-0 items-center gap-2">
          <DashboardSidebarSheet />
          <DynamicBreadcrumb
            hrefOverrides={{ projects: "/dashboard" }}
            labelOverrides={{ version: `v${version?.version}` }}
            skippedSegments={["version"]}
          />
        </div>
        {!isGenerating && (
          <Button
            size="xs"
            variant="ghost"
            onClick={() => setOpenCancelDialog(true)}
          >
            <XIcon /> Cancel
          </Button>
        )}
      </DashboardHeader>
      <motion.div animate={controls} className="flex flex-1 flex-col">
        {isGenerating ? (
          <ReportGenerationLoadingState />
        ) : (
          <DashboardContent className="container flex max-w-3xl flex-col justify-center">
            <div className="text-muted-foreground text-sm">
              Step {currentStep} of {TOTAL_STEPS}
            </div>
            {generationFailed && (
              <p className="text-destructive text-sm">
                Analysis failed. Please try again.
              </p>
            )}
            {currentStep === 1 && <UploadInterviewStep {...stepProps} />}
            {currentStep === 2 && <ImportUserStoriesStep {...stepProps} />}
            {currentStep === 3 && <UploadBpmnStep {...stepProps} />}
            {currentStep === 4 && <UploadDataModelStep {...stepProps} />}
            <StepIndicator
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              className="mt-10"
            />
          </DashboardContent>
        )}
      </motion.div>
      <div role="alertdialog">
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
      </div>
    </>
  );
}
