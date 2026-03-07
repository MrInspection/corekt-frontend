"use client";

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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmationDialog } from "@/features/shared/ui/confirmation-dialog";

type ProjectStatus = VersionCardProps["status"];

function ProjectCardStatus({ status }: { status: ProjectStatus }) {
  switch (status) {
    case "draft":
      return (
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Clock className="size-4" />
          <span className="font-medium">Draft</span>
        </div>
      );
    case "in-progress":
      return (
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Spinner />
          <span className="font-medium">Analysing...</span>
        </div>
      );
    case "completed":
      return (
        <div className="flex items-center gap-1.5 text-sm text-success-600">
          <Check className="size-4" />
          <span className="font-medium">Completed</span>
        </div>
      );
    case "failed":
      return (
        <div className="flex items-center gap-1.5 text-error-600 text-sm">
          <X className="size-4" />
          <span className="font-medium">Failed</span>
        </div>
      );
  }
}

type VersionCardProps = {
  id: string;
  title: string;
  version: number;
  date: string;
} & (
  | { status: "draft" }
  | { status: "in-progress" }
  | { status: "failed" }
  | {
      status: "completed";
      issues: {
        minor: number;
        major: number;
        critical: number;
        correct: number;
      };
    }
);

export function VersionCard(props: VersionCardProps) {
  const isCompleted = props.status === "completed";
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const deleteVersionDialog = (
    <ConfirmationDialog
      content={{
        title: "Delete Version?",
        description:
          "This will permanently delete this report version and its related data. This action cannot be undone.",
        confirmText: "Delete",
        isLoadingText: "Deleting...",
      }}
      open={openDeleteDialog}
      onOpenChange={setOpenDeleteDialog}
      onConfirm={() => alert("Deleted version")}
    />
  );

  const editVersionDialog = (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent className="gap-0 divide-y rounded-2xl p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Edit Version Control</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder={props.title} />
          </div>
        </div>
        <DialogFooter className="p-6 py-4">
          <Button variant="outline" onClick={() => setOpenEditDialog(false)}>
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <section className="max-h-fit cursor-pointer rounded-xl border bg-card shadow-xs transition-transform duration-150 hover:-translate-y-0.5 hover:border-gray-300 hover:border-b-4 hover:shadow-md">
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
            render={
              <Button variant="ghost" size="icon-xs" className="rounded-full">
                <MoreVertical className="size-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setOpenEditDialog(true)}>
              <Pencil className="size-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setOpenDeleteDialog(true)}
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
            <span className="font-medium">{props.date}</span>
          </div>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <CheckCircle className="size-4 text-success-600" />
              <span>{props.issues.correct}</span>
            </div>
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
      {deleteVersionDialog}
      {editVersionDialog}
    </section>
  );
}
