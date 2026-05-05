import { formatPrice } from "@/lib/format";

type Props = {
  cents: number;
  className?: string;
};

export function Price({ cents, className }: Props) {
  return (
    <span className={`font-mono tabular-nums ${className ?? ""}`}>
      {formatPrice(cents)}
    </span>
  );
}
