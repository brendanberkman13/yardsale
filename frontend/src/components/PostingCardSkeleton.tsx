import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  count?: number;
};

export function PostingGridSkeleton({ count = 10 }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <PostingCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PostingCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-square w-full rounded-sm" />
      <Skeleton className="mt-3 h-4 w-4/5" />
      <div className="mt-2 flex items-center justify-between gap-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}
