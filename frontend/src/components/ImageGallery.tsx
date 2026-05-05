"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
};

export function ImageGallery({ images, alt }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square grid place-items-center bg-muted rounded-sm text-sm text-muted-foreground">
        No image
      </div>
    );
  }

  const total = images.length;
  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden bg-muted rounded-sm">
        <Image
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${alt} — image ${activeIndex + 1} of ${total}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority={activeIndex === 0}
          className="object-cover animate-rise"
        />
        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center size-10 rounded-full bg-background/85 backdrop-blur-sm border border-border hover:bg-background transition-colors"
            >
              <ChevronLeft className="size-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center size-10 rounded-full bg-background/85 backdrop-blur-sm border border-border hover:bg-background transition-colors"
            >
              <ChevronRight className="size-4" strokeWidth={1.75} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs bg-background/90 backdrop-blur-sm border border-border px-2 py-0.5 rounded-sm">
              {activeIndex + 1} / {total}
            </div>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === activeIndex}
              className={`relative shrink-0 size-16 overflow-hidden border transition-opacity ${
                i === activeIndex
                  ? "border-foreground opacity-100"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
