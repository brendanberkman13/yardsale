import { Skeleton } from "@/components/ui/skeleton";
import { PostingGridSkeleton } from "@/components/PostingCardSkeleton";

export default function AccountLoading() {
  return (
    <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto animate-fade">
      <Skeleton className="h-4 w-16 mb-4" />

      <div className="mb-8 flex items-center gap-4 pb-6 border-b border-border">
        <Skeleton className="size-16 rounded-full shrink-0" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-8 w-24 rounded-sm" />
      </div>

      <PostingGridSkeleton count={6} />
    </div>
  );
}
