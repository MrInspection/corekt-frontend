import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

function DashboardHeader({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"header">) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-10 shrink-0 items-center rounded-t-lg border-b bg-background px-4 text-sm",
        className,
      )}
      {...props}
      data-slot="dashboard-header"
    >
      {children}
    </header>
  );
}

function DashboardActionBar({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "sticky top-10 z-50 flex items-center justify-between border-b bg-background px-4 py-1.5",
        className,
      )}
      {...props}
      data-slot="dashboard-action-bar"
    >
      {children}
    </div>
  );
}

function DashboardContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("relative flex-1 overflow-auto", className)}
      data-slot="dashboard-content"
      {...props}
    >
      {children}
    </div>
  );
}

type DashboardProps = {
  children: ReactNode;
  className?: string;
};

function DashboardLayout({ children, className }: DashboardProps) {
  return (
    <main
      className={cn(
        "relative my-2 mr-2 flex flex-1 flex-col rounded border bg-background shadow-sm max-md:ml-2",
        className,
      )}
      data-slot="dashboard-layout"
    >
      {children}
    </main>
  );
}

export {
  DashboardActionBar,
  DashboardContent,
  DashboardHeader,
  DashboardLayout,
};
