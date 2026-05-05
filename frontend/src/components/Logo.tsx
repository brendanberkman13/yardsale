type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 28 24"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* back range — lighter */}
      <path
        d="M0 19 L6 9 L11 14 L16 6 L22 14 L28 19 Z"
        fill="currentColor"
        fillOpacity="0.25"
      />
      {/* front range — solid */}
      <path
        d="M0 22 L7 12 L12 17 L18 8 L23 14 L28 22 Z"
        fill="currentColor"
      />
      {/* sun */}
      <circle cx="20" cy="5" r="2.25" fill="var(--color-accent)" />
    </svg>
  );
}
