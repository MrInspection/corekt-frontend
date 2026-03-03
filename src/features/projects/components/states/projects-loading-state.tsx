import { Skeleton } from "@/components/ui/skeleton";

function ProjectCardSkeleton() {
  return (
    <section className="rounded-xl border bg-card shadow-xs">
      <div className="p-6">
        <Skeleton className="h-6 max-w-3/5" />
        <Skeleton className="mt-2 h-6 max-w-[85%]" />
      </div>
      <div className="flex items-center gap-2 border-t border-dashed px-6 py-4">
        <Skeleton className="h-6 w-26" />
        <Skeleton className="h-6 w-16" />
      </div>
    </section>
  );
}

export function ProjectsLoadingState() {
  return (
    <div className="container grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}
