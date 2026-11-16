import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import { prefersReducedMotion, useAnimIn } from './anim';
import {
  glanceDashboard,
  glanceDesktop,
  glanceFlow,
  glancePhones,
  industries,
  projects,
  type GlanceImage,
} from './data';

/** where each piece sits on the canvas (percent of stage) and how far it drifts while scrolling */
const SLOTS = {
  dashboard: { x: 49, y: 3, w: 46, depth: -0.5, z: 1 },
  desktop: { x: 3, y: 11, w: 55, depth: 0.25, z: 2 },
  flow: { x: 13, y: 63, w: 31, depth: 0.8, z: 3 },
  phoneA: { x: 61, y: 52.5, w: 11, depth: -0.6, z: 4 },
  phoneB: { x: 76.5, y: 57, w: 11, depth: 0.25, z: 4 },
} as const;

type SlotName = keyof typeof SLOTS;

const slotStyle = (name: SlotName, i: number, img: GlanceImage): CSSProperties => {
  const [aw, ah] = img.ar ?? [img.width, img.height];
  return {
    '--x': `${SLOTS[name].x}%`,
    '--y': `${SLOTS[name].y}%`,
    '--w': `${SLOTS[name].w}%`,
    '--depth': SLOTS[name].depth,
    '--z': SLOTS[name].z,
    '--i': i,
    '--ar': `${aw} / ${ah}`,
  } as CSSProperties;
};

const imgStyle = (img: GlanceImage): CSSProperties => ({ objectPosition: img.position ?? 'top' });

const Piece: React.FC<{ slot: SlotName; i: number; img: GlanceImage; dark?: boolean }> = ({ slot, i, img, dark }) => (
  <figure
    className={`pf-ShowcaseCanvas_piece${dark ? ' pf-ShowcaseCanvas_dark' : ''}`}
    data-slot={slot}
    style={slotStyle(slot, i, img)}
  >
    <div className="pf-ShowcaseCanvas_card">
      <img src={img.src} alt={img.alt} loading="lazy" width={img.width} height={img.height} style={imgStyle(img)} />
    </div>
    <figcaption className="mono pf-ShowcaseCanvas_tag">
      {img.tag} · {img.alt}
    </figcaption>
  </figure>
);

const ShowcaseCanvas: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState(false);

  useAnimIn(sectionRef, { threshold: 0.15 });

  // scroll-linked drift: each piece moves a different distance (--depth) as the stage crosses the viewport
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const r = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      stage.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      const on = entry.isIntersecting && mq.matches;
      if (on !== listening) {
        listening = on;
        if (on) {
          window.addEventListener('scroll', onScroll, { passive: true });
          update();
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      }
    });
    io.observe(stage);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // phones rotate through their screens while the canvas is on screen
  useEffect(() => {
    if (!visible || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setTick((n) => n + 1);
    }, 4200);
    return () => clearInterval(id);
  }, [visible]);

  const current = glancePhones.map((set, i) => set[(tick + i) % set.length]);

  return (
    <section ref={sectionRef} className="container pf-ShowcaseCanvas_section" aria-labelledby="glance-title">
      <div className="pf-ShowcaseCanvas_head">
        <p className="mono pf-ShowcaseCanvas_eyebrow">
          <span className="pf-ShowcaseCanvas_rule" aria-hidden="true" />
          At a glance
        </p>
        <h2 id="glance-title" className="pf-ShowcaseCanvas_title">
          <span className="pf-ShowcaseCanvas_line">
            <span>The range,</span>
          </span>
          <span className="pf-ShowcaseCanvas_line">
            <em>at a glance.</em>
          </span>
        </h2>
        <p className="pf-ShowcaseCanvas_note">
          {projects.length} showcases across web, apps, branding, print and motion, shown through the real work.
        </p>
      </div>

      <div className="pf-ShowcaseCanvas_ticker" aria-label={`Industries: ${industries.join(', ')}`}>
        {[0, 1].map((n) => (
          <ul key={n} className="mono pf-ShowcaseCanvas_tickerTrack" aria-hidden={n === 1 || undefined}>
            {industries.map((name) => (
              <li key={name}>
                {name}
                <span aria-hidden="true">/</span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="pf-ShowcaseCanvas_canvas">
        <div ref={stageRef} className="pf-ShowcaseCanvas_stage">
          <span className="pf-ShowcaseCanvas_grid" aria-hidden="true" />
          <Piece slot="dashboard" i={0} img={glanceDashboard} dark />
          <Piece slot="desktop" i={1} img={glanceDesktop} />
          <Piece slot="flow" i={2} img={glanceFlow} />
          {glancePhones.map((set, t) => (
            <figure
              key={t}
              className="pf-ShowcaseCanvas_piece pf-ShowcaseCanvas_phone"
              data-slot={t ? 'phoneB' : 'phoneA'}
              style={slotStyle(t ? 'phoneB' : 'phoneA', 3 + t, set[0])}
            >
              <div className="pf-ShowcaseCanvas_card">
                {set.map((img, s) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading="eager"
                    className="pf-ShowcaseCanvas_swap"
                    style={imgStyle(img)}
                    data-active={(tick + t) % set.length === s || undefined}
                  />
                ))}
              </div>
            </figure>
          ))}
        </div>
        <p className="mono pf-ShowcaseCanvas_now">
          <span className="pf-ShowcaseCanvas_nowDot" aria-hidden="true" />
          Mobile · {current[0].alt} / {current[1].alt}
        </p>
      </div>
    </section>
  );
};

export default ShowcaseCanvas;
