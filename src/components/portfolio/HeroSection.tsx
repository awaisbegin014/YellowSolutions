import React, { useEffect, useRef, type CSSProperties } from 'react';
import { prefersReducedMotion } from './anim';
import { heroCount } from './data';

const WORDS = ['Websites', 'apps', 'brand identities'];
const SR_TEXT = 'Websites, apps and brand identities, designed end to end.';

const cssVar = (name: string, value: string | number) => ({ [name]: value } as CSSProperties);

/** one keyword: its letters animate individually; "keep" is the part that stays when the phrase collapses */
const Keyword: React.FC<{ index: number; trail?: string }> = ({ index, trail = '' }) => {
  const word = WORDS[index];
  const split = word.lastIndexOf(' ') + 1;
  const chars = (from: number, to: number) =>
    [...word.slice(from, to)].map((ch, k) =>
      ch === ' ' ? (
        ' '
      ) : (
        <span key={from + k} className="pf-HeroHeadline_ch" style={cssVar('--c', from + k)}>
          {ch}
        </span>
      )
    );
  return (
    <span className="pf-HeroHeadline_kw" data-kw={index}>
      {chars(0, split)}
      <span className="pf-HeroHeadline_keep">
        {chars(split, word.length)}
        {trail}
      </span>
    </span>
  );
};

const HeroHeadline: React.FC = () => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const kws = Array.from(root.querySelectorAll<HTMLElement>('[data-kw]'));
    const last = root.querySelector<HTMLElement>('[data-last] > *');
    const desktop = window.matchMedia('(min-width: 1024px)');
    const finePointer = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    let visible = true;
    let alive = false;
    let emphIndex = 0;
    let emphTimer = 0;

    const emphasise = () => {
      if (!visible || document.hidden) return;
      const el = kws[emphIndex % kws.length];
      emphIndex++;
      el.setAttribute('data-emph', '');
      later(() => el.removeAttribute('data-emph'), 1900);
    };

    const start = () => {
      if (alive) return;
      alive = true;
      root.setAttribute('data-alive', '');
      if (desktop.matches) {
        kws.forEach((el, i) =>
          later(() => {
            el.removeAttribute('data-wave');
            void el.offsetWidth; // restart the animation
            el.setAttribute('data-wave', '');
            later(() => el.removeAttribute('data-wave'), 1400);
          }, 380 * i)
        );
      }
      emphTimer = window.setInterval(emphasise, 5200);
    };

    // wait for the last line to finish its entrance, then wake the headline up
    let stopped = false;
    const entrance = last?.getAnimations().find((a) => 'animationName' in a && String((a as CSSAnimation).animationName).includes('lineIn'));
    if (entrance && entrance.playState !== 'finished') {
      entrance.finished.then(
        () => !stopped && start(),
        () => !stopped && start()
      );
    } else {
      start();
    }

    // cursor "magnet": the keyword nearest the pointer leans toward it and brightens
    const pointer = { x: 0, y: 0, active: false };
    const state = kws.map(() => ({ x: 0, y: 0, h: 0 }));
    let raf = 0;

    const tick = () => {
      raf = 0;
      let moving = false;
      let nearest = -1;
      let best = 340;
      const rects = kws.map((el) => el.getBoundingClientRect());
      if (pointer.active) {
        rects.forEach((r, i) => {
          const dist = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
          if (dist < best) {
            best = dist;
            nearest = i;
          }
        });
      }
      kws.forEach((el, i) => {
        const s = state[i];
        let tx = 0;
        let ty = 0;
        let th = 0;
        if (i === nearest) {
          const r = rects[i];
          const dx = pointer.x - (r.left + r.width / 2);
          const dy = pointer.y - (r.top + r.height / 2);
          const len = Math.hypot(dx, dy) || 1;
          const pull = 3 * Math.min(1, len / 120);
          tx = (dx / len) * pull;
          ty = (dy / len) * pull;
          th = 1 - best / 340;
        }
        s.x += (tx - s.x) * 0.085;
        s.y += (ty - s.y) * 0.085;
        s.h += (th - s.h) * 0.07;
        if (Math.abs(tx - s.x) > 0.01 || Math.abs(ty - s.y) > 0.01 || Math.abs(th - s.h) > 0.002) moving = true;
        el.style.setProperty('--kw-x', s.x.toFixed(2) + 'px');
        el.style.setProperty('--kw-y', s.y.toFixed(2) + 'px');
        el.style.setProperty('--kw-h', s.h.toFixed(3));
      });
      if (moving) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (finePointer.matches && visible && e.pointerType === 'mouse') {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
        kick();
      }
    };
    const onLeave = () => {
      pointer.active = false;
      kick();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      root.toggleAttribute('data-paused', !visible);
      if (!visible) onLeave();
    });
    io.observe(root);

    return () => {
      stopped = true;
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      io.disconnect();
      timers.forEach(clearTimeout);
      clearInterval(emphTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <h1 ref={ref} id="hero-title" className="pf-projects_h1 pf-HeroHeadline_title">
      <span className="sr-only">{SR_TEXT}</span>
      <span aria-hidden="true">
        <span className="pf-HeroHeadline_line" style={cssVar('--l', 0)}>
          <span className="pf-HeroHeadline_inner">
            <Keyword index={0} trail="," /> <Keyword index={1} />
          </span>
        </span>{' '}
        <span className="pf-HeroHeadline_line" style={cssVar('--l', 1)}>
          <span className="pf-HeroHeadline_inner">
            and <Keyword index={2} trail="," />
          </span>
        </span>{' '}
        <span className="pf-HeroHeadline_line" style={cssVar('--l', 2)} data-last="true">
          <em className="pf-HeroHeadline_inner">
            designed end to end<span className="pf-HeroHeadline_stop">.</span>
          </em>
        </span>
      </span>
    </h1>
  );
};

const HeroSection: React.FC = () => (
  <section className="container pf-projects_hero" aria-labelledby="hero-title">
    <div className="pf-projects_heroStage">
      <span className="pf-projects_heroGlow" aria-hidden="true" />
      <span className="pf-projects_heroGlint" aria-hidden="true" />

      <div className="pf-projects_heroTop">
        <span className="pf-projects_heroMark">
          <img
            alt="The Yellow Solutions"
            width={1161}
            height={529}
            decoding="async"
            className="pf-projects_heroLogo pf-logo-light"
            src="/images/logo.png"
          />
          <img
            alt=""
            aria-hidden="true"
            width={1161}
            height={529}
            decoding="async"
            className="pf-projects_heroLogo pf-logo-dark"
            src="/images/logo-white.png"
          />
          <span className="pf-projects_heroShine" aria-hidden="true">
            <span />
          </span>
          <span className="pf-projects_heroPulse" aria-hidden="true" />
        </span>
        <p className="pf-projects_portfolio">
          <span className="pf-projects_portfolioRule" aria-hidden="true" />
          <span className="mono pf-projects_portfolioLabel">Portfolio</span>
          <span className="pf-projects_portfolioLine">A closer look at our work.</span>
        </p>
      </div>

      <div className="pf-projects_heroBody">
        <div className="pf-projects_heroMain">
          <p className="mono pf-projects_eyebrow pf-projects_heroEyebrow">
            <span className="pf-projects_eyebrowDot" aria-hidden="true" />
            <span className="pf-projects_heroEyebrowText">Selected work · {heroCount} showcases</span>
          </p>
          <HeroHeadline />
          <p className="pf-projects_lede">
            The Yellow Solutions designs and builds websites, mobile apps, brand identities and digital growth. Every
            showcase below is shown through the real visuals we delivered.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
