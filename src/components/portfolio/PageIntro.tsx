import React, { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { prefersReducedMotion } from './anim';

const WORD = 'YELLOW';

/**
 * Full-screen loader: the wordmark rises in while a counter runs to 100, then the
 * overlay opens as a circle from the dot. Driven by html[data-intro] (run → play → done).
 */
const PageIntro: React.FC = () => {
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (prefersReducedMotion()) return;

    html.setAttribute('data-intro', 'run');

    const t0 = performance.now();
    let loaded = document.readyState === 'complete';
    let fonts = !document.fonts;
    let tr: number | null = null;
    let v0 = 0;
    let played = false;
    let raf = 0;
    let doneTimer = 0;
    let cancelled = false;

    const onLoad = () => {
      loaded = true;
    };
    if (!loaded) window.addEventListener('load', onLoad);
    if (document.fonts) document.fonts.ready.then(() => (fonts = true));

    const ease = (x: number) => 1 - Math.pow(1 - x, 3);

    const measure = () => {
      const d = dotRef.current;
      if (!d) return;
      const r = d.getBoundingClientRect();
      html.style.setProperty('--intro-x', r.left + r.width / 2 + 'px');
      html.style.setProperty('--intro-y', r.top + r.height / 2 + 'px');
    };

    const frame = (now: number) => {
      if (cancelled) return;
      const t = Math.max(0, now - t0);
      let v = 0;

      if (tr === null) {
        v = t < 750 ? 90 * (1 - Math.pow(1 - t / 750, 2)) : 90 + 6 * (1 - Math.exp(-(t - 750) / 1400));
        if ((loaded && fonts && t >= 550) || t >= 4000) {
          tr = now;
          v0 = v;
        }
      }
      if (tr !== null) {
        const p = Math.min(1, (now - tr) / Math.max(240, (100 - v0) * 14));
        v = v0 + (100 - v0) * ease(p);
        if (p >= 1 && !played) {
          played = true;
          v = 100;
          measure();
          html.setAttribute('data-intro', 'play');
          doneTimer = window.setTimeout(() => html.setAttribute('data-intro', 'done'), 950);
        }
      }

      countRef.current?.setAttribute('data-n', ('00' + Math.round(v)).slice(-3));
      if (barRef.current) barRef.current.style.transform = 'scaleX(' + (v / 100).toFixed(3) + ')';
      if (!played) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(doneTimer);
      window.removeEventListener('load', onLoad);
      html.removeAttribute('data-intro');
      html.style.removeProperty('--intro-x');
      html.style.removeProperty('--intro-y');
    };
  }, []);

  return (
    <div className="pf-PageIntro_overlay" aria-hidden="true">
      <div className="pf-PageIntro_word">
        <span className="pf-PageIntro_lockup">
          <span className="pf-PageIntro_mask">
            {WORD.split('').map((ch, i) => (
              <span key={i} className="pf-PageIntro_char" style={{ '--i': i } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          <i ref={dotRef} className="pf-PageIntro_dot" data-intro-dot="true" />
        </span>
      </div>
      <div className="pf-PageIntro_progress">
        <span ref={countRef} className="pf-PageIntro_count" data-intro-count="true" />
        <span ref={barRef} className="pf-PageIntro_bar" data-intro-bar="true" />
      </div>
    </div>
  );
};

export default PageIntro;
