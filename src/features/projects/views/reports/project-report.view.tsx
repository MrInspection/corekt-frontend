"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dummyIssues } from "@/features/mock-data";
import { ConfidenceScoreKpi } from "@/features/projects/components/issues/confidence-score-kpi";
import {
  IssueCard,
  type IssueSeverity,
} from "@/features/projects/components/issues/issue-card";
import { TotalIssuesKpi } from "@/features/projects/components/issues/total-issues-kpi";
import { NoIssuesState } from "@/features/projects/components/states/no-issues-state";
import { FilterBar } from "@/features/shared/advanced-filter/filter-bar";
import { FilterEmptyState } from "@/features/shared/advanced-filter/filter-empty-state";
import { matchesAllFilters } from "@/features/shared/advanced-filter/filters.type";
import { useFilterState } from "@/features/shared/advanced-filter/use-filter-state.hook";
import { DynamicBreadcrumb } from "@/features/shared/navigation/dynamic-breadcrumb";
import { ISSUE_FILTER_FIELDS } from "@/features/shared/ui/filter-fields";
import {
  DashboardActionBar,
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/layouts/dashboard-layout";

export function ProjectReportView() {
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
          <DynamicBreadcrumb
            hrefOverrides={{ projects: "/dashboard" }}
            skippedSegments={["version"]}
          />
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-7">
              <Download /> Export
            </Button>
          </div>
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
      <DashboardContent>
        <div className="container my-16 max-w-5xl">
          <section className="grid gap-4 lg:grid-cols-2">
            <TotalIssuesKpi
              issuesCount={0}
              counts={{
                resolved: 0,
                critical: 0,
                major: 0,
                minor: 0,
              }}
            />
            <ConfidenceScoreKpi score={100} />
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
                    xp={dummyIssue.xp}
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
