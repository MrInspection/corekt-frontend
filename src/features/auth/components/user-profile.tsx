"use client";

import { Keyboard, LogOut, Settings, Trophy } from "lucide-react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { ConfirmationDialog } from "@/features/shared/ui/dialogs/confirmation-dialog";

export function UserProfile() {
  const { logoutMutation, currentUser } = useAuth();
  useHotkeys("l>o", () => setOpenConfirmationDialog(true));
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex focus:rounded-full">
          <Avatar className="size-8">
            <AvatarFallback className="size-8 bg-background">
              {currentUser?.username.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mb-1 w-(base-dropdown-menu-trigger-width) w-56 rounded-xl">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8">
                  <AvatarFallback className="size-8 bg-background">
                    {currentUser?.username.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-foreground">
                    {currentUser?.username ?? "Unknown User"}
                  </span>
                  <span className="truncate text-xs">
                    {currentUser?.email ?? "Unknown email"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="p-1">
            <DropdownMenuItem>
              <Trophy className="size-4" /> Achievements
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="size-4" /> Preferences
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="p-1">
            <DropdownMenuItem>
              <Keyboard className="size-4" /> Keyboard Shortcuts
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="p-1">
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setOpenConfirmationDialog(true)}
            >
              <LogOut className="size-4" /> Logout
              <DropdownMenuShortcut>L then O</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div role="alertdialog">
        <ConfirmationDialog
          content={{
            title: "Leaving already?",
            description:
              "You’ll need to sign in again to access your workspace.",
            confirmText: "Log out",
          }}
          open={openConfirmationDialog}
          onOpenChange={setOpenConfirmationDialog}
          onConfirm={() => logoutMutation.mutate()}
          isLoading={logoutMutation.isPending}
        />
      </div>
    </>
  );
}
