/**
 * Brand glyphs, drawn inline rather than pulled from an icon set.
 *
 * Icon libraries keep deprecating and removing brand marks, which quietly
 * breaks builds on upgrade. Defining the ones we need here keeps the bundle
 * small and the dependency surface honest. Every glyph inherits currentColor
 * and is decorative - the accessible name lives on the wrapping link.
 */

const base = {
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
  focusable: 'false',
  xmlns: 'http://www.w3.org/2000/svg',
};

export function LinkedInIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function GitHubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className} fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58l-.01-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.75.09-.73.09-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

export function InstagramIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      {...base}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      {...base}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <path d="M15 7.7h-1.1a2.5 2.5 0 0 0-2.5 2.5v7.6M9.5 12.4h5.3" />
    </svg>
  );
}

export function XIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className} fill="currentColor">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.67l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className} fill="currentColor">
      <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.46 1.34 4.96L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01a9.9 9.9 0 0 0 9.93-9.9A9.9 9.9 0 0 0 12.04 2Zm0 18.16h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 1 1 6.99 3.87Zm4.5-6.15c-.24-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.24-.64.8-.78.96-.15.17-.29.19-.53.07-.25-.13-1.04-.39-1.98-1.23-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.55-.43h-.48c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.22-.17-.46-.29Z" />
    </svg>
  );
}

export function DiscordIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className} fill="currentColor">
      <path d="M19.63 5.33A16.2 16.2 0 0 0 15.6 4.1a.06.06 0 0 0-.06.03c-.17.31-.37.72-.5 1.04a15 15 0 0 0-4.48 0c-.14-.33-.34-.73-.51-1.04a.06.06 0 0 0-.06-.03c-1.4.24-2.75.66-4.02 1.23a.05.05 0 0 0-.03.02C2.4 9.16 1.7 12.88 2.05 16.56a.07.07 0 0 0 .02.05 16.3 16.3 0 0 0 4.92 2.49.06.06 0 0 0 .07-.03c.38-.52.72-1.06 1.01-1.64a.06.06 0 0 0-.04-.09c-.53-.2-1.04-.45-1.53-.73a.06.06 0 0 1 0-.11l.3-.24a.06.06 0 0 1 .07 0 11.6 11.6 0 0 0 9.858 0 .06.06 0 0 1 .07 0l.3.24a.06.06 0 0 1 0 .11c-.49.29-1 .53-1.53.73a.06.06 0 0 0-.04.09c.3.58.64 1.12 1.01 1.64a.06.06 0 0 0 .07.03 16.25 16.25 0 0 0 4.93-2.49.06.06 0 0 0 .02-.05c.42-4.26-.68-7.95-2.9-11.21a.05.05 0 0 0-.03-.02ZM8.68 14.32c-.97 0-1.77-.89-1.77-1.98s.78-1.98 1.77-1.98c1 0 1.79.9 1.77 1.98 0 1.09-.78 1.98-1.77 1.98Zm6.54 0c-.97 0-1.77-.89-1.77-1.98s.78-1.98 1.77-1.98c1 0 1.79.9 1.77 1.98 0 1.09-.77 1.98-1.77 1.98Z" />
    </svg>
  );
}

/** Convenience map used by the Team and Footer sections. */
export const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: XIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  whatsapp: WhatsAppIcon,
  discord: DiscordIcon,
};

export const socialLabels = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'X (formerly Twitter)',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  whatsapp: 'WhatsApp',
  discord: 'Discord',
};
