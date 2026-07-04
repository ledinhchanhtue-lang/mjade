type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FacebookIcon({ size = 18, strokeWidth = 1.4, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...base}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <path d="M14 9h2.5V6H14c-1.66 0-3 1.34-3 3v2H9v3h2v7h3v-7h2.3l.7-3H14v-2c0-.28.22-.5.5-.5H14V9z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, strokeWidth = 1.4, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...base}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 18, strokeWidth = 1.4, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...base}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10.5 9.5L15 12L10.5 14.5V9.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
