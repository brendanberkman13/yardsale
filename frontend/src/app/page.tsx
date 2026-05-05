import { CategoryFilter } from "@/components/CategoryFilter";
import { PostingGrid } from "@/components/PostingGrid";
import { getAllPostings } from "@/lib/queries";
import { CATEGORIES, type Category } from "@/lib/types";

type SearchParams = Promise<{ category?: string }>;

function parseCategory(value: string | undefined): Category | undefined {
  if (!value) return undefined;
  return (CATEGORIES as readonly string[]).includes(value)
    ? (value as Category)
    : undefined;
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category: categoryParam } = await searchParams;
  const category = parseCategory(categoryParam);
  const postings = await getAllPostings({ category });
  const filterKey = category ?? "all";

  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="mb-6">
        <CategoryFilter active={category} />
      </div>

      <div key={filterKey} className="animate-fade">
        {postings.length > 0 ? (
          <PostingGrid postings={postings} />
        ) : (
          <EmptyState category={category} />
        )}
      </div>
    </div>
  );
}

function EmptyState({ category }: { category: Category | undefined }) {
  return (
    <div className="border border-border rounded-sm py-24 px-8 text-center">
      <p className="text-sm text-muted-foreground">
        {category ? `No ${category} listed yet.` : "Nothing posted yet."}
      </p>
    </div>
  );
}
