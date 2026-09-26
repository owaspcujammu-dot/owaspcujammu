import Reveal from './Reveal';

/**
 * Shared section header: monospace eyebrow, display title, optional lede.
 * `align` accepts 'left' (default) or 'center'.
 */
export default function SectionHeading({ eyebrow, title, lede, align = 'left', id }) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2 id={id} className="section-title mt-5">
          {title}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal delay={0.1}>
          <p className="muted mt-4 text-base leading-relaxed sm:text-[17px]">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
