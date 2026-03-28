"use client";

import { GitCompare, XIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { CompareSection } from "@/features/projects/components/comparator/compare-section";
import { ComparisonPanel } from "@/features/projects/components/comparator/comparison-panel";
import { VersionPickerDropdown } from "@/features/projects/components/comparator/version-picker-dropdown";
import { useVersionIssues } from "@/features/projects/hooks/use-issues.hook";
import { useProject } from "@/features/projects/hooks/use-projects.hook";
import {
  useVersion,
  useVersions,
} from "@/features/projects/hooks/use-versions.hook";
import { computeIssueStats } from "@/features/projects/utils/issues-stats.utils";
import type { Version } from "@/features/projects/validation/versions.schema";
import { DashboardSidebarSheet } from "@/features/shared/navigation/dashboard/dashboard-sidebar-sheet";
import { DynamicBreadcrumb } from "@/features/shared/navigation/dynamic-breadcrumb";
import {
  DashboardActionBar,
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/dashboard-layout";

export function CompareVersionsView() {
  const params = useParams<{ projectId: string; version: string }>();
  const { userId } = useAuth();
  useProject(params.projectId, userId);

  const { data: version } = useVersion({
    projectId: params.projectId,
    versionId: params.version,
  });

  const { getVersions } = useVersions({ projectId: params.projectId });

  const [currentVersion, setCurrentVersion] = useState<Version | null>(null);
  const [compareVersion, setCompareVersion] = useState<Version | null>(null);

  useEffect(() => {
    if (version) setCurrentVersion(version);
  }, [version]);

  const { getIssues: getCurrentIssues } = useVersionIssues({
    projectId: params.projectId,
    versionId: currentVersion?.id ?? "",
  });

  const { getIssues: getCompareIssues } = useVersionIssues({
    projectId: params.projectId,
    versionId: compareVersion?.id ?? "",
  });

  const currentStats = useMemo(
    () => computeIssueStats(getCurrentIssues.data ?? []),
    [getCurrentIssues.data],
  );

  const compareStats = useMemo(
    () => computeIssueStats(getCompareIssues.data ?? []),
    [getCompareIssues.data],
  );

  const currentVersionLabel = currentVersion
    ? `v${currentVersion.version} · ${currentVersion.title} (current)`
    : "Select version";

  const compareVersionLabel = compareVersion
    ? `v${compareVersion.version} · ${compareVersion.title}`
    : "Select version";

  return (
    <>
      <DashboardHeader>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="inline-flex shrink-0 items-center gap-2">
            <DashboardSidebarSheet />
            <DynamicBreadcrumb
              hrefOverrides={{ projects: "/dashboard" }}
              labelOverrides={{
                version: version ? `v${version.version}` : "...",
                compare: "Compare Versions",
              }}
              skippedSegments={["version"]}
            />
          </div>
        </div>
      </DashboardHeader>

      <DashboardActionBar className="overflow-hidden bg-gray-50">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <ButtonGroup>
            <Button variant="outline" size="xs" className="hover:bg-background">
              <GitCompare /> Compare
            </Button>
            <VersionPickerDropdown
              versions={getVersions.data ?? []}
              selected={currentVersion}
              onSelect={setCurrentVersion}
            />
            <Button variant="outline" size="xs" className="hover:bg-background">
              with
            </Button>
            <VersionPickerDropdown
              versions={getVersions.data ?? []}
              selected={compareVersion}
              excludedVersionId={currentVersion?.id}
              onSelect={setCompareVersion}
            />
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => {
                      setCurrentVersion(null);
                      setCompareVersion(null);
                    }}
                  />
                }
              >
                <XIcon />
              </TooltipTrigger>
              <TooltipContent side="bottom">Clear comparison</TooltipContent>
            </Tooltip>
          </ButtonGroup>
        </div>
      </DashboardActionBar>

      <DashboardContent className="grid flex-1 divide-y overflow-hidden md:grid-cols-2 md:divide-x md:divide-y-0">
        <ComparisonPanel
          label={currentVersionLabel}
          isEmpty={currentVersion === null}
        >
          <CompareSection
            issues={getCurrentIssues.data ?? []}
            isPending={getCurrentIssues.isPending}
            stats={currentStats}
          />
        </ComparisonPanel>
        <ComparisonPanel
          label={compareVersionLabel}
          isEmpty={compareVersion === null}
        >
          <CompareSection
            issues={getCompareIssues.data ?? []}
            isPending={getCompareIssues.isPending}
            stats={compareStats}
            baseStats={currentVersion !== null ? currentStats : undefined}
          />
        </ComparisonPanel>
      </DashboardContent>
    </>
  );
}
