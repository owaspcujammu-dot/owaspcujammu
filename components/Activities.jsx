'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bug, ChevronDown, Code2, Flag, Mic, ShieldCheck, Terminal } from 'lucide-react';
import { activities } from '@/lib/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const ICONS = { ShieldCheck, Flag, Bug, Terminal, Code2, Mic };

function ActivityCard({ activity, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `${useId()}-detail`;
  const Icon = ICONS[activity.icon] || ShieldCheck;

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <article className="card card-hover group flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-500 ring-1 ring-accent-500/20 transition-transform duration-300 group-hover:scale-105">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span
            aria-hidden="true"
            className="muted font-mono text-[11px] tabular-nums opacity-60"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-tight">
          {activity.title}
        </h3>

        <p className="muted mt-3 text-[14.5px] leading-relaxed">{activity.summary}</p>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="detail"
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.21, 0.6, 0.35, 1] }}
              className="overflow-hidden"
            >
              <p className="muted mt-4 border-l-2 border-accent-500/40 pl-4 text-[14px] leading-relaxed">
                {activity.detail}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full text-sm font-semibold text-accent-500 transition-opacity hover:opacity-80"
        >
          {open ? 'Show less' : 'Show more'}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
          <span className="sr-only"> about {activity.title}</span>
        </button>
      </article>
    </Reveal>
  );
}

export default function Activities() {
  return (
    <section
      id="activities"
      aria-labelledby="activities-heading"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      {/* Soft separator */}
      <div aria-hidden="true" className="container">
        <div className="rule mb-24 sm:mb-32" />
      </div>

      <div className="container">
        <SectionHeading
          id="activities-heading"
          eyebrow="What we do"
          title="Workshops, competitions and everything in between"
          lede="Six recurring programmes make up a chapter year. Every one of them is practical, open to beginners, and run by students for students."
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <ActivityCard key={activity.title} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
