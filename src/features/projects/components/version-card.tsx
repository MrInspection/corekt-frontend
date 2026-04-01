"use client";

import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import {
  Calendar,
  Check,
  CheckCircle,
  CircleDot,
  Clock,
  GitBranch,
  MoreVertical,
  OctagonAlert,
  OctagonX,
  Pencil,
  Trash,
  X,
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
import { Spinner } from "@/components/ui/spinner";
import { getVersionAction } from "@/features/projects/actions/versions.action";
import { EditVersionDialog } from "@/features/projects/components/dialogs/edit-version-dialog";
import {
  useVersions,
  versionQueryKey,
} from "@/features/projects/hooks/use-versions.hook";
import type { Version } from "@/features/projects/validation/versions.schema";
import { ConfirmationDialog } from "@/features/shared/ui/confirmation-dialog";

type ProjectStatus = Version["status"];

function ProjectCardStatus({ status }: { status: ProjectStatus }) {
  switch (status) {
    case "DRAFT":
      return (
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Clock className="size-4" />
          <span className="font-medium">Draft</span>
        </div>
      );
    case "IN_PROGRESS":
      return (
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Spinner />
          <span className="font-medium">Analysing...</span>
        </div>
      );
    case "COMPLETED":
      return (
        <div className="flex items-center gap-1.5 text-sm text-success-600">
          <Check className="size-4" />
          <span className="font-medium">Completed</span>
        </div>
      );
    case "FAILED":
      return (
        <div className="flex items-center gap-1.5 text-error-600 text-sm">
          <X className="size-4" />
          <span className="font-medium">Failed</span>
        </div>
      );
  }
}

export function VersionCard(props: Version & { projectId: string }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const { deleteVersionMutation } = useVersions({ projectId: props.projectId });
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: versionQueryKey(props.projectId, props.id),
      queryFn: () =>
        getVersionAction({
          projectId: props.projectId,
          versionId: props.id,
        }).then((res) => res?.data),
      staleTime: 30_000,
    });
  };

  return (
    <div
      className="max-h-fit cursor-pointer rounded-xl border bg-card shadow-xs transition-transform duration-150 hover:-translate-y-0.5 hover:border-gray-300 hover:border-b-4 hover:shadow-md"
      role="button"
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onClick={() => {
        if (props.status === "COMPLETED") {
          router.push(
            `/projects/${props.projectId}/version/${props.id}/report`,
          );
        } else {
          router.push(
            `/projects/${props.projectId}/version/${props.id}/generate`,
          );
        }
      }}
    >
      <div className="flex items-start justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-indigo-100/80 px-2.5 py-0.5 text-indigo-800 text-sm">
            <GitBranch className="size-4" aria-hidden="true" />
            <span className="font-medium font-mono">#{props.version}</span>
          </div>
          <span className="line-clamp-1 font-semibold">{props.title}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            render={
              <Button variant="ghost" size="icon-xs" className="rounded-full">
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
      <div className="flex items-center justify-between border-t px-6 py-4">
        <div className="flex items-center gap-6">
          <ProjectCardStatus status={props.status} />
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Calendar className="size-4" aria-hidden="true" />
            <span className="font-medium">
              {formatDate(props.createdAt, "MMM dd, yyyy")}
            </span>
          </div>
        </div>
        {props.status === "COMPLETED" && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <CircleDot className="size-4 text-gray-500" />
              <span>{props.issues.minor}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <OctagonAlert className="size-4 text-warning-600" />
              <span>{props.issues.major}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <OctagonX className="size-4 text-error-600" />
              <span>{props.issues.critical}</span>
            </div>
          </div>
        )}
      </div>

      <div role="alertdialog" onClick={(e) => e.stopPropagation()}>
        <ConfirmationDialog
          content={{
            title: "Delete Version?",
            description:
              "This will permanently delete this report version and its related data. This action cannot be undone.",
            confirmText: "Delete",
          }}
          open={openDeleteDialog}
          onOpenChange={setOpenDeleteDialog}
          onConfirm={() => deleteVersionMutation.mutate(props.id)}
        />
      </div>

      <div role="dialog" onClick={(e) => e.stopPropagation()}>
        <EditVersionDialog
          open={openEditDialog}
          onOpenChange={setOpenEditDialog}
          projectId={props.projectId}
          version={props}
        />
      </div>
    </div>
  );
}
