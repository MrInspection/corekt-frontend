"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type SegmentOverrides = Record<string, string>;

type DynamicBreadcrumbProps = {
  labelOverrides?: SegmentOverrides;
  hrefOverrides?: SegmentOverrides;
  skippedSegments?: string[];
  nonNavigableSegments?: string[];
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

export function DynamicBreadcrumb({
  labelOverrides = {},
  hrefOverrides = {},
  skippedSegments = [],
  nonNavigableSegments = [],
}: DynamicBreadcrumbProps) {
  const pathname = usePathname();
  const params = useParams();

  const mergedLabelOverrides = { ...defaultLabelOverrides, ...labelOverrides };
  const skippedSet = new Set(skippedSegments);
  const nonNavigableSet = new Set(nonNavigableSegments);

  const paramValues = new Set(
    Object.values(params).flatMap((value) =>
      Array.isArray(value) ? value : [value],
    ),
  );

  // Maps param value -> param key e.g. { tinywallets: "projectId", "1": "versionId" }
  const paramKeyByValue = Object.fromEntries(
    Object.entries(params).flatMap(([key, value]) =>
      Array.isArray(value) ? value.map((v) => [v, key]) : [[value, key]],
    ),
  );

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments
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
        ? mergedLabelOverrides[previousSegment]
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

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map(({ label, href, isLast, isNavigable }, index) => (
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
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
