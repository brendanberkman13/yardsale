import Link from "next/link";
import { LogIn, Plus } from "lucide-react";
import { auth, signIn } from "@/auth";
import { Logo } from "@/components/Logo";
import { NavLink } from "@/components/NavLink";

export async function Header() {
  const session = await auth();
  const isSignedIn = !!session?.user;

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:text-foreground"
        >
          <Logo className="h-6 w-7 text-foreground" />
          <span className="text-lg font-bold tracking-tight">yardsale</span>
        </Link>

        <nav className="flex items-stretch gap-1 h-full">
          <NavLink href="/">Home</NavLink>

          {isSignedIn ? (
            <>
              <NavLink href="/account">User</NavLink>
              <Link
                href="/postings/new"
                className="my-2 ml-2 inline-flex items-center gap-1.5 text-sm font-medium bg-accent text-accent-foreground hover:opacity-90 transition-opacity px-3.5 rounded-sm"
              >
                <Plus className="size-3.5" strokeWidth={2.5} />
                New posting
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
              className="flex items-stretch"
            >
              <button
                type="submit"
                className="my-2 ml-2 inline-flex items-center gap-1.5 text-sm font-medium bg-accent text-accent-foreground hover:opacity-90 transition-opacity px-3.5 rounded-sm"
              >
                <LogIn className="size-3.5" strokeWidth={2.5} />
                Sign in
              </button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
