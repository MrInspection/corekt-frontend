import { Skeleton } from "@/components/ui/skeleton";

function AchievementCardSkeleton() {
  return (
    <section className="flex items-center gap-4 rounded-xl border p-4">
      <Skeleton className="size-10" />
      <div className="flex-1">
        <Skeleton className="h-4 w-[40%]" />
        <Skeleton className="mt-1 h-4 w-[80%]" />
      </div>
    </section>
  );
}

export function AchievementLoadingState() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <AchievementCardSkeleton key={index} />
      ))}
    </div>
  );
}
