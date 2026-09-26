import Image from 'next/image';
import { HandHeart, Mail, Sparkles } from 'lucide-react';
import { siteConfig, sponsorTiers } from '@/lib/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const benefits = [
  'Brand placement on our flagship CTF and hackathon',
  'Direct access to a motivated security-focused talent pool',
  'A speaking or workshop slot for your engineering team',
  'Recognition across our site, posters and social channels',
];

function SponsorLogo({ sponsor }) {
  const content = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={`${sponsor.name} logo`}
      width={160}
      height={56}
      className="h-10 w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
    />
  ) : (
    <span className="font-display text-base font-bold tracking-tight">{sponsor.name}</span>
  );

  if (!sponsor.url) {
    return (
      <div className="card group grid h-24 place-items-center px-6">{content}</div>
    );
  }

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      aria-label={`${sponsor.name} (opens in a new tab)`}
      className="card card-hover group grid h-24 place-items-center px-6"
    >
      {content}
    </a>
  );
}

function EmptyTier({ tier }) {
  return (
    <div
      className="grid h-24 place-items-center rounded-2xl border border-dashed border-[rgb(var(--border))]
                 bg-[rgb(var(--bg-elevated))]/50 px-6 text-center"
    >
      <p className="muted text-[13px]">
        <Sparkles
          className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px text-accent-500"
          aria-hidden="true"
        />
        Become our first{' '}
        <span className="font-semibold text-[rgb(var(--fg))]">{tier.replace(/s$/, '')}</span>
      </p>
    </div>
  );
}

export default function Sponsors() {
  return (
    <section id="sponsors" aria-labelledby="sponsors-heading" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="container">
        <div className="rule mb-24 sm:mb-32" />
      </div>

      <div className="container">
        <SectionHeading
          id="sponsors-heading"
          eyebrow="Sponsors & Partners"
          title="Back the next generation of security engineers"
          lede="We are just getting started, and the ground floor is open. Sponsorship keeps our events free for students and our labs running."
          align="center"
        />

        <div className="mt-14 space-y-10">
          {sponsorTiers.map((tier, index) => (
            <Reveal key={tier.tier} delay={index * 0.08}>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[rgb(var(--border))] pb-3">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-500">
                    {tier.tier}
                  </h3>
                  <p className="muted text-[13px]">{tier.blurb}</p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {tier.sponsors.length > 0 ? (
                    tier.sponsors.map((sponsor) => (
                      <SponsorLogo key={sponsor.name} sponsor={sponsor} />
                    ))
                  ) : (
                    <>
                      <EmptyTier tier={tier.tier} />
                      <div className="hidden sm:block">
                        <EmptyTier tier={tier.tier} />
                      </div>
                      <div className="hidden lg:block">
                        <EmptyTier tier={tier.tier} />
                      </div>
                      <div className="hidden lg:block">
                        <EmptyTier tier={tier.tier} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Sponsorship pitch */}
        <Reveal delay={0.1}>
          <div className="card mt-14 grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-500 ring-1 ring-accent-500/20">
                <HandHeart className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight sm:text-2xl">
                Partner with OWASP CUJ
              </h3>
              <p className="muted mt-3 text-[15px] leading-relaxed">
                Whether you are a product company, a security firm, or a student community, there
                is a way to work together. Tell us what you care about and we will build the
                collaboration around it.
              </p>
              <a href={`mailto:${siteConfig.email}?subject=Sponsorship%20enquiry`} className="btn-primary mt-7">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Talk sponsorship
              </a>
            </div>

            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-[14.5px] leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                  />
                  <span className="muted">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
