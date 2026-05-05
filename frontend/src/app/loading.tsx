import { Skeleton } from "@/components/ui/skeleton";
import { PostingGridSkeleton } from "@/components/PostingCardSkeleton";

export default function FeedLoading() {
  return (
    <div className="px-4 sm:px-6 py-6 animate-fade">
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-sm" />
        ))}
      </div>
      <PostingGridSkeleton />
    </div>
  );
}
