"use client";

import { useForm } from "@tanstack/react-form";
import { formatDate } from "date-fns";
import {
  Calendar,
  ChevronRight,
  GitBranch,
  MoreVertical,
  Pencil,
  Trash,
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {CreateProjectSchema} from "@/features/projects/validation/projects.schema";
import { ConfirmationDialog } from "@/features/shared/ui/confirmation-dialog";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  totalVersions: number;
};

export function ProjectCard(props: ProjectCardProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const deleteProjectDialog = (
    <ConfirmationDialog
      open={openDeleteDialog}
      onOpenChange={setOpenDeleteDialog}
      content={{
        title: "Delete Project?",
        description:
          "This will permanently delete this project and its related data. This action cannot be undone.",
        confirmText: "Delete",
      }}
      onConfirm={() => alert("Deleted project")}
    />
  );

  const form = useForm({
    defaultValues: {
      title: props.title,
      description: props.description,
    },
    validators: {
      onSubmit: CreateProjectSchema,
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value));
    },
  });

  const editProjectDialog = (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent className="gap-0 divide-y rounded-2xl p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <form
            id={`edit-project-form-${props.id}`}
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-4">
              <form.Field
                name="title"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="grid gap-1.5">
                      <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Project Name"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="grid gap-1.5">
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Add a short summary"
                        className="h-24 resize-none"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </div>
        <DialogFooter className="p-6 py-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" form={`edit-project-form-${props.id}`}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <section className="max-h-fit cursor-pointer rounded-xl border bg-card shadow-xs transition-transform duration-150 hover:-translate-y-0.5 hover:border-gray-300 hover:border-b-4 hover:shadow-md">
      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <p className="line-clamp-1 font-semibold">{props.title}</p>
          <p className="mt-1 line-clamp-2 text-pretty text-muted-foreground text-sm">
            {props.description}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" className="rounded-full">
                <MoreVertical className="size-4" version="bold" />
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
      <div className="flex items-center justify-between border-t border-dashed px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border px-2 py-1 text-muted-foreground text-sm">
            <Calendar className="size-4" aria-hidden="true" />
            <span className="font-medium">
              {formatDate(props.date, "MMM dd, yyyy")}
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
      {deleteProjectDialog}
      {editProjectDialog}
    </section>
  );
}
