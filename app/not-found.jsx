import Link from 'next/link';
import GridBackdrop from '@/components/GridBackdrop';
import LogoMark from '@/components/Logo';

export const metadata = {
  title: '404 - Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6">
      <GridBackdrop withParticles />

      <div className="relative z-10 text-center">
        <LogoMark className="mx-auto h-16 w-16" />

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-accent-500">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          This route does not exist
        </h1>
        <p className="muted mx-auto mt-4 max-w-md text-[15px] leading-relaxed">
          Nothing to enumerate here. The page you were after has moved, or was never deployed in the
          first place.
        </p>

        <Link href="/" className="btn-primary mt-9">
          Back to home
        </Link>
      </div>
    </main>
  );
}
