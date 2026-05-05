import type { Posting } from "@/lib/types";
import { PostingCard } from "@/components/PostingCard";

type Props = {
  postings: Posting[];
};

export function PostingGrid({ postings }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
      {postings.map((posting, i) => (
        <PostingCard key={posting.id} posting={posting} index={i} />
      ))}
    </div>
  );
}
