"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { useProjects } from "@/features/projects/hooks/use-projects.hook";
import { ProjectFormSchema } from "@/features/projects/validation/projects.schema";
import { FormField } from "@/features/shared/form/form-field";

export function CreateProjectDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { userId } = useAuth();
  const { createProjectMutation } = useProjects(userId);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: ProjectFormSchema,
    },
    onSubmit: ({ value }) => {
      onOpenChange(false);
      createProjectMutation.mutate(value);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0">
        <DialogHeader className="border-b p-6">
          <DialogTitle>New Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-6">
          <form
            id="create-project-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-4">
              <form.Field name="title">
                {(field) => (
                  <FormField field={field} label="Title">
                    {(isInvalid) => (
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Project name"
                      />
                    )}
                  </FormField>
                )}
              </form.Field>
              <form.Field name="description">
                {(field) => (
                  <FormField field={field} label="Description">
                    {(isInvalid) => (
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
                    )}
                  </FormField>
                )}
              </form.Field>
            </FieldGroup>
          </form>
        </div>
        <DialogFooter className="border-t p-6 py-4">
          <DialogClose render={<Button variant="outline" type="button" />}>
            Cancel
          </DialogClose>
          <Button
            type="submit"
            form="create-project-form"
            isLoading={createProjectMutation.isPending}
            isLoadingText="Creating..."
          >
            Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
