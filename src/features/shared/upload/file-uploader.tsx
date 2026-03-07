"use client";

import {
  AlertCircleIcon,
  PaperclipIcon,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatBytes,
  useFileUpload,
} from "@/features/shared/upload/use-file-upload";
import { cn } from "@/lib/utils";

export default function FileUpload({ className }: { className?: string }) {
  const maxSize = 10 * 1024 * 1024; // 10MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
  });

  const file = files[0];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Drop area */}
      <div
        className="flex h-72 select-none flex-col items-center justify-center rounded-4xl border border-neutral-300 border-dashed p-8 transition-colors has-disabled:pointer-events-none has-disabled:opacity-60 data-[dragging=true]:bg-accent/80"
        data-dragging={isDragging || undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={-1}
      >
        <input
          {...getInputProps()}
          aria-label="Upload file"
          className="sr-only"
          disabled={Boolean(file)}
        />
        <UploadCloud className="size-10 text-muted-foreground" />
        <div className="mt-4 font-medium">
          Choose a file or drag & drop it here
        </div>
        <div className="mt-0.5 text-muted-foreground text-sm">
          PDF format, up to 10 MB.
        </div>
        <Button
          variant="secondary"
          className="mt-4"
          size="lg"
          onClick={openFileDialog}
          focusableWhenDisabled={false}
        >
          Browse Files
        </Button>
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-destructive text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {file && (
        <div className="space-y-2">
          <div
            className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2"
            key={file.id}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <PaperclipIcon
                aria-hidden="true"
                className="size-4 shrink-0 opacity-60"
              />
              <div className="min-w-0">
                <p className="truncate font-medium text-[13px]">
                  {file.file.name}
                </p>
              </div>
            </div>

            <Button
              aria-label="Remove file"
              className="-me-2 size-8 text-muted-foreground/80 hover:text-foreground"
              onClick={() => removeFile(files[0]?.id)}
              size="icon"
              variant="ghost"
            >
              <XIcon aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
