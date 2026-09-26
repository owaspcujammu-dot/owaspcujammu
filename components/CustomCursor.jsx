'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Circular cursor: a small filled dot with a larger ring trailing it.
 *
 * Deliberately conservative about when it takes over:
 *  - only on devices with a fine pointer, so phones and tablets are untouched
 *  - only once JavaScript runs, so a failed bundle never leaves a cursor-less page
 *  - text fields keep the native I-beam, since hiding it makes editing fiddly
 *  - `prefers-reduced-motion` drops the trailing lag (and the rAF loop with it)
 *
 * The dot is positioned straight from the pointer event rather than inside the
 * animation frame, so it tracks exactly and keeps working if frames are throttled.
 * Only the ring, which is purely decorative, needs the loop.
 */
const INTERACTIVE = 'a, button, input, textarea, select, summary, label, [role="tab"], [role="button"]';

const RING_EASE = 0.2;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  // Enable only for fine pointers, and follow the media query if it changes
  // (e.g. a tablet gaining a mouse).
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener('change', sync);
    return () => fine.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -100, y: -100 };
    const trailing = { x: -100, y: -100 };
    let frame = 0;

    const place = (element, x, y) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      place(dot, pointer.x, pointer.y);
      if (reduced) place(ring, pointer.x, pointer.y);
      root.dataset.cursorVisible = 'true';
    };

    const loop = () => {
      trailing.x += (pointer.x - trailing.x) * RING_EASE;
      trailing.y += (pointer.y - trailing.y) * RING_EASE;
      place(ring, trailing.x, trailing.y);
      frame = requestAnimationFrame(loop);
    };

    const onOver = (event) => {
      const target = event.target;
      const hit = target instanceof Element ? target.closest(INTERACTIVE) : null;
      root.dataset.cursorHover = hit ? 'true' : 'false';
    };

    const onLeave = () => {
      root.dataset.cursorVisible = 'false';
    };
    const onDown = () => {
      root.dataset.cursorDown = 'true';
    };
    const onUp = () => {
      root.dataset.cursorDown = 'false';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    if (!reduced) frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove('has-custom-cursor');
      delete root.dataset.cursorVisible;
      delete root.dataset.cursorHover;
      delete root.dataset.cursorDown;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="cursor-layer">
      <span ref={ringRef} className="cursor-ring" />
      <span ref={dotRef} className="cursor-dot" />
    </div>
  );
}
