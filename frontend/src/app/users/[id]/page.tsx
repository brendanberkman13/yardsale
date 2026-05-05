import { notFound } from "next/navigation";
import { PostingGrid } from "@/components/PostingGrid";
import { UserAvatar } from "@/components/UserAvatar";
import { getAllPostings, getUserById } from "@/lib/queries";
import { formatJoinedDate } from "@/lib/format";

type Params = Promise<{ id: string }>;

export default async function UserProfilePage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const [user, allPostings] = await Promise.all([
    getUserById(id),
    getAllPostings({ postedBy: id }),
  ]);

  if (!user) {
    notFound();
  }

  const postings = allPostings.filter((p) => p.status === "active");

  return (
    <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto animate-fade">
      <header className="mb-8 flex items-center gap-4 pb-6 border-b border-border">
        <UserAvatar name={user.name} className="size-16 text-2xl" />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl sm:text-3xl leading-tight">
            {user.name}
          </h1>
          <div className="mt-1 text-sm text-muted-foreground">
            Member since {formatJoinedDate(user.joinedAt)}
            {user.location ? ` · ${user.location}` : ""}
            {" · "}
            {postings.length} {postings.length === 1 ? "listing" : "listings"}
          </div>
        </div>
      </header>

      {postings.length > 0 ? (
        <PostingGrid postings={postings} />
      ) : (
        <div className="border border-border rounded-sm py-16 px-8 text-center text-sm text-muted-foreground">
          No active listings.
        </div>
      )}
    </div>
  );
}
