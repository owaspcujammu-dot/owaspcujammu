/**
 * Layered decorative backdrop: a drifting grid, an accent bloom, optional
 * particles and a slow scan line.
 *
 * Performance notes - this sits behind full sections, so everything here is
 * kept cheap: the grid drifts via `transform` (compositor-only) rather than
 * `background-position` (which repaints a full-screen layer every frame), and
 * the bloom uses a radial-gradient instead of a large `filter: blur()`, which
 * is expensive to rasterise at big radii.
 *
 * Pointer events are disabled and the whole tree is aria-hidden, so it never
 * interferes with content or a screen reader. Particle positions are
 * hard-coded (not random) so server and client markup match exactly.
 */

const PARTICLES = [
  { left: '8%', top: '22%', size: 3, delay: '0s', duration: '9s' },
  { left: '17%', top: '68%', size: 2, delay: '1.4s', duration: '11s' },
  { left: '29%', top: '38%', size: 4, delay: '2.6s', duration: '8s' },
  { left: '41%', top: '78%', size: 2, delay: '0.7s', duration: '12s' },
  { left: '54%', top: '18%', size: 3, delay: '3.1s', duration: '10s' },
  { left: '63%', top: '58%', size: 2, delay: '1.9s', duration: '9.5s' },
  { left: '74%', top: '31%', size: 4, delay: '0.4s', duration: '13s' },
  { left: '83%', top: '72%', size: 2, delay: '2.2s', duration: '8.5s' },
  { left: '92%', top: '44%', size: 3, delay: '3.6s', duration: '11.5s' },
];

export default function GridBackdrop({ withParticles = false, fade = true }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Drifting honeycomb. The inner layer is one tile taller and animates by
          exactly one tile height, so the loop is seamless. */}
      <div
        className={
          fade
            ? 'absolute inset-0 [mask-image:radial-gradient(ellipse_78%_62%_at_50%_35%,#000_30%,transparent_100%)]'
            : 'absolute inset-0'
        }
      >
        <div className="absolute inset-x-0 -top-[51.9615px] bottom-0 animate-honeycomb-drift bg-honeycomb-light bg-[size:90px_51.9615px] dark:bg-honeycomb-dark" />
      </div>

      {/* Accent bloom - radial gradients, no blur filter. Uses the theme navy
          (--accent-800) from CSS variables, so it follows the theme colour. */}
      <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[64rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(var(--accent-800)/0.1),transparent)] dark:bg-[radial-gradient(closest-side,rgb(var(--accent-800)/0.95),transparent)]" />
      <div className="absolute -left-56 bottom-[-14rem] h-[30rem] w-[30rem] bg-[radial-gradient(closest-side,rgb(var(--accent-800)/0.08),transparent)] dark:bg-[radial-gradient(closest-side,rgb(var(--accent-800)/0.7),transparent)]" />

      {/* Drifting particles */}
      {withParticles
        ? PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="absolute animate-float rounded-full bg-accent-500/60"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))
        : null}

      {/* Slow scan line */}
      <div className="absolute inset-x-0 top-0 h-24 animate-scan-line bg-gradient-to-b from-transparent via-accent-500/[0.05] to-transparent" />
    </div>
  );
}
