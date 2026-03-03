"use client";

import { CalendarIcon, GitBranch, PlusIcon, TextIcon } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectEmptyState } from "@/features/projects/components/states/project-empty-state";
import { FilterBar } from "@/features/shared/advanced-filter/filter-bar";
import { FilterEmptyState } from "@/features/shared/advanced-filter/filter-empty-state";
import {
  type FilterField,
  matchesAllFilters,
} from "@/features/shared/advanced-filter/filters.type";
import { useFilterState } from "@/features/shared/advanced-filter/use-filter-state.hook";
import { useDialogManager } from "@/features/shared/dialog-manager/dialog-manager.store";
import {
  DashboardActionBar,
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/layouts/dashboard-layout";

const FILTER_FIELDS: FilterField[] = [
  {
    id: "title",
    label: "Title",
    type: "text",
    icon: <TextIcon className="size-3.5" />,
  },
  {
    id: "totalVersions",
    label: "Number of versions",
    type: "number",
    icon: <GitBranch className="size-3.5" />,
  },
  {
    id: "date",
    label: "Creation Date",
    type: "date",
    icon: <CalendarIcon className="size-3.5" />,
  },
];

const ALL_ROWS = [
  {
    id: "1",
    title: "TinyWallets",
    description: "Your budget tracking software reinvented.",
    date: "2026-01-24T09:15:00.000Z",
    totalVersions: 2,
  },
  {
    id: "2",
    title: "Welcomer",
    description: "A truly welcoming Discord bot.",
    date: "2026-01-28T14:42:00.000Z",
    totalVersions: 5,
  },
  {
    id: "3",
    title: "Patchwork",
    description: "Visual changelog builder for SaaS teams.",
    date: "2026-02-03T08:00:00.000Z",
    totalVersions: 8,
  },
  {
    id: "4",
    title: "Slotify",
    description: "Appointment scheduling without the friction.",
    date: "2026-02-07T11:30:00.000Z",
    totalVersions: 1,
  },
  {
    id: "5",
    title: "Inkdrop",
    description: "Markdown notes with offline-first sync.",
    date: "2026-02-10T16:20:00.000Z",
    totalVersions: 12,
  },
  {
    id: "6",
    title: "Stackwise",
    description: "Tech stack documentation for growing teams.",
    date: "2026-02-14T10:05:00.000Z",
    totalVersions: 3,
  },
  {
    id: "7",
    title: "Nudge",
    description: "Habit tracker built around micro-commitments.",
    date: "2026-02-18T07:45:00.000Z",
    totalVersions: 6,
  },
  {
    id: "8",
    title: "Vaultify",
    description: "Encrypted credential sharing for dev teams.",
    date: "2026-02-21T13:00:00.000Z",
    totalVersions: 4,
  },
];

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

  const visibleRows = ALL_ROWS.filter((row) =>
    matchesAllFilters(row, filters, FILTER_FIELDS),
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
          fields={FILTER_FIELDS}
          filters={filters}
          onAddFilter={(fieldId) => addFilter(fieldId, FILTER_FIELDS)}
          onUpdateOperator={updateFilterOperator}
          onUpdateValue={updateFilterValue}
          onRemoveFilter={removeFilter}
          onClearFilters={clearFilters}
        />
      </DashboardActionBar>
      <DashboardContent className="flex flex-col pt-16">
        {ALL_ROWS.length === 0 ? (
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
