import { Skeleton } from "@/components/ui/skeleton";

function IssueCardSkeleton() {
  return (
    <section className="rounded-2xl border bg-card opacity-80 shadow-xs">
      <div className="p-6">
        <Skeleton className="h-6 w-[50%]" />
        <Skeleton className="mt-1 h-6 w-[80%]" />
      </div>
      <div className="flex items-center justify-between rounded-b-2xl border-t bg-gray-25 px-6 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </section>
  );
}

export function IssuesLoadingState() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <IssueCardSkeleton key={index} />
      ))}
    </div>
  );
}
