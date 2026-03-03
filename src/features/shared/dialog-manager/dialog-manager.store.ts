import { create } from "zustand";
import type { DialogId } from "@/features/shared/dialog-manager/dialog-manager.registry";

export type DialogInstance = {
  id: DialogId;
  instanceId: string; // unique per instance
  props?: unknown;
};

type DialogManagerState = {
  openDialogs: DialogInstance[];
  openDialog: (id: DialogId, props?: unknown) => string; // returns instanceId
  closeDialog: (instanceId: string) => unknown;
  closeCurrentDialog: () => void;
  closeAllDialogs: () => void;
};

function generateInstanceId(id: DialogId) {
  return `${id}-${Math.random().toString(36).slice(2, 10)}`;
}

export const useDialogManager = create<DialogManagerState>((set) => ({
  openDialogs: [],
  openDialog: (id, props) => {
    const instanceId = generateInstanceId(id);
    set((state) => ({
      openDialogs: [...state.openDialogs, { id, instanceId, props }],
    }));
    return instanceId;
  },
  closeDialog: (instanceId) => {
    set((state) => ({
      openDialogs: state.openDialogs.filter(
        (dialog) => dialog.instanceId !== instanceId,
      ),
    }));
  },
  closeCurrentDialog: () => {
    set((state) => ({
      openDialogs: state.openDialogs.slice(0, -1),
    }));
  },
  closeAllDialogs: () => set({ openDialogs: [] }),
}));
