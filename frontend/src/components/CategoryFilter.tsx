import Link from "next/link";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/lib/types";

type Props = {
  active?: Category;
};

export function CategoryFilter({ active }: Props) {
  return (
    <nav
      aria-label="Filter by category"
      className="flex flex-wrap items-center gap-1.5"
    >
      <Chip href="/" active={active === undefined}>
        All
      </Chip>
      {CATEGORIES.map((category) => (
        <Chip
          key={category}
          href={`/?category=${category}`}
          active={active === category}
        >
          {CATEGORY_LABELS[category]}
        </Chip>
      ))}
    </nav>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`text-sm px-3 py-1.5 rounded-sm transition-colors border ${
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-background text-foreground border-border hover:bg-muted"
      }`}
    >
      {children}
    </Link>
  );
}
