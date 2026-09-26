import { Inter, Space_Grotesk } from 'next/font/google';
import { siteConfig } from '@/lib/site';
import CustomCursor from '@/components/CustomCursor';
import ThemeProvider from '@/components/ThemeProvider';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.longName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'OWASP',
    'OWASP CUJ',
    'OWASP student chapter',
    'Central University of Jammu',
    'cybersecurity club',
    'application security',
    'Capture The Flag',
    'CTF Jammu',
    'bug bounty',
    'ethical hacking workshop',
    'student tech community',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    creator: '@owaspcuj',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'technology',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.longName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
  foundingDate: siteConfig.founded,
  parentOrganization: {
    '@type': 'Organization',
    name: 'OWASP Foundation',
    url: siteConfig.owaspFoundationUrl,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.line1,
    addressLocality: 'Samba',
    addressRegion: 'Jammu & Kashmir',
    postalCode: '181143',
    addressCountry: 'IN',
  },
  sameAs: Object.values(siteConfig.socials),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Scroll-reveal elements are server-rendered at opacity 0 and are
            revealed by JavaScript. Without it they would never appear, so
            show them immediately instead. */}
        <noscript>
          <style>{'[data-reveal]{opacity:1 !important;transform:none !important}'}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
                     focus:rounded-full focus:bg-accent-600 focus:px-5 focus:py-3 focus:text-sm
                     focus:font-semibold focus:text-white focus:ring-1 focus:ring-white/20"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
