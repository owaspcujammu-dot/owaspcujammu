'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { socialIcons, socialLabels } from './SocialIcons';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const INITIAL_VALUES = { name: '', email: '', roll: '', message: '', website: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.email.trim()) errors.email = 'An email address is required.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'That email does not look right.';
  if (!values.message.trim()) errors.message = 'Add a short message so we know how to help.';
  else if (values.message.trim().length < 10) errors.message = 'A little more detail, please (10+ characters).';
  return errors;
}

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] font-semibold">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="muted mt-1.5 text-[12px]">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[12px] text-danger-500">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-3 text-[14.5px] ' +
  'placeholder:text-[rgb(var(--fg-muted))] transition-colors duration-200 ' +
  'focus:border-accent-500/60 focus:outline-none focus:ring-2 focus:ring-accent-500/25';

export default function Contact() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(data.error || 'Something went wrong. Please try again.');

      setStatus('success');
      setServerMessage(
        data.message || 'Message received. A core team member will reply within a couple of days.',
      );
      setValues(INITIAL_VALUES);
    } catch (error) {
      setStatus('error');
      setServerMessage(
        error.message || `Could not send right now. Please email us at ${siteConfig.email}.`,
      );
    }
  };

  const submitting = status === 'submitting';

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="container">
        <div className="rule mb-24 sm:mb-32" />
      </div>

      <div className="container">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Questions, ideas, collaborations"
          lede="Students, faculty, clubs and companies are all welcome here. Send a note and we will get back to you."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {/* Form */}
          <Reveal>
            <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name" error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={onChange}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </Field>

                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={onChange}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field
                  id="roll"
                  label="Roll number / Branch"
                  error={errors.roll}
                  hint="Optional - helps us route student queries faster."
                >
                  <input
                    id="roll"
                    name="roll"
                    type="text"
                    value={values.roll}
                    onChange={onChange}
                    aria-describedby="roll-hint"
                    placeholder="e.g. 23CSU1234 / B.Tech CSE"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field id="message" label="Message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={onChange}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder="Tell us what you are interested in - joining, collaborating, sponsoring, or something else."
                    className={`${inputClass} resize-y`}
                  />
                </Field>
              </div>

              {/* Honeypot: hidden from people, irresistible to naive bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={onChange}
                />
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending&hellip;
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="muted text-[12px]">
                  Prefer email?{' '}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-accent-500 underline-offset-4 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>

              {/* Submission status - announced to assistive tech */}
              <div role="status" aria-live="polite" className="mt-5 empty:mt-0">
                {status === 'success' ? (
                  <p className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-[13.5px] text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {serverMessage}
                  </p>
                ) : null}
                {status === 'error' ? (
                  <p className="flex items-start gap-2 rounded-xl border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-[13.5px] text-danger-500">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {serverMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <div className="card p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold tracking-tight">Reach us directly</h3>

                <ul className="mt-5 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-500/10 text-accent-500 ring-1 ring-accent-500/20">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="muted font-mono text-[10px] uppercase tracking-[0.16em]">
                        Email
                      </p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="mt-1 block break-words text-[14px] font-medium transition-colors hover:text-accent-500"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-500/10 text-accent-500 ring-1 ring-accent-500/20">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="muted font-mono text-[10px] uppercase tracking-[0.16em]">
                        Campus
                      </p>
                      <address className="mt-1 text-[14px] not-italic leading-relaxed">
                        {siteConfig.address.line1}
                        <br />
                        {siteConfig.address.line2}
                      </address>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card flex-1 p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold tracking-tight">Follow the chapter</h3>
                <p className="muted mt-2 text-[14px] leading-relaxed">
                  Event posters, write-ups and recaps land here first.
                </p>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {Object.entries(siteConfig.socials).map(([key, href]) => {
                    const Icon = socialIcons[key];
                    if (!Icon) return null;
                    return (
                      <li key={key}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${siteConfig.name} on ${socialLabels[key]}`}
                          className="grid h-10 w-10 place-items-center rounded-xl border border-[rgb(var(--border))]
                                     text-[rgb(var(--fg-muted))] transition-colors hover:border-accent-500/50 hover:text-accent-500"
                        >
                          <Icon className="h-[17px] w-[17px]" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
