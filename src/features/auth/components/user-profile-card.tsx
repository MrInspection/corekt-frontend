"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";

export function UserProfileCard() {
  const { currentUser } = useAuth();

  return (
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
  );
}
