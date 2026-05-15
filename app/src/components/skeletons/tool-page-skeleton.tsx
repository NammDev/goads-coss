import { ToolPageShell } from "@/app/_legacy-tools/layout";
import { Skeleton } from "@/components/ui/skeleton";

export function ToolPageSkeleton() {
  return (
    <ToolPageShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 rounded-md" /> {/* mobile sidebar btn placeholder */}
          <Skeleton className="h-8 w-52" />             {/* h1 title */}
          <Skeleton className="h-4 w-72" />             {/* description */}
        </div>

        {/* Options / controls row */}
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>

        {/* Two textarea blocks side by side on desktop */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>

        {/* Action button row */}
        <div className="flex gap-2">
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </div>
    </ToolPageShell>
  );
}
