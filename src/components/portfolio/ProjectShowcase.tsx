import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { flushSync } from 'react-dom';
import GalleryCursor from './GalleryCursor';
import ImageLightbox from './ImageLightbox';
import { openQuote } from './links';
import type { Project, ShotImage } from './data';

type Role = 'desktop' | 'feature' | 'secondary' | 'mobile';
const ROLES: Role[] = ['desktop', 'feature', 'secondary', 'mobile'];
const SLOT_CLASS = [
  'pf-ProjectShowcase_main',
  'pf-ProjectShowcase_feature',
  'pf-ProjectShowcase_secondary',
  'pf-ProjectShowcase_mobile',
];
const FLIGHT_EASE = 'cubic-bezier(0.45, 0, 0.2, 1)';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

/** foreground picture fit: contained by default; tall page screenshots are cropped from the top */
const fgStyle = (img: ShotImage): CSSProperties | undefined =>
  img.fit ? { objectFit: img.fit, objectPosition: img.position ?? 'top' } : undefined;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}
const boxOf = (el: HTMLElement): Box => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });

/** cubic-bezier(.45, 0, .2, 1) as a JS easing, so hand-built keyframes can match the CSS curve */
const bezierEase = (() => {
  const x1 = 0.45;
  const x2 = 0.2;
  const y1 = 0;
  const y2 = 1;
  const at = (t: number, a: number, b: number) => 3 * a * (1 - t) ** 2 * t + 3 * b * (1 - t) * t ** 2 + t ** 3;
  const slope = (t: number, a: number, b: number) => 3 * a * (1 - t) ** 2 + 6 * (b - a) * (1 - t) * t + 3 * (1 - b) * t ** 2;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = at(t, x1, x2) - x;
      const d = slope(t, x1, x2);
      if (Math.abs(err) < 1e-6 || Math.abs(d) < 1e-6) break;
      t = Math.min(1, Math.max(0, t - err / d));
    }
    return at(t, y1, y2);
  };
})();

function addGhost(parent: HTMLElement, before: HTMLElement, box: Box, className: string, z: number) {
  const div = document.createElement('div');
  div.className = className;
  div.setAttribute('aria-hidden', 'true');
  Object.assign(div.style, { left: `${box.x}px`, top: `${box.y}px`, width: `${box.w}px`, height: `${box.h}px`, zIndex: String(z) });
  parent.insertBefore(div, before);
  return div;
}

/** make sure every image inside is loaded and decoded before an animation starts */
function ready(el: HTMLElement | undefined | null): Promise<void> {
  if (!el) return Promise.resolve();
  return Promise.all(
    Array.from(el.querySelectorAll('img'), (img) => {
      img.loading = 'eager';
      return img.decode().catch(() => undefined);
    })
  ).then(() => undefined);
}

/** a static copy of an element (used as the "old picture" that wipes away) */
function snapshot(el: HTMLElement): Promise<HTMLElement> {
  const copy = el.cloneNode(true) as HTMLElement;
  const originals = el.querySelectorAll('img');
  const clones = Array.from(copy.querySelectorAll('img'));
  clones.forEach((img, i) => {
    const src = originals[i];
    img.loading = 'eager';
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.src = src.currentSrc || src.src;
  });
  return Promise.all(clones.map((img) => img.decode().catch(() => undefined))).then(() => copy);
}

function applyMask(el: HTMLElement, mask: { image: string; size: string } | null) {
  if (!mask) return;
  for (const prefix of ['', '-webkit-']) {
    el.style.setProperty(`${prefix}mask-image`, mask.image);
    el.style.setProperty(`${prefix}mask-size`, mask.size);
    el.style.setProperty(`${prefix}mask-repeat`, 'no-repeat');
  }
}

interface Curtain {
  curtain: Keyframe[];
  edge: { from: number; to: number; skew: number };
  mask: { image: string; size: string } | null;
}

/** the "curtain" that wipes the old picture away: a skewed diagonal edge, or a feathered mask */
function curtainFor(style: string, dir: 'ltr' | 'rtl', width: number, height: number): Curtain {
  const ltr = dir === 'ltr';
  if (style === 'diagonal') {
    const k = 0.12 * width;
    const poly = (x: number) =>
      ltr
        ? `polygon(${x + k}px 0px, ${width + 2 * k}px 0px, ${width + 2 * k}px 100%, ${x - k}px 100%)`
        : `polygon(-${2 * k}px 0px, ${x - k}px 0px, ${x + k}px 100%, -${2 * k}px 100%)`;
    const from = ltr ? -2 * k : width + 2 * k;
    const to = ltr ? width + 2 * k : -2 * k;
    return {
      curtain: [{ clipPath: poly(from) }, { clipPath: poly(to) }],
      edge: { from, to, skew: ((180 * Math.atan2(2 * k, height)) / Math.PI) * (ltr ? -1 : 1) },
      mask: null,
    };
  }
  const feather = (style === 'drift' ? 0.5 : 0.24) * width;
  const image = ltr
    ? `linear-gradient(90deg, transparent ${width}px, #000 ${width + feather}px)`
    : `linear-gradient(90deg, #000 ${width}px, transparent ${width + feather}px)`;
  return {
    curtain: [
      { maskPosition: `${ltr ? -(width + feather) : 0}px 0px` },
      { maskPosition: `${ltr ? 0 : -(width + feather)}px 0px` },
    ],
    edge: { from: ltr ? -feather / 2 : width + feather / 2, to: ltr ? width + feather / 2 : -feather / 2, skew: 0 },
    mask: { image, size: `${2 * width + feather}px 100%` },
  };
}

interface FlipOptions {
  dir?: 'ltr' | 'rtl';
  style?: string;
  fade?: boolean;
}

/** FLIP: animate a frame from its old box to its new one (cropping like object-fit: cover) */
function flipFrames(el: HTMLElement, from: Box, to: Box, endTransform: string, opts: FlipOptions) {
  const scale = Math.max(from.w / to.w, from.h / to.h);
  const visW = from.w / scale;
  const visH = from.h / scale;
  const img = el.querySelector('img:not([aria-hidden])');
  const posY = img ? parseFloat(getComputedStyle(img).objectPosition.split(' ')[1] ?? '0') / 100 : 0;
  const insetX = (to.w - visW) / 2;
  const insetY = (to.h - visH) * (Number.isFinite(posY) ? posY : 0);
  const insetR = to.w - insetX - visW;
  const insetB = to.h - insetY - visH;
  const cx = to.w / 2;
  const cy = to.h / 2;
  const dx = from.x - to.x - cx - scale * (insetX - cx);
  const dy = from.y - to.y - cy - scale * (insetY - cy);
  const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
  const sign = opts.dir === 'rtl' ? -1 : 1;

  const frame: Keyframe[] = [];
  const media: Keyframe[] = [];
  for (let k = 0; k <= 24; k++) {
    const t = k / 24;
    const e = bezierEase(t);
    const lead = opts.dir ? bezierEase(Math.min(1, t / 0.65)) : e;
    const trail = opts.dir ? bezierEase(Math.max(0, (t - 0.35) / 0.65)) : e;
    const left = insetX * (1 - (opts.dir === 'rtl' ? trail : lead));
    const right = insetR * (1 - (opts.dir === 'rtl' ? lead : trail));
    const s = scale + (1 - scale) * e;
    const f: Keyframe = {
      offset: t,
      transform: k === 24 ? endTransform : `translate(${dx * (1 - e)}px, ${dy * (1 - e)}px) scale(${s})`,
      clipPath: `inset(${insetY * (1 - e)}px ${right}px ${insetB * (1 - e)}px ${left}px round ${radius / s}px)`,
    };
    if (opts.fade) f.opacity = 1 - 0.3 * Math.sin(Math.PI * t);
    frame.push(f);

    if (opts.dir && opts.style === 'diagonal') {
      const lean = 0.16 * to.h * Math.sin(Math.PI * trail);
      const edge = opts.dir === 'rtl' ? left : to.w - right;
      media.push({
        offset: t,
        clipPath:
          opts.dir === 'rtl'
            ? `polygon(100% 0px, ${edge - lean}px 0px, ${edge + lean}px 100%, 100% 100%)`
            : `polygon(0px 0px, ${edge + lean}px 0px, ${edge - lean}px 100%, 0px 100%)`,
      });
    } else if (opts.dir && opts.style === 'drift') {
      const d = Math.sin(Math.PI * t);
      media.push({ offset: t, opacity: 1 - 0.35 * d, transform: `translate3d(${1.5 * sign * d}%, 0, 0)` });
    }
  }
  return { frame, media: media.length ? media : null };
}

interface Flight {
  inRole: Role;
  outRole: Role;
  from: [Box, Box];
  hovered: boolean;
  touch: boolean;
  copies: HTMLElement[] | null;
}

/* ───────────────────────────── mobile carousel ───────────────────────────── */

interface GalleryProps {
  images: ShotImage[];
  projectName: string;
  mediaRefs: MutableRefObject<(HTMLElement | null)[]>;
  goRef: MutableRefObject<((i: number, animate: boolean) => void) | null>;
  onOpen: (i: number) => void;
  paused: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ images, projectName, mediaRefs, goRef, onOpen, paused }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRaf = useRef<number | null>(null);
  const animRaf = useRef<number | null>(null);
  const settleTimer = useRef<number | null>(null);
  const idleTimer = useRef<number | null>(null);

  const [index, setIndex] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const total = images.length;

  const jump = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.scrollSnapType = 'none';
    track.scrollLeft = i * track.clientWidth;
    requestAnimationFrame(() => {
      track.style.scrollSnapType = '';
    });
  }, []);

  const cancelAnim = useCallback(() => {
    if (animRaf.current !== null) {
      cancelAnimationFrame(animRaf.current);
      animRaf.current = null;
      if (trackRef.current) trackRef.current.style.scrollSnapType = '';
    }
  }, []);

  const go = useCallback(
    (i: number, animate: boolean) => {
      const track = trackRef.current;
      if (!track) return;
      cancelAnim();
      setIndex(i % total);
      const from = track.scrollLeft;
      const to = i * track.clientWidth;
      if (!animate || reducedMotion() || Math.abs(to - from) < 1) {
        jump(i % total);
        return;
      }
      track.style.scrollSnapType = 'none';
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / 350);
        track.scrollLeft = from + (to - from) * bezierEase(p);
        if (p < 1) {
          animRaf.current = requestAnimationFrame(step);
          return;
        }
        animRaf.current = null;
        track.style.scrollSnapType = '';
        if (i >= total) jump(0);
      };
      animRaf.current = requestAnimationFrame(step);
    },
    [total, jump, cancelAnim]
  );

  useEffect(() => {
    goRef.current = go;
    return () => {
      goRef.current = null;
    };
  }, [go, goRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    io.observe(root);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      for (const r of [scrollRaf, animRaf]) if (r.current !== null) cancelAnimationFrame(r.current);
      for (const t of [settleTimer, idleTimer]) if (t.current !== null) window.clearTimeout(t.current);
    };
  }, []);

  // slow auto-advance while the carousel is on screen and untouched
  useEffect(() => {
    if (paused || interacting || !inView || tabHidden || total < 2 || reducedMotion()) return;
    const t = window.setTimeout(() => go(index + 1, true), 1600);
    return () => window.clearTimeout(t);
  }, [index, paused, interacting, inView, tabHidden, total, go]);

  const touchStart = () => {
    if (idleTimer.current !== null) window.clearTimeout(idleTimer.current);
    idleTimer.current = null;
    cancelAnim();
    setInteracting(true);
  };
  const touchEnd = () => {
    if (idleTimer.current !== null) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      idleTimer.current = null;
      setInteracting(false);
    }, 1500);
  };

  const active = images[index] ?? images[0];
  const slides = [...images, images[0]];

  return (
    <div
      ref={rootRef}
      className="pf-ProjectShowcase_gallery"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${projectName} images`}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      onTouchCancel={touchEnd}
      onPointerDown={(e) => e.pointerType === 'mouse' && touchStart()}
      onPointerUp={(e) => e.pointerType === 'mouse' && touchEnd()}
    >
      <div className="pf-ProjectShowcase_stage">
        <div
          ref={trackRef}
          className="pf-ProjectShowcase_track"
          onScroll={() => {
            if (animRaf.current !== null) return;
            if (scrollRaf.current !== null) cancelAnimationFrame(scrollRaf.current);
            scrollRaf.current = requestAnimationFrame(() => {
              const t = trackRef.current;
              if (t && t.clientWidth) setIndex(Math.min(total, Math.max(0, Math.round(t.scrollLeft / t.clientWidth))) % total);
            });
            if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
            settleTimer.current = window.setTimeout(() => {
              const t = trackRef.current;
              if (t && t.clientWidth && Math.round(t.scrollLeft / t.clientWidth) >= total) jump(0);
            }, 160);
          }}
        >
          {slides.map((img, i) => {
            const isCopy = i === total;
            return (
              <figure
                key={isCopy ? 'loop-copy' : img.src}
                className="pf-ProjectShowcase_slide"
                aria-roledescription={isCopy ? undefined : 'slide'}
                aria-label={isCopy ? undefined : `${i + 1} of ${total}: ${img.label}`}
                aria-hidden={isCopy || undefined}
              >
                <button
                  type="button"
                  className="pf-ProjectShowcase_zoom"
                  onClick={() => onOpen(i % total)}
                  aria-label={`Open full screen: ${img.label}`}
                  tabIndex={i === index ? 0 : -1}
                />
                <span
                  ref={isCopy ? undefined : (el) => void (mediaRefs.current[i] = el)}
                  className="pf-ProjectShowcase_media"
                >
                  <img
                    className="pf-ProjectShowcase_backdrop"
                    src={img.src}
                    alt=""
                    aria-hidden="true"
                    width={img.width}
                    height={img.height}
                    draggable={false}
                    loading="lazy"
                    style={{ objectPosition: img.position }}
                  />
                  <img
                    className="pf-ProjectShowcase_fg"
                    src={img.src}
                    alt={isCopy ? '' : img.alt}
                    width={img.width}
                    height={img.height}
                    draggable={false}
                    loading="lazy"
                    style={fgStyle(img)}
                  />
                </span>
              </figure>
            );
          })}
        </div>
        <span className="mono pf-ProjectShowcase_counter" aria-live={interacting ? 'polite' : 'off'}>
          {index + 1} / {total}
        </span>
      </div>
      <p className="pf-ProjectShowcase_galleryCaption">
        <b>{active.label}</b>
        <span>{active.caption}</span>
      </p>
      <div className="pf-ProjectShowcase_thumbs">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className="pf-ProjectShowcase_thumb"
            aria-label={`Show image ${i + 1}: ${img.label}`}
            aria-current={i === index}
            onClick={() => go(i, true)}
          >
            <img src={img.src} alt="" width={img.width} height={img.height} draggable={false} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────── desktop grid ────────────────────────────── */

const Frame: React.FC<{
  image: ShotImage;
  priority: boolean;
  label: string;
  mediaRef: (el: HTMLSpanElement | null) => void;
  onClick: (e: React.MouseEvent) => void;
}> = ({ image, priority, label, mediaRef, onClick }) => (
  <>
    <button type="button" className="pf-ProjectShowcase_zoom" onClick={onClick} aria-label={label} />
    <span ref={mediaRef} className="pf-ProjectShowcase_media">
      <img
        className="pf-ProjectShowcase_backdrop"
        src={image.src}
        alt=""
        aria-hidden="true"
        width={image.width}
        height={image.height}
        draggable={false}
        loading={priority ? 'eager' : 'lazy'}
        style={{ objectPosition: image.position }}
      />
      <img
        className="pf-ProjectShowcase_fg"
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        draggable={false}
        loading={priority ? 'eager' : 'lazy'}
        style={fgStyle(image)}
      />
    </span>
    <span className="pf-ProjectShowcase_sweep" aria-hidden="true" />
    <span className="pf-ProjectShowcase_caption">
      <b>{image.label}</b>
      <span>{image.caption}</span>
    </span>
  </>
);

interface Props {
  project: Project;
  priority?: boolean;
}

const ProjectShowcase: React.FC<Props> = ({ project, priority = false }) => {
  const { images, motion } = project;

  const rootRef = useRef<HTMLDivElement>(null);
  const moveRaf = useRef(0);
  const hoverCapable = useRef(false); // hover + fine pointer + motion allowed (drives lighting & parallax)
  const finePointer = useRef(false);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const [order, setOrder] = useState<Role[]>(ROLES);
  const orderRef = useRef<Role[]>(order);
  const frames = useRef<Partial<Record<Role, HTMLElement | null>>>({});
  const medias = useRef<Partial<Record<Role, HTMLElement | null>>>({});
  const pending = useRef<Flight | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const busy = useRef(false);
  const lastSlot = useRef<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const mobileMedia = useRef<(HTMLElement | null)[]>([]);
  const goRef = useRef<((i: number, animate: boolean) => void) | null>(null);

  // pointer capabilities + preload the visible layout's images just before it scrolls into view
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      finePointer.current = fine.matches;
      hoverCapable.current = fine.matches && !reduced.matches;
    };
    update();
    fine.addEventListener('change', update);
    reduced.addEventListener('change', update);

    let io: IntersectionObserver | null = null;
    const root = rootRef.current;
    if (root) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            void ready(root.querySelector<HTMLElement>(isMobile() ? '.pf-ProjectShowcase_gallery' : '.pf-ProjectShowcase_grid'));
          }
        },
        { rootMargin: '100% 0px' }
      );
      io.observe(root);
    }
    return () => {
      fine.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
      io?.disconnect();
      if (moveRaf.current) cancelAnimationFrame(moveRaf.current);
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    };
  }, []);

  const clearHoverTimer = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };

  // pointer-driven lighting + parallax variables
  const onPointerMove = useCallback((e: ReactPointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
    if (!hoverCapable.current || !rootRef.current) return;
    const el = rootRef.current;
    const { clientX, clientY } = e;
    if (moveRaf.current) cancelAnimationFrame(moveRaf.current);
    moveRaf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;
      el.style.setProperty('--mx', String((px - 0.5) * 2));
      el.style.setProperty('--my', String((py - 0.5) * 2));
      el.style.setProperty('--lx', `${(100 * px).toFixed(2)}%`);
      el.style.setProperty('--ly', `${(100 * py).toFixed(2)}%`);
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    clearHoverTimer();
    pointer.current = null;
    lastSlot.current = null;
    const el = rootRef.current;
    if (el) {
      if (moveRaf.current) cancelAnimationFrame(moveRaf.current);
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    }
  }, []);

  /** bring the picture in `slot` to the main position */
  const promote = useCallback((slot: number, hovered: boolean, touch: boolean): Promise<void> => {
    if (slot <= 0 || busy.current) return Promise.resolve();
    const current = orderRef.current;
    const inRole = current[slot];
    const outRole = current[0];
    const inFrame = frames.current[inRole];
    const outFrame = frames.current[outRole];
    const inMedia = medias.current[inRole];
    const outMedia = medias.current[outRole];
    if (!inFrame || !outFrame) return Promise.resolve();

    lastSlot.current = slot;
    busy.current = true;
    const animate = !reducedMotion();

    return Promise.all([ready(inMedia), ready(outMedia)])
      .then(() => (animate && !touch && inMedia && outMedia ? Promise.all([snapshot(outMedia), snapshot(inMedia)]) : null))
      .then((copies) => {
        if (!rootRef.current) return;
        const next = [...current];
        next[0] = inRole;
        next[slot] = outRole;
        orderRef.current = next;
        if (animate) {
          pending.current = { inRole, outRole, from: [boxOf(inFrame), boxOf(outFrame)], hovered, touch, copies };
        } else {
          busy.current = false;
        }
        flushSync(() => setOrder(next));
      });
  }, []);

  /** after a swap finishes, if the pointer is resting on another small frame, swap that one too */
  const recheckPointer = useCallback(() => {
    const p = pointer.current;
    if (!p || !finePointer.current) return;
    const el = document.elementFromPoint(p.x, p.y)?.closest<HTMLElement>('[data-slot]');
    const slot = el && rootRef.current?.contains(el) ? Number(el.dataset.slot) : null;
    if (slot !== null && slot > 0 && slot !== lastSlot.current) void promote(slot, true, false);
    else lastSlot.current = slot;
  }, [promote]);

  // run the swap animation once React has re-ordered the grid
  useLayoutEffect(() => {
    const flight = pending.current;
    if (!flight) return;
    pending.current = null;

    const roles = [flight.inRole, flight.outRole];
    const anims: Animation[] = [];
    const ghosts: HTMLElement[] = [];
    const timing: KeyframeAnimationOptions = { duration: flight.touch ? 700 : 1100, easing: 'linear' };

    const inFrame = frames.current[flight.inRole];
    const outFrame = frames.current[flight.outRole];
    const inMedia = medias.current[flight.inRole];
    const outMedia = medias.current[flight.outRole];
    const offsetParent = inFrame?.offsetParent as HTMLElement | null | undefined;
    const parent = inFrame?.parentElement ?? null;

    if (!flight.touch && flight.copies && inFrame && outFrame && inMedia && outMedia && offsetParent && parent) {
      const [oldMainCopy, oldSmallCopy] = flight.copies;
      const [smallBox, mainBox] = flight.from;
      const settle: KeyframeAnimationOptions = { duration: 1100, easing: FLIGHT_EASE };
      const wipe: KeyframeAnimationOptions = { duration: 1020, delay: 80, easing: FLIGHT_EASE, fill: 'backwards' };
      const mainCurtain = curtainFor(motion.swap, motion.direction, mainBox.w, mainBox.h);
      const side = Math.sign(smallBox.x + smallBox.w / 2 - (mainBox.x + mainBox.w / 2)) || 1;

      anims.push(
        inMedia.animate(
          [{ transform: `translate3d(${1.5 * side}%, 0, 0) scale(1.05)` }, { transform: 'translate3d(0, 0, 0) scale(1)' }],
          settle
        )
      );
      inFrame.dataset.flight = 'in';
      outFrame.dataset.flight = 'out';

      // the old main picture, wiped away over the new one
      const mainGhost = addGhost(offsetParent, parent, mainBox, 'pf-ProjectShowcase_ghost', 4);
      mainGhost.appendChild(oldMainCopy);
      applyMask(mainGhost, mainCurtain.mask);
      anims.push(mainGhost.animate(mainCurtain.curtain, wipe));
      ghosts.push(mainGhost);

      // a highlight that rides the leading edge of the wipe
      const sheen = addGhost(offsetParent, parent, mainBox, 'pf-ProjectShowcase_ghostSheen', 4);
      const streak = document.createElement('span');
      sheen.appendChild(streak);
      const lean = mainCurtain.edge.skew ? ` skewX(${mainCurtain.edge.skew}deg)` : '';
      const { from, to } = mainCurtain.edge;
      anims.push(
        streak.animate(
          [
            { transform: `translateX(${from}px)${lean}`, opacity: 0 },
            { transform: `translateX(${from + (to - from) * 0.12}px)${lean}`, opacity: 1, offset: 0.08 },
            { transform: `translateX(${from + (to - from) * 0.85}px)${lean}`, opacity: 0.9, offset: 0.45 },
            { transform: `translateX(${to}px)${lean}`, opacity: 0 },
          ],
          wipe
        )
      );
      ghosts.push(sheen);

      // the old small picture, wiped away in its own slot
      const smallCurtain = curtainFor(motion.swap, motion.direction, smallBox.w, smallBox.h);
      const smallGhost = addGhost(offsetParent, parent, smallBox, 'pf-ProjectShowcase_ghost', 4);
      smallGhost.appendChild(oldSmallCopy);
      applyMask(smallGhost, smallCurtain.mask);
      anims.push(smallGhost.animate(smallCurtain.curtain, wipe));
      ghosts.push(smallGhost);

      anims.push(outMedia.animate([{ transform: 'scale(1.05)' }, { transform: 'scale(1)' }], settle));
    } else {
      roles.forEach((role, i) => {
        const el = frames.current[role];
        if (!el) return;
        const incoming = i === 0;
        const end = !incoming && flight.hovered ? 'scale(1.02)' : getComputedStyle(el).transform;
        const opts: FlipOptions = incoming ? (flight.touch ? {} : { dir: motion.direction, style: motion.swap }) : { fade: true };
        const f = flipFrames(el, flight.from[i], boxOf(el), end, opts);
        el.dataset.flight = incoming ? 'in' : 'out';
        anims.push(el.animate(f.frame, timing));
        const media = medias.current[role];
        if (f.media && media) anims.push(media.animate(f.media, timing));
      });
    }

    Promise.allSettled(anims.map((a) => a.finished)).then(() => {
      roles.forEach((r) => {
        const el = frames.current[r];
        if (el) delete el.dataset.flight;
      });
      ghosts.forEach((g) => g.remove());
      busy.current = false;
      recheckPointer();
    });
  }, [order, motion.swap, motion.direction, recheckPointer]);

  const slotImages = order.map((r) => images[r]);
  const galleryImages = slotImages;

  const getSource = useCallback(
    (i: number): HTMLElement | null => (isMobile() ? mobileMedia.current[i] : medias.current[orderRef.current[i]]) ?? null,
    []
  );

  const onLightboxIndex = useCallback((i: number) => {
    setLightbox(i);
    if (isMobile()) goRef.current?.(i, false);
  }, []);

  const handleFrameClick = (slot: number, keyboard: boolean) => {
    if ((!finePointer.current || keyboard) && slot > 0) {
      const role = orderRef.current[slot];
      void promote(slot, false, !finePointer.current).then(() =>
        requestAnimationFrame(() => {
          const el = frames.current[role];
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (r.top < 64 || r.bottom > window.innerHeight) {
            el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
          }
        })
      );
      return;
    }
    setLightbox(slot);
  };

  return (
    <div
      ref={rootRef}
      className="pf-ProjectShowcase_showcase"
      data-sweep={project.sweep}
      data-parallax={motion.parallax ? '' : undefined}
      data-edge={motion.edgeTrace ? '' : undefined}
      style={{ '--pan': `${motion.pan}px`, '--zoom': motion.zoom } as CSSProperties}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {motion.edgeTrace && <span className="pf-ProjectShowcase_edge" aria-hidden="true" />}
      <span className="pf-ProjectShowcase_light" aria-hidden="true" />

      <Gallery
        images={galleryImages}
        projectName={project.name}
        mediaRefs={mobileMedia}
        goRef={goRef}
        onOpen={setLightbox}
        paused={lightbox !== null}
      />

      <div className="pf-ProjectShowcase_grid">
        {ROLES.map((role) => {
          const slot = order.indexOf(role);
          const image = images[role];
          return (
            <figure
              key={role}
              ref={(el) => void (frames.current[role] = el)}
              className={`pf-ProjectShowcase_frame ${SLOT_CLASS[slot]}`}
              data-slot={slot}
              data-gallery-frame
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse' && finePointer.current) {
                  clearHoverTimer();
                  if (!busy.current && slot !== lastSlot.current) {
                    if (slot === 0) {
                      lastSlot.current = 0;
                      return;
                    }
                    hoverTimer.current = window.setTimeout(() => {
                      hoverTimer.current = null;
                      void promote(slot, true, false);
                    }, 150);
                  }
                }
              }}
              onPointerLeave={clearHoverTimer}
            >
              <Frame
                image={image}
                priority={priority && role === 'desktop'}
                mediaRef={(el) => void (medias.current[role] = el)}
                label={slot === 0 ? `Enlarge image: ${image.label}` : `${image.label}: show as main image`}
                onClick={(e) => handleFrameClick(slot, e.detail === 0)}
              />
            </figure>
          );
        })}

        <div className="pf-ProjectShowcase_pillSlot">
          <a
            href={project.liveUrl ?? '/#contact'}
            className="pf-ProjectShowcase_pill"
            aria-label={project.liveUrl ? `View ${project.name} live` : `Start a project like ${project.name}`}
            {...(project.liveUrl
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {
                  onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    openQuote();
                  },
                })}
          >
            <span>{project.liveUrl ? 'View project' : 'Start a project'}</span>
            <i aria-hidden="true">
              <span>↗</span>
            </i>
          </a>
        </div>

        <div className="pf-ProjectShowcase_panel">
          <p className="mono pf-ProjectShowcase_panelEyebrow">
            {project.sector}
            {project.sectorRest}
          </p>
          <dl className="pf-ProjectShowcase_metrics">
            {project.metrics.map((m) => (
              <div key={m.label} className="pf-ProjectShowcase_metric">
                <dd>{m.value}</dd>
                <dt>{m.label}</dt>
              </div>
            ))}
          </dl>
          <p className="pf-ProjectShowcase_panelSource">{project.metricsSource}</p>
        </div>
      </div>

      <GalleryCursor areaRef={rootRef} accent={project.accent} />
      <ImageLightbox
        images={galleryImages}
        index={lightbox}
        title={project.name}
        accent={project.accent}
        getSource={getSource}
        onIndexChange={onLightboxIndex}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
};

export default ProjectShowcase;
