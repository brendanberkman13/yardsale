const PRICE_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

const RELATIVE_FORMATTER = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
});

export function formatPrice(priceCents: number): string {
  return PRICE_FORMATTER.format(priceCents / 100);
}

export function formatJoinedDate(iso: string): string {
  return MONTH_YEAR_FORMATTER.format(new Date(iso));
}

export function formatRelativeDate(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  const diffMs = then.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const absSec = Math.abs(diffSec);

  if (absSec < 60) return RELATIVE_FORMATTER.format(diffSec, "second");
  if (absSec < 3600) return RELATIVE_FORMATTER.format(Math.round(diffSec / 60), "minute");
  if (absSec < 86_400) return RELATIVE_FORMATTER.format(Math.round(diffSec / 3600), "hour");
  if (absSec < 604_800) return RELATIVE_FORMATTER.format(Math.round(diffSec / 86_400), "day");
  if (absSec < 2_592_000) return RELATIVE_FORMATTER.format(Math.round(diffSec / 604_800), "week");
  if (absSec < 31_536_000) return RELATIVE_FORMATTER.format(Math.round(diffSec / 2_592_000), "month");
  return RELATIVE_FORMATTER.format(Math.round(diffSec / 31_536_000), "year");
}
