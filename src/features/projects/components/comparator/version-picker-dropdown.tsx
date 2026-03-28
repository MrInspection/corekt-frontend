"use client";

import { ChevronDownIcon, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Version } from "@/features/projects/validation/versions.schema";

type VersionPickerDropdownProps = {
  versions: Version[];
  selected: Version | null;
  excludedVersionId?: string;
  placeholder?: string;
  onSelect: (version: Version) => void;
};

export function VersionPickerDropdown({
  versions,
  selected,
  excludedVersionId,
  placeholder = "select a version",
  onSelect,
}: VersionPickerDropdownProps) {
  const filteredVersions = excludedVersionId
    ? versions.filter((v) => v.id !== excludedVersionId)
    : versions;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="xs"
            className={selected ? undefined : "text-muted-foreground"}
          />
        }
      >
        <GitBranch />
        {selected ? `v${selected.version} · ${selected.title}` : placeholder}
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {filteredVersions.map((version) => (
          <DropdownMenuItem
            key={version.id}
            className="text-xs"
            onClick={() => onSelect(version)}
          >
            <GitBranch className="size-3.5 text-muted-foreground" />v
            {version.version} · {version.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
