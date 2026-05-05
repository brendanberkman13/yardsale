import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { auth, signOut } from "@/auth";
import { PostingGrid } from "@/components/PostingGrid";
import { UserAvatar } from "@/components/UserAvatar";
import { getMe, getMyPostings } from "@/lib/queries";
import { formatJoinedDate } from "@/lib/format";

export default async function AccountPage() {
  const session = await auth();
  const sessionUser = session?.user;
  const idToken = session?.idToken;
  if (!sessionUser || !idToken) {
    redirect("/");
  }

  const [me, allPostings] = await Promise.all([
    getMe(idToken),
    getMyPostings(idToken),
  ]);

  if (!me) {
    return <SessionExpired />;
  }

  const postings = allPostings.filter((p) => p.status === "active");
  const displayName = me.name || sessionUser.name || "Account";

  return (
    <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto animate-fade">
      <div className="mb-4">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </Link>
      </div>

      <header className="mb-8 flex items-center gap-4 pb-6 border-b border-border">
        <UserAvatar name={displayName} className="size-16 text-2xl" />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl sm:text-3xl leading-tight">
            {displayName}
          </h1>
          <div className="mt-1 text-sm text-muted-foreground">
            Member since {formatJoinedDate(me.joinedAt)}
            {me.email ? ` · ${me.email}` : ""}
            {" · "}
            {postings.length} {postings.length === 1 ? "listing" : "listings"}
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 transition-colors px-3 py-1.5 rounded-sm"
          >
            <LogOut className="size-3.5" strokeWidth={2} />
            Sign out
          </button>
        </form>
      </header>

      {postings.length > 0 ? (
        <PostingGrid postings={postings} />
      ) : (
        <div className="border border-border rounded-sm py-16 px-8 text-center text-sm text-muted-foreground">
          You haven&apos;t posted anything yet.{" "}
          <Link
            href="/postings/new"
            className="text-foreground underline underline-offset-2"
          >
            Create your first listing
          </Link>
          .
        </div>
      )}
    </div>
  );
}

function SessionExpired() {
  return (
    <div className="px-4 sm:px-6 py-16 max-w-md mx-auto animate-fade text-center">
      <h1 className="font-display text-2xl mb-2">Session expired</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Your sign-in has expired. Sign out and sign back in to continue.
      </p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 text-sm font-medium bg-foreground text-background hover:bg-accent transition-colors px-5 py-2.5 rounded-sm"
        >
          <LogOut className="size-3.5" strokeWidth={2} />
          Sign out
        </button>
      </form>
    </div>
  );
}
