import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.05" />
      <circle cx="17.35" cy="6.65" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M15.52 3c.31 2.54 1.77 4.06 4.48 4.22v3.18a7.37 7.37 0 0 1-4.36-1.38v5.72c0 2.92-1.53 5.24-3.98 6.08a6.16 6.16 0 0 1-6.94-2.3c-1.1-1.66-1.22-3.78-.32-5.58.96-1.94 2.91-3.1 5.29-3.16.33 0 .66.02.98.07v3.31a3.44 3.44 0 0 0-1.12-.12c-1.18.09-2.1.72-2.47 1.7-.32.87-.11 1.86.55 2.54.71.73 1.8.98 2.81.64 1.11-.38 1.78-1.48 1.78-2.94V3h3.3Z" />
    </svg>
  );
}
