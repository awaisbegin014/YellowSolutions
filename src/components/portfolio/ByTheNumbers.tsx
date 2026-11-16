import React, { useRef, type CSSProperties } from 'react';
import { useAnimIn } from './anim';
import { sectorTiles, stats, timelineStops } from './data';

const idx = (n: number) => ({ '--n': n } as CSSProperties);

const Timeline: React.FC = () => {
  const x0 = 14;
  const x1 = 266;
  const last = timelineStops.length - 1;
  const stops = timelineStops.map((label, i) => ({ label, x: x0 + ((x1 - x0) * i) / last }));
  return (
    <svg viewBox="0 0 300 88" className="pf-ByTheNumbers_svg">
      <line className="pf-ByTheNumbers_base" x1="14" y1="40" x2="292" y2="40" />
      <line className="pf-ByTheNumbers_progress" x1="14" y1="40" x2="266" y2="40" pathLength={1} />
      <line className="pf-ByTheNumbers_ahead" x1="272" y1="40" x2="296" y2="40" />
      {stops.map((s, i) => (
        <g key={s.label} className="pf-ByTheNumbers_stop" style={idx(i)}>
          <circle cx={s.x} cy="40" r={i === last ? 5 : 3.5} className={i === last ? 'pf-ByTheNumbers_now' : undefined} />
          <text x={s.x} y="66" textAnchor={i === 0 ? 'start' : 'middle'}>
            {s.label}
          </text>
        </g>
      ))}
      <circle className="pf-ByTheNumbers_ring" cx="266" cy="40" r="5" />
    </svg>
  );
};

const bars = Array.from({ length: 30 }, (_, t) => {
  const a = t / 29;
  return Math.round(Math.max(8, Math.min(66, 12 + 50 * Math.pow(a, 1.25) + 7 * Math.sin(1.7 * t) * (0.4 + 0.6 * a))));
});

const Delivery: React.FC = () => {
  const points = bars.map((h, t) => `${9 + 9.4 * t + 2.5},${74 - h - 5}`).join(' ');
  const last = bars.length - 1;
  return (
    <svg viewBox="0 0 300 88" className="pf-ByTheNumbers_svg">
      <line className="pf-ByTheNumbers_base" x1="4" y1="74.5" x2="296" y2="74.5" />
      {bars.map((h, t) => (
        <rect key={t} className="pf-ByTheNumbers_bar" x={9 + 9.4 * t} y={74 - h} width="5" height={h} rx="1.5" style={idx(t)} />
      ))}
      <polyline className="pf-ByTheNumbers_spark" points={points} pathLength={1} />
      <circle className="pf-ByTheNumbers_now" cx={9 + 9.4 * last + 2.5} cy={74 - bars[last] - 5} r="3.5" />
      <circle className="pf-ByTheNumbers_ring" cx={9 + 9.4 * last + 2.5} cy={74 - bars[last] - 5} r="3.5" />
    </svg>
  );
};

const ring = (count: number, rx: number, ry: number, start: number) =>
  Array.from({ length: count }, (_, s) => {
    const a = start + (s / count) * Math.PI * 2;
    return { x: Math.round((150 + rx * Math.cos(a)) * 10) / 10, y: Math.round((42 + ry * Math.sin(a)) * 10) / 10 };
  });

const innerRing = ring(6, 58, 22, -Math.PI / 2);
const outerRing = ring(14, 128, 36, -Math.PI / 2 + 0.22);

const Team: React.FC = () => (
  <svg viewBox="0 0 300 88" className="pf-ByTheNumbers_svg">
    <ellipse className="pf-ByTheNumbers_orbit" cx={150} cy={42} rx="58" ry="22" />
    <ellipse className="pf-ByTheNumbers_orbit" cx={150} cy={42} rx="128" ry="36" />
    {innerRing.map((p, t) => (
      <line key={`l${t}`} className="pf-ByTheNumbers_link" x1={150} y1={42} x2={p.x} y2={p.y} pathLength={1} style={idx(t)} />
    ))}
    {outerRing.map((p, t) => (
      <circle key={`o${t}`} className="pf-ByTheNumbers_member" cx={p.x} cy={p.y} r="2.6" style={idx(t)} />
    ))}
    {innerRing.map((p, t) => (
      <circle key={`i${t}`} className="pf-ByTheNumbers_lead" cx={p.x} cy={p.y} r="3.6" style={idx(t)} />
    ))}
    <circle className="pf-ByTheNumbers_now" cx={150} cy={42} r="6" />
    <circle className="pf-ByTheNumbers_ring" cx={150} cy={42} r="6" />
  </svg>
);

const Sectors: React.FC = () => (
  <svg viewBox="0 0 300 88" className="pf-ByTheNumbers_svg">
    {sectorTiles.map((label, t) => {
      const x = 1 + (t % 4) * 76;
      const y = 6 + 38 * Math.floor(t / 4);
      return (
        <g key={label} className="pf-ByTheNumbers_sector" style={idx(t)}>
          <rect x={x} y={y} width={70} height={32} rx="5" />
          <text x={x + 35} y={y + 19} textAnchor="middle">
            {label}
          </text>
        </g>
      );
    })}
  </svg>
);

const ByTheNumbers: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useAnimIn(ref, {
    threshold: 0.35,
    onIn: (instant) => {
      const el = ref.current;
      if (!el) return;
      const counters = Array.from(el.querySelectorAll<HTMLElement>('[data-count]'));
      if (instant) {
        el.dataset.done = '';
        return;
      }
      counters.forEach((c) => (c.textContent = '0'));
      const start = performance.now();
      const run = (now: number) => {
        const p = Math.min(1, (now - start) / 1300);
        const eased = 1 - Math.pow(1 - p, 4);
        counters.forEach((c) => (c.textContent = String(Math.round(Number(c.dataset.count) * eased))));
        if (p < 1) requestAnimationFrame(run);
        else el.dataset.done = '';
      };
      requestAnimationFrame(run);
    },
  });

  return (
    <section ref={ref} className="container pf-ByTheNumbers_section" aria-labelledby="numbers-title">
      <div className="pf-ByTheNumbers_head">
        <h2 id="numbers-title" className="mono pf-ByTheNumbers_eyebrow">
          <span className="pf-ByTheNumbers_rule" aria-hidden="true" />
          By the numbers
        </h2>
      </div>
      <ol className="pf-ByTheNumbers_list">
        {stats.map((s, i) => (
          <li key={s.label} className="pf-ByTheNumbers_module" style={{ '--i': i } as CSSProperties}>
            <div className="pf-ByTheNumbers_top">
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="mono pf-ByTheNumbers_kicker">{s.kicker}</span>
            </div>
            <p className="pf-ByTheNumbers_figure" aria-label={`${s.value}${s.suffix} ${s.label}`}>
              <span className="pf-ByTheNumbers_digits" aria-hidden="true" style={{ minWidth: `${String(s.value).length}ch` }}>
                <span data-count={s.value}>{s.value}</span>
                <span className="pf-ByTheNumbers_suffix">{s.suffix}</span>
              </span>
            </p>
            <p className="pf-ByTheNumbers_label" aria-hidden="true">
              {s.label}
            </p>
            <div className="pf-ByTheNumbers_viz" aria-hidden="true">
              {s.viz === 'timeline' && <Timeline />}
              {s.viz === 'delivery' && <Delivery />}
              {s.viz === 'team' && <Team />}
              {s.viz === 'sectors' && <Sectors />}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ByTheNumbers;
