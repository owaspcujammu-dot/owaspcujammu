import Image from 'next/image';
import { siteConfig } from '@/lib/site';

/**
 * Original OWASP CUJ chapter mark.
 *
 * A shield (security) built from a bracket pair (code) around a terminal
 * caret (hands-on practice). Drawn as inline SVG so it is crisp at every
 * size, themable via currentColor, and costs zero network requests.
 *
 * [ADD LOGO] If the chapter adopts an official artwork file, drop it in
 * /public/logo.svg and swap this component's body for a next/image tag.
 */
export default function LogoMark({ className = 'h-9 w-9', title = 'OWASP CUJ logo' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="owasp-cuj-shield" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
          {/* Set via style, not the stopColor attribute: presentation
              attributes do not resolve var(), inline styles do. */}
          <stop offset="0%" style={{ stopColor: 'rgb(var(--accent-400))' }} />
          <stop offset="55%" style={{ stopColor: 'rgb(var(--accent-500))' }} />
          <stop offset="100%" style={{ stopColor: 'rgb(var(--accent-500))' }} />
        </linearGradient>
      </defs>

      {/* Shield outline */}
      <path
        d="M24 3.2 42 9.4v13.1c0 10.3-7.1 19.4-18 22.3C13.1 41.9 6 32.8 6 22.5V9.4L24 3.2Z"
        stroke="url(#owasp-cuj-shield)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />

      {/* Code brackets */}
      <path
        d="M18.6 17.4 13.4 23l5.2 5.6M29.4 17.4 34.6 23l-5.2 5.6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Terminal caret */}
      <path
        d="M22.2 32.8 26.4 15.6"
        stroke="url(#owasp-cuj-shield)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The Chapter WASP wordmark, theme-swapped by CSS.
 *
 * Both source PNGs are background-free, so the mark sits directly on the
 * page in either theme. Sizes are fixed per breakpoint (rather than
 * `h-9 w-auto`) to preserve the 814:256 ratio without next/image warning
 * about a single CSS-modified dimension.
 *
 * `decorative` drops the alt text for cases where the wrapping link already
 * carries an accessible name.
 */
export function Wordmark({ className = '', priority = false, decorative = false }) {
  const logo = siteConfig.heroLogo;
  if (!logo) return <LogoLockup />;

  const alt = decorative ? '' : logo.alt;

  return (
    <span className={`relative block ${className}`}>
      <Image
        src={logo.light}
        alt={alt}
        fill
        sizes="160px"
        priority={priority}
        className="object-contain object-left dark:hidden"
      />
      <Image
        src={logo.dark}
        alt={alt}
        fill
        sizes="160px"
        priority={priority}
        className="hidden object-contain object-left dark:block"
      />
    </span>
  );
}

/** Mark + wordmark lockup used in the header and footer. */
export function LogoLockup({ className = '', markClassName = 'h-9 w-9' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight">
          OWASP <span className="text-accent-500">CUJ</span>
        </span>
        <span className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-[rgb(var(--fg-muted))]">
          Student Chapter
        </span>
      </span>
    </span>
  );
}
