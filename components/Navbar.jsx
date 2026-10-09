'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  CalendarDays,
  Handshake,
  Home,
  Info,
  Mail,
  Menu,
  Target,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/site';
import { Wordmark } from './Logo';
import ThemeToggle from './ThemeToggle';

const SECTION_IDS = navLinks.map((link) => link.href.replace('#', ''));

const NAV_ICONS = { Home, Info, Target, CalendarDays, Users, Handshake, UserPlus, Mail };

/** Matches `scroll-margin-top: 5.5rem` on the sections in globals.css. */
const HEADER_OFFSET = 88;

/** Matches the mobile menu's AnimatePresence exit duration (0.28s). */
const MENU_EXIT_MS = 320;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  /* Elevate the header once the page has scrolled past the hero edge. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll-spy: highlight the nav link for the section in view. */
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /*
   * Close the mobile menu on Escape.
   *
   * Deliberately no `body { overflow: hidden }` scroll lock here. The menu is a
   * dropdown inside the fixed header rather than a full-screen overlay, so it
   * never needed one - and the lock actively broke navigation on phones:
   * <html> is `overflow: visible`, so the body value propagated to the viewport
   * and swallowed the jump, and iOS additionally resets scroll position when
   * body overflow is toggled, undoing any scroll performed around it.
   */
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /*
   * Scroll to a section ourselves rather than letting the browser follow the
   * anchor, because the native jump is unreliable here:
   *  - repeating the hash you are already on is a no-op, so tapping the active
   *    section did nothing at all;
   *  - the header is fixed, so a raw jump lands under it.
   *
   * Animation is deliberately skipped on touch devices. A smooth scroll is an
   * animation the browser abandons as soon as a finger touches the screen, and
   * over a page this tall that reads as "the link did nothing" on a phone.
   * Pointer devices keep the smooth behaviour.
   */
  const goToSection = useCallback((event, href) => {
    if (!href.startsWith('#')) return;
    // Let the browser handle modified clicks (new tab, etc.).
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return; // no such section - fall back to default behaviour

    event.preventDefault();
    setMenuOpen(false);

    const touch = window.matchMedia('(hover: none)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = touch || reduced ? 'auto' : 'smooth';

    // Measured fresh each time: the sticky header is 72px, and HEADER_OFFSET
    // matches the scroll-margin-top the sections carry in globals.css.
    const scrollToTarget = () => {
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior });
    };

    scrollToTarget();
    // The menu collapsing can shift layout under us; re-assert once it has gone.
    if (behavior === 'auto') window.setTimeout(scrollToTarget, MENU_EXIT_MS);
    window.history.replaceState(null, '', href);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'border-b border-[rgb(var(--border))] bg-[rgb(var(--nav-bg))] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Reading-progress bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600"
      />

      <nav className="container flex h-[72px] items-center justify-between" aria-label="Primary">
        <a
          href="#home"
          onClick={(event) => goToSection(event, '#home')}
          className="rounded-lg transition-opacity hover:opacity-85"
          aria-label={`${siteConfig.name} - back to top`}
        >
          <Wordmark
            priority
            decorative
            className="h-9 w-[114px] sm:h-10 sm:w-[127px]"
          />
        </a>

        {/* Desktop links - icon only. The label lives on aria-label for
            assistive tech and in a tooltip that appears on hover AND keyboard
            focus, so the meaning is never mouse-only.

            `touch-manipulation` removes the tap delay, and the tooltip is
            hover-gated by Tailwind's hoverOnlyWhenSupported flag so a touch
            device never spends the first tap revealing it. */}
        <ul className="hidden items-center gap-1.5 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = activeId === id;
            const Icon = NAV_ICONS[link.icon] || Home;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => goToSection(event, link.href)}
                  aria-label={link.label}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative grid h-10 w-10 touch-manipulation place-items-center rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-accent-500'
                      : 'text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg))]'
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />

                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent-500/10 ring-1 ring-accent-500/25"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2
                               whitespace-nowrap rounded-md border border-[rgb(var(--border))]
                               bg-[rgb(var(--bg-elevated))] px-2.5 py-1.5 font-mono text-[10px]
                               uppercase tracking-[0.14em] text-[rgb(var(--fg))] opacity-0 shadow-card
                               transition-opacity duration-150 group-hover:opacity-100
                               group-focus-visible:opacity-100"
                  >
                    {link.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href={siteConfig.community.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex"
          >
            Join Us
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="grid h-10 w-10 touch-manipulation place-items-center rounded-full border border-[rgb(var(--border))]
                       text-[rgb(var(--fg))] transition-colors hover:border-accent-500/50 hover:text-accent-500 lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.21, 0.6, 0.35, 1] }}
            className="overflow-hidden border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))] lg:hidden"
          >
            <ul className="container flex flex-col gap-1 py-5">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '');
                const isActive = activeId === id;
                const Icon = NAV_ICONS[link.icon] || Home;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(event) => goToSection(event, link.href)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`flex touch-manipulation items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                        isActive
                          ? 'bg-accent-500/10 text-accent-500'
                          : 'text-[rgb(var(--fg-muted))] hover:bg-[rgb(var(--bg-elevated))] hover:text-[rgb(var(--fg))]'
                      }`}
                    >
                      {/* Labels stay in the mobile menu: a vertical list has
                          room, and icon-only would only make it harder. */}
                      <span className="flex items-center gap-3">
                        <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                        {link.label}
                      </span>
                      <span aria-hidden="true" className="font-mono text-xs opacity-50">
                        {link.href}
                      </span>
                    </a>
                  </li>
                );
              })}
              <li className="mt-2">
                <a
                  href={siteConfig.community.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="btn-primary w-full"
                >
                  Join the community
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
