"use client";

import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  GitCompare,
  Loader,
  MoreHorizontalIcon,
  Pencil,
  PlusIcon,
  TagIcon,
  TextIcon,
  Trash,
  XIcon,
} from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VersionEmptyState } from "@/features/projects/components/states/version-empty-state";
import { VersionsLoadingState } from "@/features/projects/components/states/versions-loading-state";
import { VersionCard } from "@/features/projects/components/version-card";
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

const items = [
  {
    id: "1",
    title: "Initial analysis baseline",
    version: 1,
    date: "Jan 02, 2026",
    status: "completed" as const,
    issues: { minor: 3, major: 1, critical: 2, correct: 8 },
  },
  {
    id: "2",
    title: "Actor and flow alignment",
    version: 2,
    date: "Jan 06, 2026",
    status: "completed" as const,
    issues: { minor: 2, major: 2, critical: 1, correct: 10 },
  },
  {
    id: "3",
    title: "Data model first pass",
    version: 3,
    date: "Jan 09, 2026",
    status: "completed" as const,
    issues: { minor: 1, major: 3, critical: 0, correct: 12 },
  },
  {
    id: "4",
    title: "User stories cross-check",
    version: 4,
    date: "Jan 12, 2026",
    status: "completed" as const,
    issues: { minor: 4, major: 1, critical: 1, correct: 9 },
  },
  {
    id: "5",
    title: "Post-interview revision",
    version: 5,
    date: "Jan 15, 2026",
    status: "completed" as const,
    issues: { minor: 0, major: 2, critical: 0, correct: 15 },
  },
  {
    id: "6",
    title: "Stakeholder feedback integration",
    version: 6,
    date: "Jan 18, 2026",
    status: "failed" as const,
  },
  {
    id: "7",
    title: "Revised actor definitions",
    version: 7,
    date: "Jan 20, 2026",
    status: "completed" as const,
    issues: { minor: 1, major: 0, critical: 1, correct: 14 },
  },
  {
    id: "8",
    title: "Flow consistency rework",
    version: 8,
    date: "Jan 22, 2026",
    status: "in-progress" as const,
  },
  {
    id: "9",
    title: "Final pre-validation pass",
    version: 9,
    date: "Jan 23, 2026",
    status: "draft" as const,
  },
  {
    id: "10",
    title: "Production-ready baseline",
    version: 10,
    date: "Jan 24, 2026",
    status: "draft" as const,
  },
];

const FILTER_FIELDS: FilterField[] = [
  {
    id: "title",
    label: "Title",
    type: "text",
    icon: <TextIcon className="size-3.5" />,
  },
  {
    id: "status",
    label: "Status",
    type: "enum",
    icon: <TagIcon className="size-3.5" />,
    options: [
      {
        value: "draft",
        label: "Draft",
        icon: <ClockIcon className="size-3.5" />,
      },
      {
        value: "in-progress",
        label: "In progress",
        icon: <Loader className="size-3.5" />,
      },
      {
        value: "completed",
        label: "Completed",
        icon: <CheckIcon className="size-3.5" />,
      },
      {
        value: "failed",
        label: "Failed",
        icon: <XIcon className="size-3.5" />,
      },
    ],
  },
  {
    id: "date",
    label: "Creation Date",
    type: "date",
    icon: <CalendarIcon className="size-3.5" />,
  },
];

export function ProjectVersionsView() {
  const dialogManager = useDialogManager();
  const {
    filters,
    addFilter,
    updateFilterOperator,
    updateFilterValue,
    removeFilter,
    clearFilters,
  } = useFilterState();

  const openCreateVersionDialog = () =>
    dialogManager.openDialog("create-version");
  useHotkeys("n>v", openCreateVersionDialog);

  const visibleRows = items.filter((row) =>
    matchesAllFilters(row, filters, FILTER_FIELDS),
  );

  return (
    <>
      <DashboardHeader>
        <div className="flex w-full items-center justify-between gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>TinyWallets</BreadcrumbPage>
              </BreadcrumbItem>
              <div className="flex h-5 items-center justify-center rounded-sm bg-muted p-1 px-1.5">
                <span className="font-medium text-xs">{items.length}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button size="icon-sm" variant="ghost" className="h-7" />
                  }
                >
                  <MoreHorizontalIcon className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Pencil className="size-4" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className="size-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button size="icon-xs" variant="ghost">
                    <GitCompare className="size-3.5" />
                  </Button>
                }
              />
              <TooltipContent side="bottom" className="-mt-0.5">
                <span className="mr-2">Compare versions</span>
                <Kbd>C</Kbd> <span className="text-muted-foreground">then</span>{" "}
                <Kbd>V</Kbd>
              </TooltipContent>
            </Tooltip>
            <div className="h-5 w-px bg-border" />
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={openCreateVersionDialog}
                  >
                    <PlusIcon className="size-3.5" /> New Version
                  </Button>
                }
              />
              <TooltipContent side="bottom" align="end" className="-mt-0.5">
                <span className="mr-2">Create new version</span>
                <Kbd>N</Kbd> <span className="text-muted-foreground">then</span>{" "}
                <Kbd>V</Kbd>
              </TooltipContent>
            </Tooltip>
          </div>
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
        {items.length === 0 ? (
          <VersionEmptyState />
        ) : visibleRows.length === 0 ? (
          <FilterEmptyState onClearFilters={clearFilters} />
        ) : (
          <div className="container grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {visibleRows.map((item) => (
              <VersionCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </DashboardContent>
    </>
  );
}
