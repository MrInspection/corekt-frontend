"use client";

import { Home, type LucideIcon } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserProfile } from "@/features/auth/components/user-profile";
import { Icons } from "@/features/shared/ui/icons";

export function DashboardSidebar() {
  return (
    <div className="flex h-full w-14 flex-col items-center justify-center space-y-4 px-2 py-4">
      <header>
        <Link href="/">
          <Icons.corekt className="size-6" />
          <span className="sr-only">Corekt</span>
        </Link>
      </header>
      <nav className="grid gap-1.5">
        <NavigationLink href="/dashboard" label="Dashboard" icon={Home} />
      </nav>
      <div className="mt-auto flex flex-col items-center">
        <UserProfile />
      </div>
    </div>
  );
}

function NavigationLink({
  href,
  label,
  icon: Icon,
  ...props
}: LinkProps & { icon: LucideIcon; label: string }) {
  const pathname = usePathname();
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            href={href}
            {...props}
            className={buttonVariants({
              variant: pathname === href ? "default" : "ghost",
              size: "icon",
            })}
          >
            <Icon className="size-5" />
          </Link>
        }
      />
      <TooltipContent side="left">{label}</TooltipContent>
    </Tooltip>
  );
}
