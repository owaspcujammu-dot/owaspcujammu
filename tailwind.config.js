/**
 * Honeycomb lattice as a tileable SVG data URI.
 *
 * Flat-top regular hexagons of side `s` tile on a lattice of centres at
 * (3s·i, 2h·j) and (1.5s + 3s·i, h + 2h·j), where h = s·√3/2. Drawing the four
 * corner hexagons plus the middle one and letting the viewBox clip the overhang
 * makes the tile seam-free in both directions.
 *
 * The tile aspect is always √3 : 1, so any `bg-[size:W_H]` must keep
 * W = H × 1.7320508 or the cells shear.
 *
 * Encoded as a background-image rather than an inline <svg> pattern so it needs
 * no element ids - the backdrop renders several times per page, and duplicate
 * SVG pattern ids would be invalid markup.
 */
const honeycomb = (stroke) => {
  const s = 30;
  const h = Number(((s * Math.sqrt(3)) / 2).toFixed(4)); // 25.9808
  const tileW = s * 3; // 90
  const tileH = Number((h * 2).toFixed(4)); // 51.9615

  const hex = (cx, cy) =>
    `M${cx + s} ${cy}` +
    `L${cx + s / 2} ${cy + h}` +
    `L${cx - s / 2} ${cy + h}` +
    `L${cx - s} ${cy}` +
    `L${cx - s / 2} ${cy - h}` +
    `L${cx + s / 2} ${cy - h}Z`;

  const d = [
    hex(0, 0),
    hex(tileW, 0),
    hex(0, tileH),
    hex(tileW, tileH),
    hex(tileW / 2, h),
  ].join('');

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${tileW} ${tileH}'>` +
    `<path d='${d}' fill='none' stroke='${stroke}' stroke-width='1'/></svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

/**
 * Accent colour, resolved from CSS variables so each step can differ per theme.
 *
 * The theme navy (#0a1c40) cannot serve as text on both backgrounds: it is
 * 16.76:1 on white but only 1.18:1 on the near-black page. The actual values
 * live in app/globals.css under :root and .dark - change the theme colour
 * there, not here. `<alpha-value>` keeps modifiers like
 * `bg-accent-500/10` working.
 */
const accent = (step) => `rgb(var(--accent-${step}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        // Theme accent (navy #0a1c40) - values in app/globals.css
        accent: {
          400: accent(400),
          500: accent(500), // accent text, icons, borders, tints
          600: accent(600), // solid fills that carry white text
          700: accent(700),
          800: accent(800),
        },
        // Genuine error states only. Stays red whatever the accent is, or
        // validation errors stop reading as errors.
        danger: {
          500: '#e2231a',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--accent-500) / 0.3), 0 12px 40px -12px rgb(var(--accent-500) / 0.35)',
        card: '0 1px 2px rgba(0,0,0,0.04), 0 12px 32px -16px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        'honeycomb-dark': honeycomb('rgba(255,255,255,0.055)'),
        'honeycomb-light': honeycomb('rgba(10,10,10,0.065)'),
      },
      keyframes: {
        /* Travels exactly one tile height so the loop is seamless. Must stay
           in step with the `bg-[size:90px_51.9615px]` on the drifting layer. */
        'honeycomb-drift': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(0, 51.9615px, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        caret: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1200%)' },
        },
      },
      animation: {
        'honeycomb-drift': 'honeycomb-drift 5s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        caret: 'caret 1.05s step-end infinite',
        'scan-line': 'scan-line 7s linear infinite',
      },
    },
  },
  plugins: [],
};
