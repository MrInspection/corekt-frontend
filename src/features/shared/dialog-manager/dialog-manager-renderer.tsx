"use client";

import { getRegisteredDialog } from "@/features/shared/dialog-manager/dialog-manager.registry";
import { useDialogManager } from "@/features/shared/dialog-manager/dialog-manager.store";

export function DialogManagerRenderer() {
  const { openDialogs, closeDialog } = useDialogManager();

  return (
    <>
      {openDialogs.map(({ id, instanceId, props }) => {
        const DialogComponent = getRegisteredDialog(id);
        if (!DialogComponent) return null;

        return (
          <DialogComponent
            key={instanceId}
            {...(props as Record<string, unknown>)}
            open={true}
            onOpenChange={(open: boolean) => {
              if (!open) closeDialog(instanceId);
            }}
          />
        );
      })}
    </>
  );
}
