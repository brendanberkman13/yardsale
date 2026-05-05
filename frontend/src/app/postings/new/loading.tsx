import { Skeleton } from "@/components/ui/skeleton";

export default function NewPostingLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 animate-fade">
      {/* Back link */}
      <Skeleton className="h-4 w-16 mb-6" />

      {/* Page heading */}
      <Skeleton className="h-8 w-40 mb-8" />

      <div className="space-y-8">
        {/* Section: The item */}
        <div className="space-y-4">
          <Skeleton className="h-3 w-16 mb-2" />

          {/* Title */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-9 w-full rounded-sm" />
          </div>

          {/* Category + Condition */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-9 w-full rounded-sm" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-9 w-full rounded-sm" />
            </div>
          </div>

          {/* Brand + Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-9 w-full rounded-sm" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-9 w-full rounded-sm" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-36 w-full rounded-sm" />
          </div>
        </div>

        {/* Section: Price & location */}
        <div className="space-y-4">
          <Skeleton className="h-3 w-28 mb-2" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-9 w-full rounded-sm" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-9 w-full rounded-sm" />
            </div>
          </div>
        </div>

        {/* Submit row */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Skeleton className="h-10 w-24 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
