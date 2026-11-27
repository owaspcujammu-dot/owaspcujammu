'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleries } from '@/lib/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Same deterministic formatting as Events, so server and client markup match. */
function formatDate(iso) {
  if (!iso) return null;
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

/** An album's cover is its `cover` photo if set, otherwise its first photo. */
function coverOf(album) {
  return album.photos.find((photo) => photo.src === album.cover) || album.photos[0];
}

/** Horizontal finger travel, in px, that counts as a swipe in the viewer. */
const SWIPE_PX = 50;

/** One card per event: the cover photo, and a tap opens the whole album. */
function AlbumCard({ album, onOpen }) {
  const cover = coverOf(album);
  const date = formatDate(album.date);
  const total = album.photos.length;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open the ${album.title} album - ${total} photos`}
      className="card card-hover group block w-full touch-manipulation overflow-hidden text-left"
    >
      <span className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
          <Camera className="h-3.5 w-3.5" aria-hidden="true" />
          {total}
        </span>
        <span className="absolute inset-x-0 bottom-0 block p-4 text-white">
          <span className="block font-display text-lg font-bold leading-snug">{album.title}</span>
          {date ? (
            <span className="mt-1 flex items-center gap-1.5 text-[13px] text-white/80">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              <time dateTime={album.date}>{date}</time>
            </span>
          ) : null}
        </span>
      </span>
      <span className="flex items-center justify-between px-4 py-3 text-[13px] font-semibold text-accent-500">
        View all {total} photos
        <ChevronRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

/** Full-screen album page listing every photo of one event. */
function AlbumViewer({ album, onClose, onOpenPhoto, closeRef }) {
  const date = formatDate(album.date);
  const total = album.photos.length;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${album.title} album`}
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-[rgb(var(--bg))]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="sticky top-0 z-10 border-b border-[rgb(var(--border))] bg-[rgb(var(--nav-bg))] backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-bold tracking-tight">{album.title}</p>
            <p className="muted text-[13px]">
              {date ? <time dateTime={album.date}>{date}</time> : null}
              {date && album.location ? ' · ' : null}
              {album.location}
              {' · '}
              {total} {total === 1 ? 'photo' : 'photos'}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close album"
            className="grid h-10 w-10 shrink-0 touch-manipulation place-items-center rounded-full border border-[rgb(var(--border))] text-[rgb(var(--fg))] transition-colors hover:border-accent-500/50 hover:text-accent-500"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* CSS columns: a masonry layout that never crops anyone out of a group shot. */}
      <div className="container py-6 sm:py-8">
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {album.photos.map((photo, index) => (
            <li key={photo.src} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={(event) => onOpenPhoto(index, event)}
                aria-label={`Open photo ${index + 1} of ${total}: ${photo.alt}`}
                className="group relative block w-full touch-manipulation overflow-hidden rounded-xl bg-[rgb(var(--bg-elevated))] ring-1 ring-[rgb(var(--border))] transition-shadow hover:shadow-glow"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/** One photo at full size, with next/previous, swipe and a caption. */
function Lightbox({ album, index, onClose, onStep, closeRef }) {
  const photo = album.photos[index];
  const total = album.photos.length;
  const touchX = useRef(null);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${album.title} - photo ${index + 1} of ${total}`}
      className="fixed inset-0 z-[70] flex flex-col bg-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const dx = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > SWIPE_PX) onStep(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white/80 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em]">
          {index + 1} / {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo"
          className="grid h-10 w-10 touch-manipulation place-items-center rounded-full text-white/80 ring-1 ring-white/20 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-4 sm:px-16"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={photo.src}
            className="flex max-h-full flex-col items-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="100vw"
              priority
              className="h-auto max-h-[76vh] w-auto max-w-full rounded-lg object-contain"
            />
            <figcaption className="mt-3 max-w-2xl px-2 text-center text-[13px] leading-relaxed text-white/75">
              {photo.alt}
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 touch-manipulation place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/20 transition-colors hover:bg-white/15 sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 touch-manipulation place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/20 transition-colors hover:bg-white/15 sm:right-4"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [albumId, setAlbumId] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(null);

  const album = galleries.find((item) => item.id === albumId) || null;
  const total = album ? album.photos.length : 0;

  const albumCloseRef = useRef(null);
  const photoCloseRef = useRef(null);
  const albumOpener = useRef(null);
  const photoOpener = useRef(null);
  const previous = useRef({ albumId: null, photoIndex: null });

  const openAlbum = useCallback((id, event) => {
    albumOpener.current = event.currentTarget;
    setAlbumId(id);
  }, []);
  const closeAlbum = useCallback(() => {
    setPhotoIndex(null);
    setAlbumId(null);
  }, []);
  const openPhoto = useCallback((index, event) => {
    photoOpener.current = event.currentTarget;
    setPhotoIndex(index);
  }, []);
  const closePhoto = useCallback(() => setPhotoIndex(null), []);
  const step = useCallback(
    (delta) => setPhotoIndex((i) => (i === null ? i : (i + delta + total) % total)),
    [total],
  );

  /* Lock the page behind the album, and put it back exactly where it was. */
  useEffect(() => {
    if (!albumId) return undefined;
    const root = document.documentElement;
    const scrollY = window.scrollY;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previousOverflow;
      if (window.scrollY !== scrollY) window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
  }, [albumId]);

  /* One key handler for both layers, so Esc closes only the top one. */
  useEffect(() => {
    if (!albumId) return undefined;
    const onKeyDown = (event) => {
      if (photoIndex !== null) {
        if (event.key === 'Escape') closePhoto();
        else if (event.key === 'ArrowLeft') step(-1);
        else if (event.key === 'ArrowRight') step(1);
      } else if (event.key === 'Escape') {
        closeAlbum();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [albumId, photoIndex, closePhoto, closeAlbum, step]);

  /* Move focus into whichever layer opened, and back to what opened it on close. */
  useEffect(() => {
    const was = previous.current;
    if (photoIndex !== null && was.photoIndex === null) {
      photoCloseRef.current?.focus();
    } else if (photoIndex === null && was.photoIndex !== null && albumId) {
      photoOpener.current?.focus();
    } else if (albumId && !was.albumId) {
      albumCloseRef.current?.focus();
    } else if (!albumId && was.albumId) {
      albumOpener.current?.focus();
    }
    previous.current = { albumId, photoIndex };
  }, [albumId, photoIndex]);

  if (galleries.length === 0) return null;

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="container">
        <div className="rule mb-24 sm:mb-32" />
      </div>

      <div className="container">
        <SectionHeading
          id="gallery-heading"
          eyebrow="Gallery"
          title="Moments from our events"
          lede="One album per event. Open an album to see every photo from the day."
        />

        {/* auto-fit + justify-center keeps one album centred, and lines up
            more albums in a row as they are added. */}
        <ul className="mt-14 grid grid-cols-1 justify-center gap-6 sm:[grid-template-columns:repeat(auto-fit,minmax(280px,360px))]">
          {galleries.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={(index % 3) * 0.06} className="h-full">
                <AlbumCard album={item} onOpen={(event) => openAlbum(item.id, event)} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {album ? (
          <AlbumViewer
            key={album.id}
            album={album}
            onClose={closeAlbum}
            onOpenPhoto={openPhoto}
            closeRef={albumCloseRef}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {album && photoIndex !== null ? (
          <Lightbox
            key="lightbox"
            album={album}
            index={photoIndex}
            onClose={closePhoto}
            onStep={step}
            closeRef={photoCloseRef}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
