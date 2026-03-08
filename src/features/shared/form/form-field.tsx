"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import type { ReactNode } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type FormFieldProps = {
  field: AnyFieldApi;
  label: string;
  children: (isInvalid: boolean) => ReactNode;
};

export function FormField({ field, label, children }: FormFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className="grid gap-1.5">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {children(isInvalid)}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
