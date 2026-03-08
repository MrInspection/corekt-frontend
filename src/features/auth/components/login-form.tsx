"use client";

import { useForm } from "@tanstack/react-form";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { LoginFormSchema } from "@/features/auth/validation/auth.schema";
import { FormField } from "@/features/shared/form/form-field";
import { Icons } from "@/features/shared/ui/icons";

export function LoginForm() {
  const { loginMutation } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginFormSchema,
    },
    onSubmit: async ({ value }) => loginMutation.mutate(value),
  });

  return (
    <main>
      <div className="mb-8">
        <Icons.corekt className="size-10" />
        <h3 className="mt-4 font-semibold text-2xl tracking-tight">
          Have we met before?
        </h3>
        <div className="mt-1 text-base text-muted-foreground">
          Sign in to pick up where you left off.
        </div>
      </div>

      <div className="space-y-4">
        <form
          id="corekt-login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-4">
            <form.Field name="email">
              {(field) => (
                <FormField field={field} label="Email">
                  {(isInvalid) => (
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="name@example.com"
                    />
                  )}
                </FormField>
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <FormField field={field} label="Password">
                  {(isInvalid) => (
                    <PasswordInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="●●●●●●●●●●●●"
                    />
                  )}
                </FormField>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </div>
      <Button
        type="submit"
        form="corekt-login-form"
        className="mt-4 w-full"
        isLoading={loginMutation.isPending}
        isLoadingText="Logging in..."
      >
        Continue <ChevronRight className="size-4" />
      </Button>
      <div className="absolute bottom-8 left-1/2 mx-auto w-max max-w-[60%] -translate-x-1/2 text-center text-muted-foreground text-xs">
        By creating an account, you agree to Corekt's{" "}
        <Link
          href="/legal/terms-and-conditions"
          className="underline underline-offset-4"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/legal/privacy-policy"
          className="underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </div>
    </main>
  );
}
