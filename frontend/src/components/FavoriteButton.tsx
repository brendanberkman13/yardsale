"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

type Props = {
  className?: string;
};

export function FavoriteButton({ className }: Props) {
  const [favorited, setFavorited] = useState(false);

  return (
    <button
      type="button"
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorited}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorited((prev) => !prev);
      }}
      className={`grid place-items-center size-9 rounded-full bg-background/85 backdrop-blur-sm border border-border hover:bg-background transition-colors ${className ?? ""}`}
    >
      <Heart
        className={`size-4 transition-all ${
          favorited
            ? "fill-accent text-accent"
            : "fill-transparent text-foreground"
        }`}
        strokeWidth={favorited ? 0 : 1.75}
      />
    </button>
  );
}
