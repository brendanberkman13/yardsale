import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS, type Posting } from "@/lib/types";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Price } from "@/components/Price";

type Props = {
  posting: Posting;
  index?: number;
};

export function PostingCard({ posting, index = 0 }: Props) {
  const heroImage = posting.images[0];
  const animationDelay = `${Math.min(index, 10) * 80}ms`;

  return (
    <article className="group relative animate-rise" style={{ animationDelay }}>
      <Link
        href={`/postings/${posting.id}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div className="relative aspect-square overflow-hidden bg-muted rounded-sm">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={posting.title}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-[var(--ease-alpine)] group-hover:scale-[1.02]"
            />
          ) : (
            <div className="grid place-items-center size-full text-xs text-muted-foreground">
              No image
            </div>
          )}
          <FavoriteButton className="absolute top-2 right-2" />
        </div>

        <div className="mt-3">
          <h3 className="text-sm font-medium leading-snug line-clamp-2">
            {posting.title}
          </h3>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground truncate">
              {posting.brand ?? CATEGORY_LABELS[posting.category]}
              {posting.size ? ` · ${posting.size}` : ""}
            </span>
            <Price cents={posting.priceCents} className="text-sm shrink-0" />
          </div>
        </div>
      </Link>
    </article>
  );
}
