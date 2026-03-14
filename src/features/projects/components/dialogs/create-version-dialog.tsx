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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useVersions } from "@/features/projects/hooks/use-versions.hook";
import { VersionFormSchema } from "@/features/projects/validation/versions.schema";

export function CreateVersionDialog({
  open,
  onOpenChange,
  projectId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}) {
  const { createVersionMutation } = useVersions({ projectId });

  const form = useForm({
    defaultValues: { title: "" },
    validators: {
      onSubmit: VersionFormSchema,
    },
    onSubmit: ({ value }) => {
      onOpenChange(false);
      createVersionMutation.mutate(value);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0">
        <DialogHeader className="border-b p-6">
          <DialogTitle>New Version</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-6">
          <p className="text-muted-foreground">
            Versions track the evolution of your analysis over time. Upload your
            deliverables, run a coherence report, and iterate until your
            specifications are consistent and complete
          </p>
          <form
            id="create-project-form"
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
                        placeholder="Version Name"
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
        <DialogFooter className="border-t p-6 py-4">
          <DialogClose render={<Button variant="outline" type="button" />}>
            Cancel
          </DialogClose>
          <Button type="submit" form="create-project-form">
            Create version
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
