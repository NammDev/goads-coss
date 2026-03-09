import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-3 h-[168px] flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-5 w-10" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex items-end justify-between">
        <Skeleton className="size-6 rounded" />
        <Skeleton className="h-7 w-20 rounded-md" />
      </div>
    </div>
  );
}

export function ToolsHubSkeleton() {
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="container space-y-12 sm:space-y-16">
        {/* Popular Tools */}
        <div className="space-y-6">
          <Skeleton className="h-7 w-36" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* All Tools */}
        <div className="space-y-6">
          <Skeleton className="h-7 w-24" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
