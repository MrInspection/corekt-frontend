"use client";

import {
  AlertCircleIcon,
  PaperclipIcon,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/features/shared/upload/use-file-upload";
import { cn } from "@/lib/utils";

type FileUploadProps = {
  className?: string;
  accept?: string;
  description?: string;
  externalErrors?: string[];
  onFileChange?: (file: File | null) => void;
};

export default function FileUpload({
  className,
  accept = "*",
  description = "Up to 10 MB.",
  externalErrors = [],
  onFileChange,
}: FileUploadProps) {
  const maxSize = 10 * 1024 * 1024;

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
    accept,
    onFilesChange: (files) => {
      const rawFile = files[0]?.file;
      onFileChange?.(rawFile instanceof File ? rawFile : null);
    },
  });

  const file = files[0];
  const allErrors = [...errors, ...externalErrors];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
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
          {description}
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

      {allErrors.length > 0 && (
        <div
          className="flex items-center gap-1 text-destructive text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{allErrors[0]}</span>
        </div>
      )}

      {file && (
        <div className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <PaperclipIcon
              aria-hidden="true"
              className="size-4 shrink-0 opacity-60"
            />
            <p className="truncate font-medium text-[13px]">{file.file.name}</p>
          </div>
          <Button
            aria-label="Remove file"
            className="-me-2 size-8 text-muted-foreground/80 hover:text-foreground"
            onClick={() => removeFile(file.id)}
            size="icon"
            variant="ghost"
          >
            <XIcon aria-hidden="true" className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
