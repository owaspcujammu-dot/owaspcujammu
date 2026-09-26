import { ArrowUpRight, BookOpen, Globe2, Landmark, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const chapterFacts = [
  { icon: Landmark, label: 'Chapter', value: 'OWASP CUJ Student Chapter' },
  { icon: Globe2, label: 'Campus', value: siteConfig.university },
  { icon: Sparkles, label: 'Founded', value: siteConfig.founded },
  { icon: BookOpen, label: 'Membership', value: 'Free & open to every branch' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title="A global mission, run by students at CUJ"
          lede="OWASP gives the world its most widely used application-security knowledge. Our job is to bring that knowledge onto campus and make it something you can practise, not just read about."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* What is OWASP? */}
          <Reveal className="h-full">
            <article className="card card-hover h-full p-7 sm:p-9">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-500 ring-1 ring-accent-500/20">
                <Globe2 className="h-5 w-5" aria-hidden="true" />
              </span>

              <h3 className="mt-6 font-display text-xl font-bold tracking-tight sm:text-2xl">
                What is OWASP?
              </h3>

              <div className="muted mt-4 space-y-4 text-[15px] leading-relaxed">
                <p>
                  The Open Worldwide Application Security Project is a non-profit foundation
                  dedicated to improving the security of software. Everything it produces &mdash;
                  documentation, tools, standards and training material &mdash; is free, open source
                  and built in the open by a global community of volunteers.
                </p>
                <p>
                  Its best-known work, the{' '}
                  <span className="font-medium text-[rgb(var(--fg))]">OWASP Top 10</span>, has become
                  the default reference for the risks that matter most in modern web applications,
                  and is used by engineering teams, auditors and regulators worldwide. Hundreds of
                  local and student chapters carry that work into cities and campuses everywhere.
                </p>
              </div>

              <a
                href={siteConfig.owaspFoundationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-500 transition-opacity hover:opacity-80"
              >
                Visit the OWASP Foundation
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </Reveal>

          {/* About the chapter */}
          <Reveal delay={0.1} className="h-full">
            <article className="card card-hover relative h-full overflow-hidden p-7 sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent-500/10 blur-3xl"
              />

              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-500 ring-1 ring-accent-500/20">
                <Landmark className="h-5 w-5" aria-hidden="true" />
              </span>

              <h3 className="mt-6 font-display text-xl font-bold tracking-tight sm:text-2xl">
                About the OWASP CUJ Chapter
              </h3>

              <div className="muted mt-4 space-y-4 text-[15px] leading-relaxed">
                <p>
                  We are the official OWASP student chapter at {siteConfig.university}, founded in{' '}
                  {siteConfig.founded} by students who wanted somewhere on campus to actually
                  <em> do</em> security rather than only study it. We are open to every year and
                  every branch &mdash; there is no entry test and no membership fee.
                </p>
                <p>
                  Through the semester we run hands-on workshops, Capture The Flag competitions,
                  bug bounty clinics, hackathons and guest talks with working practitioners. Along
                  the way members contribute to open-source projects, publish write-ups, and build a
                  portfolio that speaks for them in internship interviews.
                </p>
              </div>

              <dl className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {chapterFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start gap-3 rounded-xl border border-[rgb(var(--border))] px-3.5 py-3"
                  >
                    <fact.icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-500"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <dt className="muted font-mono text-[10px] uppercase tracking-[0.16em]">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-[13px] font-medium leading-snug">{fact.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <a
                href={siteConfig.owaspChapterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 w-full sm:w-auto"
              >
                Explore Our Chapter
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
