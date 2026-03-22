"use client";

import { Download } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { dummyIssues } from "@/features/mock-data";
import { ConfidenceScoreKpi } from "@/features/projects/components/issues/confidence-score-kpi";
import {
  IssueCard,
  type IssueSeverity,
} from "@/features/projects/components/issues/issue-card";
import { TotalIssuesKpi } from "@/features/projects/components/issues/total-issues-kpi";
import { NoIssuesState } from "@/features/projects/components/states/no-issues-state";
import { useProject } from "@/features/projects/hooks/use-projects.hook";
import { useVersion } from "@/features/projects/hooks/use-versions.hook";
import { FilterBar } from "@/features/shared/advanced-filter/filter-bar";
import { FilterEmptyState } from "@/features/shared/advanced-filter/filter-empty-state";
import { matchesAllFilters } from "@/features/shared/advanced-filter/filters.type";
import { useFilterState } from "@/features/shared/advanced-filter/use-filter-state.hook";
import { DashboardSidebarSheet } from "@/features/shared/navigation/dashboard/dashboard-sidebar-sheet";
import { DynamicBreadcrumb } from "@/features/shared/navigation/dynamic-breadcrumb";
import {
  DashboardActionBar,
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/dashboard-layout";
import { ISSUE_FILTER_FIELDS } from "@/features/shared/ui/filter-fields";

export function ProjectReportView() {
  const params = useParams<{ projectId: string; version: string }>();

  const { userId } = useAuth();
  useProject(params.projectId, userId);

  const { data: version } = useVersion({
    projectId: params.projectId,
    versionId: params.version,
  });

  const {
    filters,
    addFilter,
    updateFilterOperator,
    updateFilterValue,
    removeFilter,
    clearFilters,
  } = useFilterState();

  const visibleRows = dummyIssues.filter((row) =>
    matchesAllFilters(row, filters, ISSUE_FILTER_FIELDS),
  );

  return (
    <>
      <DashboardHeader>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="inline-flex shrink-0 items-center gap-2">
            <DashboardSidebarSheet />
            <DynamicBreadcrumb
              hrefOverrides={{ projects: "/dashboard" }}
              labelOverrides={{ version: `v${version?.version}` }}
              skippedSegments={["version"]}
            />
          </div>
          <Tooltip>
            <TooltipTrigger render={<Button size="xs" variant="ghost" />}>
              <Download className="size-3.5" /> Export
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              <span className="mr-1.5">Export your report</span>
              <Kbd>E</Kbd> <span className="text-muted-foreground">then</span>{" "}
              <Kbd>R</Kbd>
            </TooltipContent>
          </Tooltip>
        </div>
      </DashboardHeader>
      <DashboardActionBar className="bg-gray-50">
        <FilterBar
          fields={ISSUE_FILTER_FIELDS}
          filters={filters}
          onAddFilter={(fieldId) => addFilter(fieldId, ISSUE_FILTER_FIELDS)}
          onUpdateOperator={updateFilterOperator}
          onUpdateValue={updateFilterValue}
          onRemoveFilter={removeFilter}
          onClearFilters={clearFilters}
        />
      </DashboardActionBar>
      <DashboardContent className="py-6 lg:py-12">
        <div className="container max-w-5xl">
          <section className="grid gap-4 lg:grid-cols-2">
            <TotalIssuesKpi
              issuesCount={20}
              counts={{
                resolved: 6,
                critical: 8,
                major: 7,
                minor: 5,
              }}
            />
            <ConfidenceScoreKpi score={84.83} />
          </section>
          <section className="mt-10">
            <div className="mb-4 border-b pb-4 font-medium text-xl">Issues</div>
            {dummyIssues.length === 0 ? (
              <NoIssuesState />
            ) : visibleRows.length === 0 ? (
              <div className="relative flex h-110 flex-col items-center justify-center rounded-2xl border">
                <FilterEmptyState onClearFilters={clearFilters} />
              </div>
            ) : (
              <div className="grid gap-4">
                {visibleRows.map((dummyIssue) => (
                  <IssueCard
                    severity={dummyIssue.severity as IssueSeverity}
                    description={dummyIssue.description}
                    id={dummyIssue.id}
                    isResolved={dummyIssue.isResolved}
                    confidenceScore={dummyIssue.confidenceScore}
                    content={dummyIssue.content}
                    title={dummyIssue.title}
                    key={dummyIssue.id}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </DashboardContent>
    </>
  );
}
