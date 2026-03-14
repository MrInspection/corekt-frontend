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
import { useVersions } from "@/features/projects/hooks/use-versions.hook";
import {
  type Version,
  VersionFormSchema,
} from "@/features/projects/validation/versions.schema";
import { FormField } from "@/features/shared/form/form-field";

type EditVersionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  version: Version;
  projectId: string;
};

export function EditVersionDialog({
  open,
  onOpenChange,
  version,
  projectId,
}: EditVersionDialogProps) {
  const { updateVersionMutation } = useVersions({ projectId });

  const form = useForm({
    defaultValues: { title: version.title },
    validators: {
      onSubmit: VersionFormSchema,
    },
    onSubmit: ({ value }) => {
      onOpenChange(false);
      updateVersionMutation.mutate({
        ...value,
        versionId: version.id,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 divide-y rounded-2xl p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Edit Version</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-6">
          <form
            id={`edit-version-form-${version.id}`}
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
                      />
                    )}
                  </FormField>
                )}
              </form.Field>
            </FieldGroup>
          </form>
        </div>
        <DialogFooter className="p-6 py-4">
          <DialogClose render={<Button variant="outline" type="button" />}>
            Cancel
          </DialogClose>
          <Button type="submit" form={`edit-version-form-${version.id}`}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
