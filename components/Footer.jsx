import { ArrowUp, Heart, Mail } from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/site';
import { Wordmark } from './Logo';
import { socialIcons, socialLabels } from './SocialIcons';

const resourceLinks = [
  { label: 'OWASP Foundation', href: siteConfig.owaspFoundationUrl, external: true },
  { label: 'OWASP Top 10', href: 'https://owasp.org/www-project-top-ten/', external: true },
  { label: 'OWASP Cheat Sheets', href: 'https://cheatsheetseries.owasp.org/', external: true },
  { label: 'Our chapter page', href: siteConfig.owaspChapterUrl, external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"
      />

      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Brand */}
          <div>
            {/* Not decorative here: unlike the header, nothing else in the
                footer carries the chapter name as text. */}
            <Wordmark className="h-10 w-[127px] sm:h-11 sm:w-[140px]" />
            <p className="muted mt-5 max-w-xs text-[14px] leading-relaxed">
              The OWASP Student Chapter at {siteConfig.university} &mdash; learning application
              security by building it, breaking it, and fixing it together.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {Object.entries(siteConfig.socials).map(([key, href]) => {
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${siteConfig.name} on ${socialLabels[key]}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[rgb(var(--border))]
                                 text-[rgb(var(--fg-muted))] transition-colors hover:border-accent-500/50 hover:text-accent-500"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-nav-heading">
            <h2
              id="footer-nav-heading"
              className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent-500"
            >
              Quick links
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="muted text-[14px] transition-colors hover:text-accent-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-labelledby="footer-resources-heading">
            <h2
              id="footer-resources-heading"
              className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent-500"
            >
              Resources
            </h2>
            <ul className="mt-5 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="muted text-[14px] transition-colors hover:text-accent-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent-500">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="muted inline-flex items-center gap-2 break-all text-[14px] transition-colors hover:text-accent-500"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <address className="muted text-[14px] not-italic leading-relaxed">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-[rgb(var(--border))] pt-7 sm:flex-row">
          {/* The chapter is officially recognised by the OWASP Foundation, so
              the old "not an official communication" line understated it. The
              trademark notice stays - that is about the OWASP name and mark,
              not about the chapter's standing. */}
          <p className="muted text-center text-[13px] sm:text-left">
            &copy; {year} {siteConfig.name} &mdash; an official OWASP Student Chapter.
            <br className="hidden sm:block" />
            <span className="sm:text-[12px]">
              OWASP&reg; is a trademark of the OWASP Foundation.
            </span>
          </p>

          <div className="flex items-center gap-5">
            <p className="muted flex items-center gap-1.5 text-[13px]">
              Made with
              <Heart
                className="h-3.5 w-3.5 fill-accent-500 text-accent-500"
                aria-label="love"
              />
              by OWASP CUJ
            </p>

            <a
              href="#home"
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--border))]
                         text-[rgb(var(--fg-muted))] transition-colors hover:border-accent-500/50 hover:text-accent-500"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
