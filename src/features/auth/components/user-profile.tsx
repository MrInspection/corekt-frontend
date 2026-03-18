"use client";

import { Keyboard, LogOut, Settings, Trophy } from "lucide-react";
import Link from "next/link";
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
import { UserProfileCard } from "@/features/auth/components/user-profile-card";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import { ConfirmationDialog } from "@/features/shared/ui/confirmation-dialog";
import { KeyboardShortcutsSheet } from "@/features/shared/ui/keyboard-shortcuts-sheet";

export function UserProfile({
  fullVersion,
  onClose,
}: {
  fullVersion?: boolean;
  onClose?: () => void;
}) {
  const [openShortcutsSheet, setOpenShortcutsSheet] = useState(false);

  const { logoutMutation, currentUser } = useAuth();
  useHotkeys("l>o", () => setOpenConfirmationDialog(true));
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);

  useHotkeys("mod+h", (e) => {
    e.preventDefault();
    setOpenShortcutsSheet(() => !openShortcutsSheet);
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex focus:rounded-full">
          {fullVersion ? (
            <UserProfileCard />
          ) : (
            <Avatar className="size-8">
              <AvatarFallback className="size-8 bg-background">
                {currentUser?.username.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mb-1 w-(base-dropdown-menu-trigger-width) w-56 rounded-xl">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0 font-normal">
              <UserProfileCard />
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="p-1">
            <Link href="/preferences/achievements">
              <DropdownMenuItem>
                <Trophy className="size-4" /> Achievements
              </DropdownMenuItem>
            </Link>
            <Link href="/preferences">
              <DropdownMenuItem>
                <Settings className="size-4" /> Preferences
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="max-md:hidden" />
          <DropdownMenuGroup className="p-1 max-md:hidden">
            <DropdownMenuItem
              onClick={() => {
                onClose?.();
                setTimeout(() => setOpenShortcutsSheet(true), 150);
              }}
            >
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

      <div role="dialog">
        <KeyboardShortcutsSheet
          open={openShortcutsSheet}
          onOpenChange={setOpenShortcutsSheet}
        />
      </div>
    </>
  );
}
