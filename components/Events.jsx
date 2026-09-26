'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarDays, ImageIcon, MapPin } from 'lucide-react';
import { events } from '@/lib/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Shown when an event is announced but not yet scheduled (`date: null`). */
const UNDATED_LABEL = 'Date coming soon';

/**
 * Deterministic date formatting - no Intl or local timezone involved, so the
 * server-rendered markup always matches the client and hydration stays clean.
 * Returns null for an event with no date yet.
 */
function formatDate(iso) {
  if (!iso) return null;
  const [year, month, day] = iso.split('-').map(Number);
  return {
    day: String(day).padStart(2, '0'),
    month: MONTHS[month - 1],
    year: String(year),
    full: `${day} ${MONTHS[month - 1]} ${year}`,
  };
}

const FILTERS = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
  { key: 'all', label: 'All' },
];

function EventBanner({ event }) {
  if (event.banner) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
        <Image
          src={event.banner}
          alt={`Banner for ${event.title}`}
          fill
          sizes="(max-width: 640px) 100vw, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-xl border border-dashed
                 border-[rgb(var(--border))] bg-[rgb(var(--bg))]"
      role="img"
      aria-label={`Banner placeholder for ${event.title}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-honeycomb-light bg-[size:25.98px_15px] opacity-70 dark:bg-honeycomb-dark"
      />
      <div className="relative flex flex-col items-center gap-2 px-3 text-center">
        <ImageIcon className="h-5 w-5 text-accent-500/70" aria-hidden="true" />
        <span className="muted font-mono text-[9.5px] uppercase tracking-[0.16em]">
          [ADD EVENT BANNER]
        </span>
      </div>
    </div>
  );
}

export default function Events() {
  const [filter, setFilter] = useState('upcoming');

  const visible = useMemo(() => {
    const list = filter === 'all' ? events : events.filter((event) => event.status === filter);
    // Upcoming: soonest first. Past: most recent first. Events with no date yet
    // sort to the end - they cannot be placed on the timeline until scheduled.
    return [...list].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return filter === 'past' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    });
  }, [filter]);

  return (
    <section id="events" aria-labelledby="events-heading" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="container">
        <div className="rule mb-24 sm:mb-32" />
      </div>

      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="events-heading"
            eyebrow="Events"
            title="What is next on the chapter calendar"
            lede="Sessions are announced here first and in our community group. Everything is free for CUJ students."
          />

          {/* Filter tabs */}
          <div
            role="tablist"
            aria-label="Filter events"
            className="flex w-fit shrink-0 gap-1 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] p-1"
          >
            {FILTERS.map((item) => {
              const selected = filter === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(item.key)}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                    selected ? 'text-white' : 'muted hover:text-[rgb(var(--fg))]'
                  }`}
                >
                  {selected ? (
                    <motion.span
                      layoutId="event-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent-600 ring-1 ring-inset ring-white/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent-500/50 via-[rgb(var(--border))] to-transparent sm:block"
          />

          {/* Changing the key remounts the list, which replays the enter
              animation. Kept out of AnimatePresence on purpose: a filter
              should swap instantly rather than wait out an exit animation
              first, and the new list renders even if animations are paused. */}
          <motion.ol
            key={filter}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {visible.map((event) => {
              const date = formatDate(event.date);
              const isUpcoming = event.status === 'upcoming';

              return (
                <li key={event.title} className="relative sm:pl-14">
                  {/* Timeline node */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-[13px] top-8 hidden h-3 w-3 rounded-full ring-4 ring-[rgb(var(--bg))] sm:block ${
                      isUpcoming ? 'bg-accent-500' : 'bg-[rgb(var(--border))]'
                    }`}
                  />

                  <article className="card card-hover group grid gap-5 p-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:p-6">
                    <EventBanner event={event} />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${
                            isUpcoming
                              ? 'bg-accent-500/12 text-accent-500 ring-1 ring-accent-500/25'
                              : 'muted bg-[rgb(var(--bg))] ring-1 ring-[rgb(var(--border))]'
                          }`}
                        >
                          {isUpcoming ? 'Upcoming' : 'Past'}
                        </span>
                        <span className="muted rounded-full bg-[rgb(var(--bg))] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ring-1 ring-[rgb(var(--border))]">
                          {event.tag}
                        </span>
                      </div>

                      <h3 className="mt-3.5 font-display text-lg font-bold leading-snug tracking-tight sm:text-xl">
                        {event.title}
                      </h3>

                      <p className="muted mt-2.5 text-[14.5px] leading-relaxed">
                        {event.description}
                      </p>

                      <div className="muted mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays
                            className="h-3.5 w-3.5 text-accent-500"
                            aria-hidden="true"
                          />
                          {/* No <time> without a real date - an empty or made-up
                              dateTime is worse than plain text for machines. */}
                          {date ? (
                            <time dateTime={event.date}>{date.full}</time>
                          ) : (
                            <span>{UNDATED_LABEL}</span>
                          )}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-accent-500" aria-hidden="true" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}

            {visible.length === 0 ? (
              <li>
                <div className="card grid place-items-center p-12 text-center">
                  <p className="muted text-sm">
                    Nothing here yet &mdash; new sessions are announced in our community group
                    first.
                  </p>
                </div>
              </li>
            ) : null}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
