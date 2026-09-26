import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = { name: 120, email: 200, roll: 120, message: 4000 };

/**
 * Best-effort in-memory rate limit: 5 submissions per IP per 10 minutes.
 *
 * Serverless instances are ephemeral and not shared, so this trims casual
 * abuse rather than a determined attacker. Put Vercel WAF, Upstash Redis or a
 * captcha in front of the route if the chapter starts seeing real spam.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.some((time) => now - time < WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages from this connection. Please try again in a few minutes.' },
      { status: 429 },
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Answer 200 so it learns nothing.
  if (clean(payload.website, 200)) {
    return NextResponse.json({ message: 'Message received.' }, { status: 200 });
  }

  const name = clean(payload.name, LIMITS.name);
  const email = clean(payload.email, LIMITS.email);
  const roll = clean(payload.roll, LIMITS.roll);
  const message = clean(payload.message, LIMITS.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email and message are all required.' },
      { status: 400 },
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ error: 'Please write a slightly longer message.' }, { status: 400 });
  }

  const submission = {
    name,
    email,
    roll: roll || 'Not provided',
    message,
    receivedAt: new Date().toISOString(),
    source: `${siteConfig.name} website`,
  };

  const formspree = process.env.FORMSPREE_ENDPOINT;
  const web3forms = process.env.WEB3FORMS_ACCESS_KEY;

  try {
    if (formspree) {
      const response = await fetch(formspree, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: submission.name,
          email: submission.email,
          'Roll number / Branch': submission.roll,
          message: submission.message,
          _subject: `[${siteConfig.name}] New message from ${submission.name}`,
        }),
      });
      if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);
    } else if (web3forms) {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3forms,
          subject: `[${siteConfig.name}] New message from ${submission.name}`,
          from_name: `${siteConfig.name} website`,
          ...submission,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || `Web3Forms responded with ${response.status}`);
      }
    } else {
      // Dry-run mode: no provider configured yet. Useful for local development.
      console.info('[contact] No mail provider configured. Submission:', submission);
      return NextResponse.json({
        message:
          'Message validated (dry-run mode). Configure FORMSPREE_ENDPOINT or WEB3FORMS_ACCESS_KEY to deliver it.',
      });
    }

    return NextResponse.json({
      message: 'Message sent. A core team member will reply within a couple of days.',
    });
  } catch (error) {
    console.error('[contact] Delivery failed:', error);
    return NextResponse.json(
      { error: `Could not send right now. Please email us at ${siteConfig.email}.` },
      { status: 502 },
    );
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
