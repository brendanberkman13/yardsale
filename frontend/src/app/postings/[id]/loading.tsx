import { Skeleton } from "@/components/ui/skeleton";

export default function PostingDetailLoading() {
  return (
    <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto animate-fade">
      <Skeleton className="h-4 w-16 mb-4" />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 lg:gap-10">
        <Skeleton className="aspect-square w-full rounded-sm" />

        <div className="space-y-6">
          <div>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-9 w-3/4 mt-3" />
            <div className="mt-4 flex items-center gap-3">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-6 border-t border-b border-border py-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-3 w-12" />
                <Skeleton className="mt-1 h-4 w-20" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>

          <Skeleton className="h-14 w-full rounded-sm" />
          <Skeleton className="h-11 w-full rounded-sm" />
        </div>
      </div>
    </div>
  );
}
