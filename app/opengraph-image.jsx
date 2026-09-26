import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

/**
 * Social share card, generated at build time - no image asset to maintain.
 *
 * Note: this renders through Satori, not a browser. Every element with more
 * than one child needs an explicit `display`, and text is kept in single
 * strings rather than split across JSX children.
 */
export const runtime = 'nodejs';
export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 78% 12%, rgba(10,28,64,1) 0%, rgba(10,10,10,0) 70%)',
          color: '#f4f4f5',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 3.2 42 9.4v13.1c0 10.3-7.1 19.4-18 22.3C13.1 41.9 6 32.8 6 22.5V9.4L24 3.2Z"
              stroke="#648bd8"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <path
              d="M18.6 17.4 13.4 23l5.2 5.6M29.4 17.4 34.6 23l-5.2 5.6"
              stroke="#f4f4f5"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22.2 32.8 26.4 15.6"
              stroke="#648bd8"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '10px', fontSize: 34, fontWeight: 700 }}>
              <span>OWASP</span>
              <span style={{ color: '#648bd8' }}>CUJ</span>
            </div>
            <span style={{ fontSize: 17, color: '#a1a5ac', letterSpacing: '0.18em' }}>
              STUDENT CHAPTER
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 56,
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
          }}
        >
          <span>{'Securing Tomorrow’s'}</span>
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#648bd8' }}>Applications</span>
            <span>{', Today'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: 40, fontSize: 26, color: '#a1a5ac' }}>
          {`${siteConfig.university} · Workshops · CTFs · Bug Bounty · Hackathons`}
        </div>

        <div
          style={{
            display: 'flex',
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 10,
            background: 'linear-gradient(90deg, #4775d1 0%, #0a1c40 100%)',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
