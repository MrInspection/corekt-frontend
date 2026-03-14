"use client";

import { useForm } from "@tanstack/react-form";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { FormField } from "@/features/shared/form/form-field";
import { Icons } from "@/features/shared/ui/icons";
import { useTaiga } from "@/features/taiga/hooks/use-taiga.hook";
import {
  TaigaLoginFormSchema,
  type TaigaProject,
} from "@/features/taiga/validator/taiga.schema";

type ConnectTaigaDialogProps = {
  onConnected: (projects: TaigaProject[]) => void;
};

export function ConnectTaigaDialog({ onConnected }: ConnectTaigaDialogProps) {
  const { loginMutation } = useTaiga();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onSubmit: TaigaLoginFormSchema,
    },
    onSubmit: async ({ value }) => {
      loginMutation.mutate(value, {
        onSuccess: (projects) => onConnected(projects ?? []),
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger render={<Button>Connect account</Button>} />
      <DialogContent className="w-96 gap-0 p-0">
        <DialogHeader className="gap-0 px-6 pt-10">
          <div className="flex items-center justify-center">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-background p-2 shadow-xs">
              <Icons.taiga className="size-6" />
            </div>
            <div className="h-px w-10 border border-dashed" />
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-background p-2 shadow-xs">
              <Icons.corekt className="size-6" />
            </div>
          </div>
          <h2 className="mt-4 text-center font-medium text-lg">
            Connect Taiga to Corekt
          </h2>
          <p className="mx-auto mt-1 w-[90%] text-center text-muted-foreground">
            Import your user stories from Taiga so Corekt can use them as
            context for the report.
          </p>
        </DialogHeader>
        <div className="p-6">
          <form
            id="connect-taiga-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-4">
              <form.Field name="username">
                {(field) => (
                  <FormField field={field} label="Username">
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
        <div className="border-t p-6">
          <p className="font-semibold">Corekt would like to</p>
          <ul className="mt-2.5 flex flex-col space-y-2 text-left">
            {[
              "Access your project list information",
              "Access the user stories within your projects",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-left">
                <CircleCheck className="size-5 fill-brand-100 stroke-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter className="border-t p-6 py-5">
          <div className="grid w-full grid-cols-2 gap-2">
            <DialogClose render={<Button variant="outline" type="button" />}>
              Cancel
            </DialogClose>
            <Button
              type="submit"
              form="connect-taiga-form"
              isLoading={loginMutation.isPending}
              isLoadingText="Connecting..."
            >
              Connect
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
