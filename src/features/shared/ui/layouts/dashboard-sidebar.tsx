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
    <div className="mb-2 flex h-full w-14 flex-col items-center justify-center px-2 pb-2">
      <header className="p-4">
        <Link href="/">
          <Icons.corekt className="size-6" />
          <span className="sr-only">Corekt</span>
        </Link>
      </header>
      <nav className="grid gap-1.5">
        <NavigationLink href="/dashboard" label="Dashboard" icon={Home} />
      </nav>
      <div className="mt-auto space-y-2">
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
