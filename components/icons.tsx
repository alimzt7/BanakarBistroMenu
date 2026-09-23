import type { ReactNode } from "react";

type IconName =
  | "arrow-up-left"
  | "arrow-left"
  | "arrow-right"
  | "bag"
  | "bell"
  | "calendar"
  | "clock"
  | "close"
  | "edit"
  | "heart"
  | "instagram"
  | "leaf"
  | "location"
  | "minus"
  | "plus"
  | "search"
  | "spark"
  | "phone"
  | "utensils";

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  filled?: boolean;
  className?: string;
};

export function Icon({
  name,
  size = 18,
  strokeWidth = 1.6,
  filled = false,
  className = "",
}: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: filled ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  const paths: Record<IconName, ReactNode> = {
    "arrow-up-left": (
      <>
        <path d="M17 7H7v10" />
        <path d="M7 7l10 10" />
      </>
    ),
    "arrow-left": (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    "arrow-right": (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: (
      <>
        <path d="M6 6l12 12M18 6 6 18" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    heart: (
      <path d="M20.8 8.6c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C11 4 5 7 5 13c0 3.9 3.1 7 7 7 6 0 9-6 8-16Z" />
        <path d="M4 20c3-5 7-8 12-10" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.2 5.8L19 10l-5.8 1.2L12 17l-1.2-5.8L5 10l5.8-1.2L12 3Z" />
        <path d="m19 16 .5 2.5L22 19l-2.5.5L19 22l-.5-2.5L16 19l2.5-.5L19 16Z" />
      </>
    ),
    phone: (
      <>
        <path d="M6.5 3.5 9 3l2 5-2 1.5a14.3 14.3 0 0 0 5.5 5.5l1.5-2 5 2 .5 2.5c.3 1.5-1 2.8-2.5 2.5C10.8 17.7 6.3 13.2 3.5 5c-.3-1.5 1-2.8 3-1.5Z" />
      </>
    ),
    utensils: (
      <>
        <path d="M7 3v7M4.5 3v7a2.5 2.5 0 0 0 5 0V3M7 12v9M16 3v18M16 3c2 2 3 4 3 6.5 0 1.4-1.1 2.5-2.5 2.5H16" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}
