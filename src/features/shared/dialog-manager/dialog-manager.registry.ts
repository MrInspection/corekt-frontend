import type React from "react";
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog";

const registry = {
  "create-project": CreateProjectDialog,
} as const;

export type DialogId = keyof typeof registry;
export type DialogPropsMap = {
  [K in DialogId]: React.ComponentProps<(typeof registry)[K]>;
};

export function getRegisteredDialog(id: DialogId) {
  return registry[id] as React.ElementType;
}
