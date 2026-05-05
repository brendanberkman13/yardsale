import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src?: string | null;
  name: string;
  /** Tailwind size class (e.g., "size-10", "size-16"). Required for layout. */
  className: string;
  /** Render size in px for next/image source quality. Defaults to 128. */
  pixelSize?: number;
};

export function UserAvatar({ src, name, className, pixelSize = 128 }: Props) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={pixelSize}
        height={pixelSize}
        className={cn("rounded-full object-cover shrink-0", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "grid place-items-center rounded-full bg-foreground text-background font-display shrink-0",
        className,
      )}
    >
      {initial}
    </div>
  );
}
