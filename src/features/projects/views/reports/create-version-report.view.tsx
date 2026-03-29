"use client";

import { XIcon } from "lucide-react";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { startAnalysisAction } from "@/features/projects/actions/issues.action";
import { ReportGenerationLoadingState } from "@/features/projects/components/states/report-generation-loading-state";
import { ImportUserStoriesStep } from "@/features/projects/components/stepper/import-user-stories-step";
import { UploadBpmnStep } from "@/features/projects/components/stepper/upload-bpmn-step";
import { UploadDataModelStep } from "@/features/projects/components/stepper/upload-data-model-step";
import { UploadInterviewStep } from "@/features/projects/components/stepper/upload-interview-step";
import { useDirtyNavigationBlocker } from "@/features/projects/hooks/use-navigation-blocker.hook";
import { useProject } from "@/features/projects/hooks/use-projects.hook";
import { useVersion } from "@/features/projects/hooks/use-versions.hook";
import type { Issue } from "@/features/projects/validation/issues.types";
import { DashboardSidebarSheet } from "@/features/shared/navigation/dashboard/dashboard-sidebar-sheet";
import { DynamicBreadcrumb } from "@/features/shared/navigation/dynamic-breadcrumb";
import { ConfirmationDialog } from "@/features/shared/ui/confirmation-dialog";
import {
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/dashboard-layout";
import { StepIndicator } from "@/features/shared/ui/step-indicator";
import { wait } from "@/lib/utils";

const TOTAL_STEPS = 4;
const ANALYSIS_RETRY_DELAY_MS = 1500;
const ANALYSIS_MAX_ATTEMPTS = 6;

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

  const hasInterviewData = (issues: Issue[]) =>
    issues.some(
      (issue) =>
        issue.sourceParsedData.fileType === "INTERVIEW" ||
        issue.targetParsedData.fileType === "INTERVIEW",
    );

  const startAnalysisWithRetry = async () => {
    let latestResult: Issue[] | undefined;

    for (let attempt = 0; attempt < ANALYSIS_MAX_ATTEMPTS; attempt++) {
      if (attempt > 0) await wait(ANALYSIS_RETRY_DELAY_MS);

      const response = await startAnalysisAction({
        projectId: params.projectId,
        versionId: params.version,
      });

      latestResult = response?.data;

      if (latestResult && hasInterviewData(latestResult)) {
        return latestResult;
      }
    }

    return latestResult;
  };

  const goToNextStep = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setIsGenerating(true);
    setGenerationFailed(false);

    const result = await startAnalysisWithRetry();

    if (result && result.length > 0) {
      setHasStarted(false);
      router.push(
        `/projects/${params.projectId}/version/${params.version}/report`,
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
            setTimeout(() => router.push(`/projects/${params.projectId}`), 150);
          }}
        />
      </div>
    </>
  );
}
