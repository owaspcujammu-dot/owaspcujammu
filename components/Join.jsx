import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import GridBackdrop from './GridBackdrop';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { DiscordIcon, WhatsAppIcon } from './SocialIcons';

const channels = [
  {
    key: 'whatsapp',
    name: 'WhatsApp Community',
    Icon: WhatsAppIcon,
    href: siteConfig.community.whatsapp,
    blurb: 'Announcements, session reminders and quick help. The fastest way to hear about an event.',
    action: 'Join the group',
  },
  {
    key: 'discord',
    name: 'Discord Server',
    Icon: DiscordIcon,
    href: siteConfig.community.discord,
    blurb: 'Where the actual work happens: CTF channels, write-ups, tool talk and project rooms.',
    action: 'Open invite',
  },
];

const expectations = [
  'Open to every branch and every year - no prerequisites',
  'Free to join, and always free to attend',
  'Bring curiosity; we will cover the tooling',
];

export default function Join() {
  return (
    <section id="join" aria-labelledby="join-heading" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="container">
        <div className="rule mb-24 sm:mb-32" />
      </div>

      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] px-6 py-14 sm:px-12 sm:py-16">
          <GridBackdrop withParticles />

          <div className="relative z-10">
            <SectionHeading
              id="join-heading"
              eyebrow="Join us"
              title="Two links between you and the community"
              lede="Pick whichever you already live in. Both are active, both are moderated, and both are where every session gets announced first."
              align="center"
            />

            <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
              {channels.map((channel, index) => (
                <Reveal key={channel.key} delay={index * 0.08} className="h-full">
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-hover group flex h-full flex-col p-6 sm:p-7"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-500 ring-1 ring-accent-500/20">
                      <channel.Icon className="h-5 w-5" />
                    </span>

                    <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
                      {channel.name}
                    </h3>
                    <p className="muted mt-2.5 flex-1 text-[14.5px] leading-relaxed">
                      {channel.blurb}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-500">
                      {channel.action}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <ul className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-7">
                {expectations.map((item) => (
                  <li key={item} className="muted flex items-center gap-2 text-[13px]">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-accent-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
