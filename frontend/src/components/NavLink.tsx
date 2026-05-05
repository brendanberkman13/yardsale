"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`relative inline-flex items-center px-3 text-sm transition-colors ${
        isActive
          ? "text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      <span
        aria-hidden
        className={`absolute left-3 right-3 -bottom-px h-0.5 transition-all ${
          isActive ? "bg-accent" : "bg-transparent"
        }`}
      />
    </Link>
  );
}
