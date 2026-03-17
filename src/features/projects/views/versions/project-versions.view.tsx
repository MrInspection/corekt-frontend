"use client";

import {
  GitCompare,
  MoreHorizontalIcon,
  Pencil,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
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
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { EditProjectDialog } from "@/features/projects/components/dialogs/edit-project-dialog";
import { VersionEmptyState } from "@/features/projects/components/states/version-empty-state";
import { VersionsLoadingState } from "@/features/projects/components/states/versions-loading-state";
import { VersionCard } from "@/features/projects/components/version-card";
import {
  useProject,
  useProjects,
} from "@/features/projects/hooks/use-projects.hook";
import { useVersions } from "@/features/projects/hooks/use-versions.hook";
import { FilterBar } from "@/features/shared/advanced-filter/filter-bar";
import { FilterEmptyState } from "@/features/shared/advanced-filter/filter-empty-state";
import { matchesAllFilters } from "@/features/shared/advanced-filter/filters.type";
import { useFilterState } from "@/features/shared/advanced-filter/use-filter-state.hook";
import { useDialogManager } from "@/features/shared/dialog-manager/dialog-manager.store";
import { DashboardSidebarSheet } from "@/features/shared/navigation/dashboard/dashboard-sidebar-sheet";
import { DynamicBreadcrumb } from "@/features/shared/navigation/dynamic-breadcrumb";
import {
  DashboardActionBar,
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/dashboard-layout";
import { ConfirmationDialog } from "@/features/shared/ui/dialogs/confirmation-dialog";
import { VERSION_FILTER_FIELDS } from "@/features/shared/ui/filter-fields";

export function ProjectVersionsView({ projectId }: { projectId: string }) {
  const dialogManager = useDialogManager();
  const router = useRouter();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { userId } = useAuth();
  const { deleteProjectMutation } = useProjects(userId);

  const { getVersions } = useVersions({ projectId });
  const versions = getVersions.data ?? [];

  const {
    filters,
    addFilter,
    updateFilterOperator,
    updateFilterValue,
    removeFilter,
    clearFilters,
  } = useFilterState();

  const { data: project } = useProject(projectId, userId);

  const openCreateVersionDialog = () =>
    dialogManager.openDialog("create-version", {
      projectId,
    });
  useHotkeys("n>v", openCreateVersionDialog);

  const visibleRows = versions.filter((row) =>
    matchesAllFilters(row, filters, VERSION_FILTER_FIELDS),
  );

  return (
    <>
      <DashboardHeader>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="inline-flex shrink-0 items-center gap-2">
            <div className="inline-flex shrink-0 items-center gap-2">
              <DashboardSidebarSheet />
              <DynamicBreadcrumb hrefOverrides={{ projects: "/dashboard" }} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button size="icon-xs" variant="ghost" />}
              >
                <MoreHorizontalIcon className="size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setOpenEditDialog(true)}>
                  <Pencil className="size-4" /> Rename...
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
                  <Trash className="size-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center md:gap-1.5">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button size="xs" variant="ghost">
                    <GitCompare className="size-3.5" />{" "}
                    <span className="max-md:hidden">Compare</span>
                  </Button>
                }
              />
              <TooltipContent side="bottom" className="-mt-0.5">
                <span className="mr-2">Compare versions</span>
                <Kbd>C</Kbd> <span className="text-muted-foreground">then</span>{" "}
                <Kbd>V</Kbd>
              </TooltipContent>
            </Tooltip>
            <div className="h-5 w-px bg-border max-md:hidden" />
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={openCreateVersionDialog}
                  >
                    <PlusIcon className="size-3.5" />{" "}
                    <span className="max-md:hidden">New Version</span>
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
      <DashboardActionBar className="bg-gray-25">
        <FilterBar
          fields={VERSION_FILTER_FIELDS}
          filters={filters}
          onAddFilter={(fieldId) => addFilter(fieldId, VERSION_FILTER_FIELDS)}
          onUpdateOperator={updateFilterOperator}
          onUpdateValue={updateFilterValue}
          onRemoveFilter={removeFilter}
          onClearFilters={clearFilters}
        />
      </DashboardActionBar>
      <DashboardContent className="flex flex-col pt-16">
        {getVersions.isPending ? (
          <VersionsLoadingState />
        ) : versions.length === 0 ? (
          <VersionEmptyState />
        ) : visibleRows.length === 0 ? (
          <FilterEmptyState onClearFilters={clearFilters} />
        ) : (
          <div className="container grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {visibleRows.map((version) => (
              <VersionCard
                key={version.id}
                projectId={projectId}
                {...version}
              />
            ))}
          </div>
        )}
      </DashboardContent>

      {project && (
        <EditProjectDialog
          open={openEditDialog}
          onOpenChange={setOpenEditDialog}
          project={project}
        />
      )}

      <ConfirmationDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        content={{
          title: "Delete Project?",
          description:
            "This will permanently delete this project and its related data. This action cannot be undone.",
          confirmText: "Delete",
        }}
        onConfirm={() =>
          deleteProjectMutation.mutate(projectId, {
            onSuccess: () => router.push("/dashboard"),
          })
        }
        isLoading={deleteProjectMutation.isPending}
      />
    </>
  );
}
