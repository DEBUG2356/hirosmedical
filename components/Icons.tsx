import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const PhoneIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const GroupIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="7" r="3" />
    <circle cx="5" cy="9" r="2.2" />
    <circle cx="19" cy="9" r="2.2" />
    <path d="M7 20v-2a5 5 0 0 1 10 0v2" />
    <path d="M1.5 17v-1.2a3.5 3.5 0 0 1 4.5-3.3" />
    <path d="M22.5 17v-1.2a3.5 3.5 0 0 0-4.5-3.3" />
  </svg>
);

export const PhysioIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="5" r="2.6" />
    <path d="M6 21v-6a6 6 0 0 1 12 0v6" />
    <path d="M12 12v4" />
    <path d="M10 14h4" />
  </svg>
);

export const DeviceIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M7 20h10M12 16v4" />
    <path d="M7 10h2l1.5-3 2 6 1.5-3h3" />
  </svg>
);

export const HandsIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 13V7.5a1.5 1.5 0 0 1 3 0V12" />
    <path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M10 11V6.5a1.5 1.5 0 0 1 3 0V12" />
    <path d="M13 12V8.5a1.5 1.5 0 0 1 3 0V14" />
    <path d="M4 13c0 4 2.5 8 7 8s7-3 7-7v-1" />
    <path d="M20 12.5 17.5 15" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChatIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
    <circle cx="9" cy="10.5" r="0.6" fill="currentColor" />
    <circle cx="12" cy="10.5" r="0.6" fill="currentColor" />
    <circle cx="15" cy="10.5" r="0.6" fill="currentColor" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base({ strokeWidth: 2.4, ...p })}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base({ strokeWidth: 2.2, ...p })}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base({ strokeWidth: 2, ...p })}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const FacebookIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z" />
  </svg>
);

export const ChevronIcon = (p: P) => (
  <svg {...base({ strokeWidth: 2, ...p })}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const SparkIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2c.6 5.5 4.5 9.4 10 10-5.5.6-9.4 4.5-10 10-.6-5.5-4.5-9.4-10-10 5.5-.6 9.4-4.5 10-10Z" />
  </svg>
);
