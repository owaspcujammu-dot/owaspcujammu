import Image from 'next/image';
import { UserRound } from 'lucide-react';
import { coreTeam, facultyCoordinator } from '@/lib/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';

/** Placeholder entries look like "[ADD FACULTY NAME]". */
const isPlaceholder = (name) => typeof name === 'string' && name.trim().startsWith('[');

/**
 * A person with no name is an open position: the card shows OPEN_LABEL instead
 * of a name and drops the social links, which would only be dead ends.
 * Filling in `name` in lib/site.js turns it into a normal card.
 */
const isOpenPosition = (person) => !person.name;
const OPEN_LABEL = 'To be selected soon';

/*
 * The officers who run the chapter, as opposed to the department leads.
 *
 * Matched on role rather than id so adding a third Vice President needs no
 * change here. Nearly every other title ends in "Lead", so these two are the
 * only thing distinguishing "runs the whole chapter" from "runs one area".
 */
const LEADERSHIP_ROLES = new Set(['President', 'Vice President']);
const isLeadership = (person) => LEADERSHIP_ROLES.has(person.role);

/**
 * `variant="overlay"` sits on top of a photo, so the icons go white and lose
 * their bordered box. Both variants keep a 32px hit area for touch.
 */
function SocialLinks({ person, className = '', variant = 'default' }) {
  const links = [
    { key: 'linkedin', href: person.socials?.linkedin, Icon: LinkedInIcon, label: 'LinkedIn' },
    { key: 'github', href: person.socials?.github, Icon: GitHubIcon, label: 'GitHub' },
    // '#' is an unfilled placeholder, not a profile - rendering it gives a
    // dead icon that just jumps to the top of the page.
  ].filter((link) => Boolean(link.href) && link.href !== '#');

  if (!links.length) return null;

  const personLabel = isPlaceholder(person.name) || !person.name ? person.role : person.name;

  const linkClass =
    variant === 'overlay'
      ? 'grid h-8 w-8 place-items-center rounded-md text-white/80 transition-colors hover:bg-white/15 hover:text-white'
      : `grid h-8 w-8 place-items-center rounded-lg border border-[rgb(var(--border))]
         text-[rgb(var(--fg-muted))] transition-colors hover:border-accent-500/50 hover:text-accent-500`;

  return (
    <ul className={`flex items-center gap-1.5 ${className}`}>
      {links.map(({ key, href, Icon, label }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} profile of ${personLabel}`}
            className={linkClass}
          >
            <Icon className="h-[15px] w-[15px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Full-bleed portrait behind a person card.
 *
 * Without a photo it falls back to a plate that follows the theme - white on a
 * light page, navy on a dark one - rather than being navy in both. The overlay
 * text flips with it (see PersonCard), so contrast holds either way.
 */
function CardBackdrop({ person }) {
  if (person.photo) {
    return (
      <Image
        src={person.photo}
        alt={`Portrait of ${person.name}, ${person.role}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 bg-white dark:bg-accent-800"
      role="img"
      aria-label={
        isOpenPosition(person)
          ? `${person.role} - position not filled yet`
          : `Photo placeholder for the ${person.role}`
      }
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-honeycomb-light bg-[size:45px_26px] opacity-70 dark:bg-honeycomb-dark"
      />
      <UserRound
        aria-hidden="true"
        className="absolute left-1/2 top-[38%] h-10 w-10 -translate-x-1/2 -translate-y-1/2
                   text-accent-500/35 dark:text-white/30"
      />
    </div>
  );
}

/** One person, used for both the faculty coordinator and the core team. */
function PersonCard({ person }) {
  const hasPhoto = Boolean(person.photo);
  const open = isOpenPosition(person);

  return (
    <article
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card ring-1
                 ring-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow
                 dark:ring-white/10"
    >
      <CardBackdrop person={person} />

      {/* Scrim only over a photo - on a plain plate it would just dim the card. */}
      {hasPhoto ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5"
        />
      ) : null}

      <div
        className={`absolute inset-x-0 bottom-0 p-4 sm:p-5 ${
          hasPhoto ? 'text-white' : 'text-[rgb(var(--fg))] dark:text-white'
        }`}
      >
        {open ? (
          <p
            className={`font-display text-[15px] font-semibold leading-tight ${
              hasPhoto ? 'text-white/90' : 'muted dark:text-white/90'
            }`}
          >
            {OPEN_LABEL}
          </p>
        ) : (
          <h4 className="font-display text-[17px] font-bold leading-tight">{person.name}</h4>
        )}

        <p
          className={`mt-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
            hasPhoto ? 'text-white/70' : 'text-accent-500 dark:text-white/70'
          }`}
        >
          {person.role}
        </p>

        {person.department ? (
          <p
            className={`mt-1.5 line-clamp-2 text-[11px] leading-snug ${
              hasPhoto ? 'text-white/65' : 'muted dark:text-white/65'
            }`}
          >
            {person.department}
          </p>
        ) : null}

        <SocialLinks
          person={person}
          variant={hasPhoto ? 'overlay' : 'default'}
          className={hasPhoto ? '-ml-2 mt-2' : 'mt-3'}
        />
      </div>
    </article>
  );
}

function GroupLabel({ children }) {
  return (
    <Reveal>
      <h3 className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[rgb(var(--fg-muted))]">
        {children}
      </h3>
    </Reveal>
  );
}

export default function Team() {
  /*
   * Only people with names get a card. Unfilled roles in lib/site.js carry
   * `name: null` and are skipped entirely, so a vacancy never renders as an
   * empty tile.
   */
  const members = coreTeam.filter((member) => !isOpenPosition(member));
  const leadership = members.filter(isLeadership);
  const departmentLeads = members.filter((member) => !isLeadership(member));

  return (
    <section id="team" aria-labelledby="team-heading" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="container">
        <div className="rule mb-24 sm:mb-32" />
      </div>

      <div className="container">
        <SectionHeading
          id="team-heading"
          eyebrow="Team"
          title="The people running the chapter"
          align="center"
        />

        {/* Faculty coordinator - same card as the core team, sized to match one
            grid column so the two groups read as one family. */}
        <div className="mt-14">
          <GroupLabel>Faculty Coordinator</GroupLabel>
          <Reveal delay={0.05}>
            <div className="mx-auto mt-8 w-full max-w-[260px]">
              <PersonCard person={facultyCoordinator} />
            </div>
          </Reveal>
        </div>

        {/* Chapter leadership - deliberately wider tracks than the department
            grid below. Almost every other title ends in "Lead", so card size is
            what tells a skimming visitor who runs the chapter. */}
        {leadership.length > 0 ? (
          <div className="mt-16">
            <GroupLabel>Chapter Leadership</GroupLabel>
            <ul className="mt-8 grid grid-cols-1 justify-center gap-5 sm:[grid-template-columns:repeat(auto-fit,minmax(260px,300px))]">
              {leadership.map((member, index) => (
                <li key={member.id}>
                  <Reveal delay={(index % 3) * 0.06} className="h-full">
                    <PersonCard person={member} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Department leads - narrower tracks, read as a second tier. */}
        {departmentLeads.length > 0 ? (
          <div className="mt-16">
            <GroupLabel>Department Leads</GroupLabel>

            {/* auto-fit collapses the unused tracks and justify-center centres
                what is left, so any number of members sits balanced instead of
                leaving a gap on the right. */}
            <ul className="mt-8 grid grid-cols-1 justify-center gap-4 sm:[grid-template-columns:repeat(auto-fit,minmax(220px,240px))]">
              {departmentLeads.map((member, index) => (
                <li key={member.id}>
                  <Reveal delay={(index % 4) * 0.06} className="h-full">
                    <PersonCard person={member} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Reveal delay={0.1}>
          <p className="muted mt-10 text-center text-sm">
            Want a seat at this table?{' '}
            <a
              href="#join"
              className="font-semibold text-accent-500 underline-offset-4 hover:underline"
            >
              Applications open every semester.
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
