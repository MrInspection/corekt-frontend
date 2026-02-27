import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type StepIndicatorProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  currentStep: number;
  totalSteps: number;
};

export function StepIndicator({
  currentStep,
  totalSteps,
  className,
  ...props
}: StepIndicatorProps) {
  return (
    <div
      className={cn("mx-auto flex w-full max-w-80 gap-2", className)}
      {...props}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            index + 1 === currentStep ? "bg-primary" : "bg-gray-300",
          )}
        />
      ))}
    </div>
  );
}
