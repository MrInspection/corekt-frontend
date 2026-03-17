"use client";

import type { LucideIcon } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function NavigationLink({
  href,
  label,
  icon: Icon,
  ...props
}: LinkProps & { icon: LucideIcon; label: string }) {
  const pathname = usePathname();

  return (
    <Link href={href} {...props}>
      <Button
        size="sm"
        variant={pathname === href ? "secondary" : "ghost"}
        className="w-full justify-start"
      >
        <Icon className="mr-1 size-4" /> {label}
      </Button>
    </Link>
  );
}
