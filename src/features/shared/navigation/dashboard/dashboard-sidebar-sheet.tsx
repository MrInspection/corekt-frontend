"use client";

import { HomeIcon, PanelLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserProfile } from "@/features/auth/components/user-profile";
import { NavigationLink } from "@/features/shared/navigation/navigation-link";

export function DashboardSidebarSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={true}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon-xs" />}
        className="md:hidden"
      >
        <PanelLeftIcon className="size-3.5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 max-sm:max-w-120">
        <SheetHeader className="p-6 pt-5">
          <Link href="/" className="w-fit">
            <Image
              src="/brand/corekt-brand.svg"
              alt="Corekt Logo"
              width={100}
              height={100}
              className="h-6 w-auto select-none"
              draggable={false}
            />
          </Link>
          <nav className="mt-4 justify-start">
            <NavigationLink
              href="/dashboard"
              label="Dashboard"
              icon={HomeIcon}
            />
          </nav>
        </SheetHeader>
        <SheetFooter>
          <UserProfile fullVersion={true} onClose={() => setOpen(false)} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
