import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { ShotImage } from './data';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

interface Props {
  images: ShotImage[];
  index: number | null;
  title: string;
  accent: string;
  /** returns the on-page element an image came from, so the viewer can grow out of / shrink back into it */
  getSource?: (index: number) => HTMLElement | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const num = (v: string) => parseFloat(v);
const frac = (v: number, fallback: number) => (Number.isFinite(v) ? v : fallback);

function findImage(el: HTMLElement, src: string): HTMLImageElement | null {
  const imgs = Array.from(el.querySelectorAll<HTMLImageElement>('img:not([aria-hidden])'));
  return imgs.find((i) => decodeURIComponent(i.currentSrc || i.src).includes(src)) ?? imgs[0] ?? null;
}

/** where an object-fit:contain image is actually painted inside its box */
function containedRect(img: HTMLImageElement, box: DOMRect): DOMRect {
  const { naturalWidth: nw, naturalHeight: nh } = img;
  if (!nw || !nh) return box;
  const k = Math.min(box.width / nw, box.height / nh);
  const w = nw * k;
  const h = nh * k;
  const [px, py] = getComputedStyle(img).objectPosition.split(' ').map((v) => num(v) / 100);
  return new DOMRect(box.left + (box.width - w) * frac(px, 0.5), box.top + (box.height - h) * frac(py, 0.5), w, h);
}

/** FLIP keyframes that place the lightbox figure exactly over its source thumbnail */
function sourceFrames(source: HTMLElement, figure: HTMLElement, src: string): Keyframe[] | null {
  const img = findImage(source, src);
  const box = source.getBoundingClientRect();
  const contained = !!img && getComputedStyle(img).objectFit === 'contain';
  const shown = contained && img ? containedRect(img, box) : box;
  const stage = figure.parentElement?.getBoundingClientRect();
  const w = figure.offsetWidth;
  const h = figure.offsetHeight;
  if (!stage || !w || !h || !shown.width || !shown.height) return null;

  const left = stage.left + (stage.width - w) / 2;
  const top = stage.top + (stage.height - h) / 2;
  const [ox, oy] = (img && !contained ? getComputedStyle(img).objectPosition : '50% 0%').split(' ').map((v) => num(v) / 100);
  const scale = Math.max(shown.width / w, shown.height / h);
  const visW = shown.width / scale;
  const visH = shown.height / scale;
  const cropX = (w - visW) * frac(ox, 0.5);
  const cropY = (h - visH) * frac(oy, 0);

  const sourceFigure = source.closest('figure');
  const matchesBox = !contained || (Math.abs(shown.width - box.width) < 1 && Math.abs(shown.height - box.height) < 1);
  const startRadius = (sourceFigure && matchesBox && num(getComputedStyle(sourceFigure).borderTopLeftRadius)) || 0;
  const endRadius = num(getComputedStyle(figure).borderTopLeftRadius) || 0;

  return [
    {
      transformOrigin: '0 0',
      transform: `translate(${shown.left - left - cropX * scale}px, ${shown.top - top - cropY * scale}px) scale(${scale})`,
      clipPath: `inset(${cropY}px ${w - cropX - visW}px ${h - cropY - visH}px ${cropX}px round ${startRadius / scale}px)`,
    },
    {
      transformOrigin: '0 0',
      transform: 'translate(0px, 0px) scale(1)',
      clipPath: `inset(0px 0px 0px 0px round ${endRadius}px)`,
    },
  ];
}

const ImageLightbox: React.FC<Props> = ({ images, index, title, accent, getSource, onIndexChange, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);

  const lastIndex = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const animRef = useRef<Animation | null>(null);
  const hiddenRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<Element | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const isOpen = index !== null;
  const count = images.length;
  if (index !== null) lastIndex.current = index;

  const restoreSource = () => {
    if (hiddenRef.current) hiddenRef.current.style.visibility = '';
    hiddenRef.current = null;
  };
  const hideSource = (el: HTMLElement) => {
    restoreSource();
    el.style.visibility = 'hidden';
    hiddenRef.current = el;
  };

  // open / close choreography
  useLayoutEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const i = lastIndex.current;
    const source = getSource?.(i) ?? null;
    const frames = source && !reduced() ? sourceFrames(source, figure, images[i].src) : null;
    animRef.current?.cancel();

    if (isOpen) {
      setMounted(true);
      setFlip(!!frames);
      if (!frames || !source) return;
      hideSource(source);
      const anim = figure.animate(frames, { duration: 700, easing: EASE });
      anim.onfinish = anim.oncancel = restoreSource;
      animRef.current = anim;
      return;
    }

    setOpen(false);
    if (frames && source) {
      setFlip(true);
      hideSource(source);
      const anim = figure.animate([...frames].reverse(), { duration: 600, easing: EASE, fill: 'forwards' });
      anim.onfinish = () => {
        restoreSource();
        setMounted(false);
      };
      anim.oncancel = restoreSource;
      animRef.current = anim;
      return;
    }
    setFlip(false);
    const t = window.setTimeout(() => setMounted(false), 450);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => () => restoreSource(), []);

  // show the thumbnail's pixels instantly while the full-size image loads
  const current = lastIndex.current;
  useLayoutEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const src = getSource?.(current);
    const img = src ? findImage(src, images[current].src) : null;
    figure.style.backgroundImage = img?.currentSrc ? `url("${img.currentSrc}")` : '';
  }, [current, mounted, isOpen, getSource, images]);

  // focus management
  useEffect(() => {
    if (!isOpen) return;
    prevFocus.current = document.activeElement;
    const raf = requestAnimationFrame(() => {
      setOpen(true);
      closeRef.current?.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(raf);
      (prevFocus.current as HTMLElement | null)?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  // lock page scroll while visible (without a layout shift)
  const visible = isOpen || mounted;
  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const gap = window.innerWidth - html.clientWidth;
    const overflow = html.style.overflow;
    const padding = html.style.paddingRight;
    html.style.overflow = 'hidden';
    if (gap > 0) html.style.paddingRight = `${gap}px`;
    return () => {
      html.style.overflow = overflow;
      html.style.paddingRight = padding;
    };
  }, [visible]);

  const step = useCallback(
    (dir: number) => {
      if (index === null || count < 2) return;
      onIndexChange((index + dir + count) % count);
    },
    [index, count, onIndexChange]
  );

  // keyboard: Esc, arrows, and a focus trap across the dialog's buttons
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
      } else if (e.key === 'Tab' && rootRef.current) {
        const buttons = rootRef.current.querySelectorAll('button');
        if (!buttons.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, step, onClose]);

  if ((!isOpen && !mounted) || typeof document === 'undefined') return null;
  const shownIndex = lastIndex.current;
  const image = images[shownIndex];
  if (!image) return null;

  return createPortal(
    <div className="pf-root">
      <div
        ref={rootRef}
        className="pf-ImageLightbox_root"
        data-state={open ? 'open' : 'closed'}
        data-flip={flip ? '' : undefined}
        role="dialog"
        aria-modal="true"
        aria-label={`${title}: image ${shownIndex + 1} of ${count}`}
        style={{ '--accent': accent } as CSSProperties}
        onClick={(e) => {
          if (!(e.target as Element).closest('[data-lb-keep]')) onClose();
        }}
        onTouchStart={(e) => {
          const t = e.touches[0];
          touchStart.current = e.touches.length === 1 ? { x: t.clientX, y: t.clientY } : null;
        }}
        onTouchEnd={(e) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - start.x;
          const dy = t.clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > 1.4 * Math.abs(dy)) step(dx < 0 ? 1 : -1);
        }}
      >
        <div className="pf-ImageLightbox_backdrop" aria-hidden="true" />
        <button
          ref={closeRef}
          type="button"
          className="pf-ImageLightbox_btn pf-ImageLightbox_close"
          onClick={onClose}
          aria-label="Close image viewer"
          data-lb-keep
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="pf-ImageLightbox_stage">
          <figure
            ref={figureRef}
            className="pf-ImageLightbox_figure"
            style={{ '--ratio': image.width / image.height } as CSSProperties}
          >
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="pf-ImageLightbox_img"
              draggable={false}
              data-lb-keep
            />
          </figure>
        </div>

        <div className="pf-ImageLightbox_bar">
          {count > 1 && (
            <button
              type="button"
              className="pf-ImageLightbox_btn pf-ImageLightbox_nav pf-ImageLightbox_prev"
              onClick={() => step(-1)}
              aria-label="Previous image"
              data-lb-keep
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
          )}
          <p className="pf-ImageLightbox_label" aria-live="polite">
            <span className="pf-ImageLightbox_labelTitle">
              {title}
              <span className="pf-ImageLightbox_labelSep" aria-hidden="true">
                —
              </span>
              {image.label}
            </span>
            <span className="pf-ImageLightbox_labelMeta">
              <span className="pf-ImageLightbox_counter">
                {String(shownIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <span className="pf-ImageLightbox_caption">{image.caption}</span>
            </span>
          </p>
          {count > 1 && (
            <button
              type="button"
              className="pf-ImageLightbox_btn pf-ImageLightbox_nav pf-ImageLightbox_next"
              onClick={() => step(1)}
              aria-label="Next image"
              data-lb-keep
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageLightbox;
