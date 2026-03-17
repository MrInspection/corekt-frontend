"use client";

import type { ComponentProps } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ConfirmationDialogProps = {
  content: {
    title: string;
    description: string;
    confirmText: string;
    isLoadingText?: string;
  };
  onConfirm?: () => void;
  isLoading?: boolean;
} & Omit<ComponentProps<typeof AlertDialog>, "children">;

export function ConfirmationDialog({
  content,
  onConfirm,
  isLoading,
  ...props
}: ConfirmationDialogProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{content.title}</AlertDialogTitle>
          <AlertDialogDescription>{content.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-2">
          <AlertDialogCancel className="w-full" variant="secondary">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full"
            variant="destructive"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
            isLoadingText={content.isLoadingText}
          >
            {content.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
