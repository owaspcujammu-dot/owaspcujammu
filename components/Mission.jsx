import {
  ArrowRight,
  CalendarClock,
  Palette,
  Rocket,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react';
import { missionPoints, siteConfig } from '@/lib/site';
import GridBackdrop from './GridBackdrop';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const ICONS = { CalendarClock, Wrench, Rocket, Users, Palette, Trophy };

export default function Mission() {
  return (
    <section id="mission" aria-labelledby="mission-heading" className="relative py-24 sm:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Intent */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="mission-heading"
              eyebrow="Why join"
              title="Our mission is simple: make security a skill you own"
              lede="Certificates fade. What lasts is the ability to look at a system, find where it breaks, and explain how to fix it. Everything the chapter does is pointed at that outcome."
            />

            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#join"
                  className="btn-primary"
                >
                  Become a member
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={siteConfig.community.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Join our Discord
                </a>
              </div>
            </Reveal>
          </div>

          {/* Value props */}
          <ul className="grid gap-4 sm:grid-cols-2">
            {missionPoints.map((point, index) => {
              const Icon = ICONS[point.icon] || Rocket;
              return (
                <li key={point.title}>
                  <Reveal delay={(index % 2) * 0.07} className="h-full">
                    <div className="card card-hover h-full p-6">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-500/10 text-accent-500 ring-1 ring-accent-500/20">
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-display text-[15px] font-bold tracking-tight">
                        {point.title}
                      </h3>
                      <p className="muted mt-2 text-[14px] leading-relaxed">{point.body}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Pledge strip */}
      <div className="container mt-20 sm:mt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] px-7 py-12 text-center sm:px-12 sm:py-16">
            <GridBackdrop />
            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-500">
                Our pledge
              </p>
              <p className="mt-5 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl lg:text-[1.75rem]">
                &ldquo;We learn offence to build better defence &mdash; always with permission,
                always in scope, always documented.&rdquo;
              </p>
              <p className="muted mt-5 text-sm">
                Every session runs inside sandboxed or explicitly authorised environments. Ethics
                is the first module of every track we teach.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
