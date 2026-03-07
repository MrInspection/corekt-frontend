import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function EmptyState({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "container flex max-w-100 flex-1 select-none flex-col justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function EmptyStateIcon({
  icon: Icon,
  className,
  ...props
}: ComponentProps<"div"> & { icon: LucideIcon }) {
  return (
    <div
      className={cn(
        "mb-6 flex size-12 items-center justify-center rounded-lg bg-muted",
        className,
      )}
      {...props}
    >
      <Icon />
    </div>
  );
}

function EmptyStateTitle({
  children,
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="empty-title"
      className={cn("font-medium text-lg", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

function EmptyStateDescription({
  children,
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn(
        "text-pretty text-muted-foreground text-sm [[data-slot=empty-title]+&]:mt-2",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

function EmptyStateAction({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-4 [[data-slot=empty-description]+&]:mt-4 [[data-slot=empty-title]+&]:mt-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
};
