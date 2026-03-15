"use client";

import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import {
  Calendar,
  ChevronRight,
  GitBranch,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { getVersionsAction } from "@/features/projects/actions/versions.action";
import { EditProjectDialog } from "@/features/projects/components/dialogs/edit-project-dialog";
import { useProjects } from "@/features/projects/hooks/use-projects.hook";
import { versionsQueryKey } from "@/features/projects/hooks/use-versions.hook";
import type { Project } from "@/features/projects/validation/projects.schema";
import { ConfirmationDialog } from "@/features/shared/ui/dialogs/confirmation-dialog";

export function ProjectCard(props: Project) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { userId } = useAuth();
  const { deleteProjectMutation } = useProjects(userId);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: versionsQueryKey(props.id),
      queryFn: () =>
        getVersionsAction({ projectId: props.id }).then((res) => res?.data),
      staleTime: 30_000,
    });
  };

  return (
    <div
      className="max-h-fit cursor-pointer rounded-xl border bg-card shadow-xs transition-transform duration-150 hover:-translate-y-0.5 hover:border-gray-300 hover:border-b-4 hover:shadow-md"
      onClick={() => router.push(`/projects/${props.id}`)}
      onMouseEnter={handleMouseEnter}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <p className="line-clamp-1 font-semibold">{props.title}</p>
          <p className="mt-1 line-clamp-2 text-pretty text-muted-foreground text-sm">
            {props.description}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            render={
              <Button variant="ghost" size="icon-sm" className="rounded-full">
                <MoreVertical className="size-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setOpenEditDialog(true);
              }}
            >
              <Pencil className="size-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteDialog(true);
              }}
            >
              <Trash className="size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center justify-between border-t border-dashed px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-muted-foreground text-sm">
            <Calendar className="size-4" aria-hidden="true" />
            <span className="font-medium">
              {formatDate(props.createdAt, "MMM dd, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-muted-foreground text-sm">
            <GitBranch className="size-4" aria-hidden="true" />
            <span className="font-medium">{props.totalVersions}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <span className="font-medium">View all</span>
          <ChevronRight className="size-4" />
        </div>
      </div>

      <div role="alertdialog" onClick={(e) => e.stopPropagation()}>
        <ConfirmationDialog
          open={openDeleteDialog}
          onOpenChange={setOpenDeleteDialog}
          content={{
            title: "Delete Project?",
            description:
              "This will permanently delete this project and its related data. This action cannot be undone.",
            confirmText: "Delete",
          }}
          onConfirm={() => deleteProjectMutation.mutate(props.id)}
          isLoading={deleteProjectMutation.isPending}
        />
      </div>

      <div role="dialog" onClick={(e) => e.stopPropagation()}>
        <EditProjectDialog
          open={openEditDialog}
          onOpenChange={setOpenEditDialog}
          project={props}
        />
      </div>
    </div>
  );
}
