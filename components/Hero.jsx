'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import { heroKeywords, siteConfig } from '@/lib/site';
import GridBackdrop from './GridBackdrop';
import LogoMark from './Logo';

/** Cycles through the keyword list with a terminal-style typing effect. */
function useTypewriter(words, { typeMs = 85, deleteMs = 40, holdMs = 1600 } = {}) {
  const prefersReducedMotion = useReducedMotion();
  const [text, setText] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const word = words[wordIndex % words.length];

    if (!deleting && text === word) {
      const timer = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(timer);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((index) => (index + 1) % words.length);
      return undefined;
    }

    const timer = setTimeout(
      () =>
        setText((current) =>
          deleting ? word.slice(0, current.length - 1) : word.slice(0, current.length + 1),
        ),
      deleting ? deleteMs : typeMs,
    );
    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, typeMs, deleteMs, holdMs, prefersReducedMotion]);

  return prefersReducedMotion ? words[0] : text;
}

export default function Hero() {
  const typed = useTypewriter(heroKeywords);
  const prefersReducedMotion = useReducedMotion();
  // Until the wordmark file is added to /public, fall back to the shield mark.
  const [logoUnavailable, setLogoUnavailable] = useState(false);
  const wordmark = siteConfig.heroLogo && !logoUnavailable ? siteConfig.heroLogo : null;

  const fadeUp = (delay) =>
    prefersReducedMotion
      ? {}
      : {
          'data-reveal': '',
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.21, 0.6, 0.35, 1] },
        };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[72px]"
    >
      <GridBackdrop withParticles />

      <div className="container relative z-10 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            {wordmark ? (
              /* Both variants are background-free PNGs, so the mark sits
                 directly on the page in either theme. CSS swaps them rather
                 than JS, so the correct one is right from the first paint. */
              <span className="relative inline-flex w-[min(100%,22rem)] flex-col items-center sm:w-[28rem] lg:w-[32rem]">
                <span className="relative block w-full">
                  <Image
                    src={wordmark.light}
                    alt={wordmark.alt}
                    width={wordmark.width}
                    height={wordmark.height}
                    priority
                    onError={() => setLogoUnavailable(true)}
                    className="h-auto w-full dark:hidden"
                  />
                  <Image
                    src={wordmark.dark}
                    alt={wordmark.alt}
                    width={wordmark.width}
                    height={wordmark.height}
                    priority
                    onError={() => setLogoUnavailable(true)}
                    className="hidden h-auto w-full dark:block"
                  />
                </span>

                {/* Completes the lockup under the wordmark. The images already
                    name the university in their alt text, so this is decorative
                    for assistive tech and would otherwise be read twice. */}
                <span
                  aria-hidden="true"
                  className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.28em] text-accent-500
                             sm:mt-2 sm:text-[11px] sm:tracking-[0.32em]"
                >
                  {siteConfig.university}
                </span>
              </span>
            ) : (
              <span className="relative inline-grid place-items-center">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-500/25"
                />
                <LogoMark className="relative h-20 w-20 sm:h-24 sm:w-24" />
              </span>
            )}
          </motion.div>

          <motion.p {...fadeUp(0.08)} className="eyebrow mt-8">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            OWASP Student Chapter
          </motion.p>

          <motion.h1
            {...fadeUp(0.16)}
            id="hero-heading"
            className="mt-6 font-display text-[2.6rem] font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.25rem]"
          >
            Securing Tomorrow&rsquo;s
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">Applications</span>, Today
          </motion.h1>

          {/* Terminal-style rotating keyword line */}
          <motion.div
            {...fadeUp(0.24)}
            className="mt-6 flex justify-center"
            aria-label={`We work on ${heroKeywords.join(', ')}`}
          >
            <p
              aria-hidden="true"
              className="flex items-center rounded-lg border border-[rgb(var(--border))]
                         bg-[rgb(var(--bg-elevated))]/70 px-3.5 py-2 font-mono text-[13px] sm:text-sm"
            >
              <span className="text-accent-500">cuj@owasp</span>
              <span className="muted">:~$</span>
              <span className="ml-2 text-[rgb(var(--fg))]">{typed}</span>
              <span className="ml-1 inline-block h-4 w-[8px] animate-caret bg-accent-500 align-middle" />
            </p>
          </motion.div>

          <motion.p
            {...fadeUp(0.3)}
            className="muted mx-auto mt-7 max-w-2xl text-base leading-relaxed sm:text-lg"
          >
            {siteConfig.intro}
          </motion.p>

          <motion.div
            {...fadeUp(0.38)}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={siteConfig.community.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Join Us
            </a>
            <a href="#about" className="btn-ghost w-full sm:w-auto">
              What we do
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={prefersReducedMotion ? false : { opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="group absolute inset-x-0 bottom-7 z-10 mx-auto flex w-fit flex-col items-center gap-2
                   text-[rgb(var(--fg-muted))] transition-colors hover:text-accent-500"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em]">Scroll</span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--border))] transition-colors group-hover:border-accent-500/60">
          <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
        </span>
      </motion.a>
    </section>
  );
}
