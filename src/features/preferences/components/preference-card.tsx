import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function PreferenceCard({
  title,
  description,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-6 rounded-lg border p-4 max-sm:flex-col sm:items-center sm:justify-between md:gap-10",
        className,
      )}
      {...props}
    >
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-pretty text-muted-foreground text-sm">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
