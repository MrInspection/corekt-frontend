"use client";

import { useForm } from "@tanstack/react-form";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import z from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { PreferenceCard } from "@/features/preferences/components/preference-card";
import { FormField } from "@/features/shared/form/form-field";
import { SettingsMobileSheet } from "@/features/shared/navigation/settings/settings-mobile-sheet";
import {
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/dashboard-layout";

export function PreferencesView() {
  const { currentUser, saveApiKeyMutation, deleteAccountMutation } = useAuth();
  const [openAPIKeyDialog, setOpenAPIKeyDialog] = useState(false);

  const form = useForm({
    defaultValues: {
      apiKey: "",
    },
    validators: {
      onSubmit: z.object({
        apiKey: z.string().nonempty({ error: "Mistral API key is required" }),
      }),
    },
    onSubmit: ({ value }) => {
      setOpenAPIKeyDialog(false);
      saveApiKeyMutation.mutate(value.apiKey);
    },
  });

  return (
    <>
      <DashboardHeader className="md:hidden">
        <SettingsMobileSheet />
      </DashboardHeader>
      <DashboardContent className="px-4 py-16">
        <div className="container max-w-2xl">
          <div className="px-4 font-medium text-2xl">Preferences</div>
          <h4 className="mt-8 mb-4 px-4 font-medium text-lg/6">Profile</h4>
          <div className="flex flex-col divide-y rounded-lg border p-4 *:py-4 sm:justify-between [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
            <div className="flex flex-1 items-center justify-between">
              <p className="font-medium text-sm">Profile picture</p>
              <Avatar className="size-9">
                <AvatarFallback className="size-9 bg-background">
                  {currentUser?.username.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-1 justify-between space-y-2 max-md:flex-col md:items-center">
              <p className="font-medium text-sm">Email</p>
              <Input
                type="text"
                value={currentUser?.email ?? "Unknown email"}
                className="h-8 md:w-64"
                readOnly
              />
            </div>
            <div className="flex flex-1 justify-between space-y-2 max-md:flex-col md:items-center">
              <p className="font-medium text-sm">Full name</p>
              <Input
                type="text"
                value={currentUser?.username ?? "Unknown name"}
                className="h-8 md:w-64"
                readOnly
              />
            </div>
          </div>

          <h4 className="mt-8 mb-4 px-4 font-medium text-lg/6">
            Mistral API Token
          </h4>
          <PreferenceCard
            title="Use your own API key"
            description="Use your own Mistral quota for report generation."
          >
            <Dialog open={openAPIKeyDialog} onOpenChange={setOpenAPIKeyDialog}>
              <DialogTrigger render={<Button variant="outline" size="sm" />}>
                <PlusIcon className="size-4" />{" "}
                {currentUser?.mistralToken !== "" ? "Change" : "Add"} API key
              </DialogTrigger>
              <DialogContent className="gap-0 p-0">
                <DialogHeader className="border-b p-6">
                  <DialogTitle>Mistral API Key</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 p-6">
                  <p className="text-muted-foreground">
                    Bring your own Mistral API key to generate coherence reports
                    without usage limits. Your key is stored securely and used
                    exclusively to power your analyses.
                  </p>
                  <form
                    id="save-api-key-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      form.handleSubmit();
                    }}
                  >
                    <FieldGroup className="gap-4">
                      <form.Field name="apiKey">
                        {(field) => (
                          <FormField field={field} label="API Key">
                            {(isInvalid) => (
                              <PasswordInput
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                              />
                            )}
                          </FormField>
                        )}
                      </form.Field>
                    </FieldGroup>
                  </form>
                </div>
                <DialogFooter className="border-t p-6 py-4">
                  <DialogClose
                    render={
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => form.reset()}
                      />
                    }
                  >
                    Cancel
                  </DialogClose>
                  <Button type="submit" form="save-api-key-form">
                    Save API key
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </PreferenceCard>
          <h4 className="mt-8 mb-4 px-4 font-medium text-lg/6">Danger Zone</h4>
          <PreferenceCard
            title="Delete account"
            description="Your account and your data will be permanently deleted."
          >
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" />}>
                Delete account
              </AlertDialogTrigger>
              <AlertDialogContent className="gap-0 p-0">
                <AlertDialogHeader className="p-6">
                  <AlertDialogTitle>Delete account</AlertDialogTitle>
                  <div className="space-y-4 text-muted-foreground text-sm">
                    <p>
                      If you are sure you want to proceed with the deletion of
                      your account, please continue below.
                    </p>
                    <p>
                      Keep in mind this operation is irreversible and will
                      result in the permanent deletion of your account and all
                      associated data.
                    </p>
                  </div>
                </AlertDialogHeader>
                <DialogFooter className="border-t px-6 py-4">
                  <AlertDialogCancel render={<Button variant="secondary" />}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    Delete my account
                  </AlertDialogAction>
                </DialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </PreferenceCard>
        </div>
      </DashboardContent>
    </>
  );
}
