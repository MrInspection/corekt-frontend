"use client";

import { PlusIcon } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { dummyProjects } from "@/features/mock-data";
import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectEmptyState } from "@/features/projects/components/states/project-empty-state";
import { FilterBar } from "@/features/shared/advanced-filter/filter-bar";
import { FilterEmptyState } from "@/features/shared/advanced-filter/filter-empty-state";
import { matchesAllFilters } from "@/features/shared/advanced-filter/filters.type";
import { useFilterState } from "@/features/shared/advanced-filter/use-filter-state.hook";
import { useDialogManager } from "@/features/shared/dialog-manager/dialog-manager.store";
import { PROJECT_FILTER_FIELDS } from "@/features/shared/ui/filter-fields";
import {
  DashboardActionBar,
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/layouts/dashboard-layout";

export function ProjectsDashboardView() {
  const dialogManager = useDialogManager();
  const {
    filters,
    addFilter,
    updateFilterOperator,
    updateFilterValue,
    removeFilter,
    clearFilters,
  } = useFilterState();

  const visibleRows = dummyProjects.filter((row) =>
    matchesAllFilters(row, filters, PROJECT_FILTER_FIELDS),
  );

  const openProjectDialog = () => dialogManager.openDialog("create-project");
  useHotkeys("n>p", openProjectDialog);

  return (
    <>
      <DashboardHeader>
        <div className="flex w-full items-center justify-between gap-2">
          <h3 className="font-semibold">Dashboard</h3>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button size="xs" variant="ghost" onClick={openProjectDialog}>
                  <PlusIcon /> New Project
                </Button>
              }
            />
            <TooltipContent align="end">
              <span className="mr-1.5">Create new project</span>
              <Kbd>N</Kbd> <span className="text-muted-foreground">then</span>{" "}
              <Kbd>P</Kbd>
            </TooltipContent>
          </Tooltip>
        </div>
      </DashboardHeader>
      <DashboardActionBar className="bg-gray-50">
        <FilterBar
          fields={PROJECT_FILTER_FIELDS}
          filters={filters}
          onAddFilter={(fieldId) => addFilter(fieldId, PROJECT_FILTER_FIELDS)}
          onUpdateOperator={updateFilterOperator}
          onUpdateValue={updateFilterValue}
          onRemoveFilter={removeFilter}
          onClearFilters={clearFilters}
        />
      </DashboardActionBar>
      <DashboardContent className="flex flex-col pt-16">
        {dummyProjects.length === 0 ? (
          <ProjectEmptyState />
        ) : visibleRows.length === 0 ? (
          <FilterEmptyState onClearFilters={clearFilters} />
        ) : (
          <>
            <div className="container grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
              {visibleRows.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            {/*<ProjectsLoadingState />*/}
          </>
        )}
      </DashboardContent>
    </>
  );
}
