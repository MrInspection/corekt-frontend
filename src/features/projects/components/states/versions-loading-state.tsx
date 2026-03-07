import { Skeleton } from "@/components/ui/skeleton";

function VersionsCardSkeleton() {
  return (
    <section className="max-h-fit rounded-xl border bg-card opacity-80 shadow-xs">
      <div className="flex items-start justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-52" />
        </div>
      </div>
      <div className="flex items-center justify-between border-t px-6 py-4">
        <div className="flex items-center gap-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </section>
  );
}

export function VersionsLoadingState() {
  return (
    <div className="container grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <VersionsCardSkeleton key={index} />
      ))}
    </div>
  );
}
