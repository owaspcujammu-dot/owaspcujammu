'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Scroll-triggered entrance animation used across every section.
 *
 * Animates once when the element enters the viewport, and degrades to a
 * plain static element when the visitor prefers reduced motion.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
  duration = 0.6,
  as = 'div',
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      /* Marks elements that start hidden, so the <noscript> rule in the
         layout can reveal them when JavaScript never runs. */
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -60px 0px' }}
      transition={{ duration, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </MotionTag>
  );
}
