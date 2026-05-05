import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { ImageGallery } from "@/components/ImageGallery";
import { ConditionBadge } from "@/components/ConditionBadge";
import { Price } from "@/components/Price";
import { FavoriteButton } from "@/components/FavoriteButton";
import { UserAvatar } from "@/components/UserAvatar";
import { getPostingById, getUserById } from "@/lib/queries";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatJoinedDate, formatRelativeDate } from "@/lib/format";

type Params = Promise<{ id: string }>;

export default async function PostingDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const posting = await getPostingById(id);

  if (!posting) {
    notFound();
  }

  const seller = await getUserById(posting.postedByUserId);

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

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 lg:gap-10">
        <div className="relative">
          <ImageGallery images={posting.images} alt={posting.title} />
          <FavoriteButton className="absolute top-3 right-3 z-10" />
        </div>

        <div className="space-y-6">
          <header>
            <p className="text-xs text-muted-foreground">
              {CATEGORY_LABELS[posting.category]}
              {posting.brand ? ` · ${posting.brand}` : ""}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl leading-tight mt-1.5">
              {posting.title}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <Price cents={posting.priceCents} className="text-2xl" />
              <ConditionBadge condition={posting.condition} />
            </div>
          </header>

          <dl className="grid grid-cols-2 gap-y-3 gap-x-6 border-t border-b border-border py-4 text-sm">
            <SpecRow label="Size" value={posting.size} />
            <SpecRow label="Brand" value={posting.brand} />
            <SpecRow label="Location" value={posting.location} />
            <SpecRow label="Listed" value={formatRelativeDate(posting.postedAt)} />
          </dl>

          {posting.description ? (
            <section>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {posting.description}
              </p>
            </section>
          ) : null}

          {seller ? <SellerCard seller={seller} /> : null}

          <Link
            href={seller?.email ? `mailto:${seller.email}` : "#"}
            className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium bg-foreground text-background hover:bg-accent transition-colors px-5 py-3 rounded-sm"
          >
            <Mail className="size-4" strokeWidth={2} />
            Email seller
          </Link>
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5">{value ?? "—"}</dd>
    </div>
  );
}

function SellerCard({
  seller,
}: {
  seller: {
    id: string;
    name: string;
    joinedAt: string;
    location?: string;
  };
}) {
  return (
    <Link
      href={`/users/${seller.id}`}
      className="flex items-center gap-3 p-3 border border-border hover:bg-muted transition-colors rounded-sm"
    >
      <UserAvatar name={seller.name} className="size-10 text-base" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium leading-tight">{seller.name}</div>
        <div className="text-xs text-muted-foreground mt-0.5">
          Member since {formatJoinedDate(seller.joinedAt)}
          {seller.location ? ` · ${seller.location}` : ""}
        </div>
      </div>
      <span aria-hidden className="text-muted-foreground text-sm">→</span>
    </Link>
  );
}
