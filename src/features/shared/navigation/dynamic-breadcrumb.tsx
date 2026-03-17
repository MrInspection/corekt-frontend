"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { projectQueryKey } from "@/features/projects/hooks/use-projects.hook";
import { versionQueryKey } from "@/features/projects/hooks/use-versions.hook";

type SegmentOverrides = Record<string, string>;

type DynamicBreadcrumbProps = {
  labelOverrides?: SegmentOverrides;
  hrefOverrides?: SegmentOverrides;
  skippedSegments?: string[];
  nonNavigableSegments?: string[];
  mobileMaxVisible?: number; // how many items to show on mobile before collapsing
};

type BreadcrumbEntry = {
  label: string;
  href: string;
  isLast: boolean;
  isNavigable: boolean;
};

const defaultLabelOverrides: SegmentOverrides = {
  version: "v",
};

function resolveSegmentLabel(
  segment: string,
  overrides: SegmentOverrides,
): string {
  if (overrides[segment]) return overrides[segment];
  return `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`;
}

function CollapsedBreadcrumbs({ items }: { items: BreadcrumbEntry[] }) {
  return (
    <BreadcrumbItem>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1">
          <BreadcrumbEllipsis className="size-4" />
          <span className="sr-only">Toggle menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {items.map(({ label, href, isNavigable }) => (
            <DropdownMenuItem key={href}>
              {isNavigable ? <a href={href}>{label}</a> : <span>{label}</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
  );
}

export function DynamicBreadcrumb({
  labelOverrides = {},
  hrefOverrides = {},
  skippedSegments = [],
  nonNavigableSegments = [],
  mobileMaxVisible = 2,
}: DynamicBreadcrumbProps) {
  const pathname = usePathname();
  const params = useParams();
  const queryClient = useQueryClient();

  const projectId =
    typeof params.projectId === "string" ? params.projectId : undefined;
  const versionId =
    typeof params.version === "string" ? params.version : undefined;
  const userId = queryClient.getQueryData<{ id: string }>(["user", "me"])?.id;

  const cachedProject =
    projectId && userId
      ? queryClient.getQueryData<{ title: string }>(
          projectQueryKey(userId, projectId),
        )
      : undefined;
  const cachedVersion =
    projectId && versionId
      ? queryClient.getQueryData<{ version: number }>(
          versionQueryKey(projectId, versionId),
        )
      : undefined;

  const smartLabelOverrides: SegmentOverrides = { ...labelOverrides };
  if (cachedProject?.title && projectId) {
    smartLabelOverrides[projectId] = cachedProject.title;
  }
  if (cachedVersion?.version && versionId) {
    smartLabelOverrides[versionId] = `v${cachedVersion.version}`;
  }

  const mergedLabelOverrides = {
    ...defaultLabelOverrides,
    ...smartLabelOverrides,
  };
  const skippedSet = new Set(skippedSegments);
  const nonNavigableSet = new Set(nonNavigableSegments);

  const paramValues = new Set(
    Object.values(params).flatMap((value) =>
      Array.isArray(value) ? value : [value],
    ),
  );

  const paramKeyByValue = Object.fromEntries(
    Object.entries(params).flatMap(([key, value]) =>
      Array.isArray(value) ? value.map((v) => [v, key]) : [[value, key]],
    ),
  );

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbEntry[] = segments
    .map((segment, originalIndex) => ({ segment, originalIndex }))
    .filter(({ segment }) => !skippedSet.has(segment))
    .map(({ segment, originalIndex }, index, filtered) => {
      const defaultHref = `/${segments.slice(0, originalIndex + 1).join("/")}`;
      const isParam = paramValues.has(segment);
      const previousSegment = segments[originalIndex - 1];

      const overrideKey = isParam ? paramKeyByValue[segment] : segment;
      const href = hrefOverrides[overrideKey] ?? defaultHref;

      const isParamOfSkippedSegment =
        isParam && skippedSet.has(previousSegment);
      const isNavigable =
        !isParamOfSkippedSegment && !nonNavigableSet.has(segment);

      const label = isParam
        ? mergedLabelOverrides[overrideKey]
          ? mergedLabelOverrides[overrideKey]
          : mergedLabelOverrides[previousSegment]
            ? `${mergedLabelOverrides[previousSegment]}${segment}`
            : resolveSegmentLabel(segment, mergedLabelOverrides)
        : resolveSegmentLabel(segment, mergedLabelOverrides);

      return {
        label,
        href,
        isLast: index === filtered.length - 1,
        isNavigable,
      };
    });

  // On mobile: show first item + ellipsis (collapsed middle) + last item
  // On desktop: show all items
  const shouldCollapse = breadcrumbs.length > mobileMaxVisible;
  const collapsedItems = shouldCollapse
    ? breadcrumbs.slice(1, breadcrumbs.length - 1)
    : [];

  function renderBreadcrumbItem(
    entry: BreadcrumbEntry,
    index: number,
    _items: BreadcrumbEntry[],
  ) {
    const { label, href, isLast, isNavigable } = entry;
    const _isFirst = index === 0;

    return (
      <React.Fragment key={href}>
        {index > 0 && <BreadcrumbSeparator />}
        <BreadcrumbItem>
          {isLast || !isNavigable ? (
            <BreadcrumbPage>{label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </React.Fragment>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {!shouldCollapse &&
          breadcrumbs.map((entry, index) =>
            renderBreadcrumbItem(entry, index, breadcrumbs),
          )}
        {shouldCollapse && (
          <>
            {renderBreadcrumbItem(breadcrumbs[0], 0, breadcrumbs)}
            {collapsedItems.length > 0 && (
              <>
                <BreadcrumbSeparator className="md:hidden" />
                <span className="md:hidden">
                  <CollapsedBreadcrumbs items={collapsedItems} />
                </span>

                {/* Desktop: render normally */}
                {collapsedItems.map((entry, index) => (
                  <span key={entry.href} className="hidden md:contents">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {entry.isNavigable ? (
                        <BreadcrumbLink href={entry.href}>
                          {entry.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{entry.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </span>
                ))}
              </>
            )}

            {/* Last item — always visible */}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {breadcrumbs[breadcrumbs.length - 1].label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
