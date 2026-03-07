import type React from "react";
import { CreateProjectDialog } from "@/features/projects/components/dialogs/create-project-dialog";
import { CreateVersionDialog } from "@/features/projects/components/dialogs/create-version-dialog";

const registry = {
  "create-project": CreateProjectDialog,
  "create-version": CreateVersionDialog,
} as const;

export type DialogId = keyof typeof registry;
export type DialogPropsMap = {
  [K in DialogId]: React.ComponentProps<(typeof registry)[K]>;
};

export function getRegisteredDialog(id: DialogId) {
  return registry[id] as React.ElementType;
}
