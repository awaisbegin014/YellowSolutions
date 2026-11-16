import React, { useRef, type CSSProperties } from 'react';
import { useAnimIn } from './anim';
import { COMPACT_LAND, WIDE_LAND } from './worldMap';

type Pt = [number, number];

interface Layout {
  lon0: number;
  lon1: number;
  latTop: number;
  latBot: number;
  w: number;
  h: number;
}

/** must match the bounds used to generate worldMap.ts */
const LAYOUTS: Record<'wide' | 'compact', Layout> = {
  wide: { lon0: -82, lon1: 86, latTop: 58, latBot: 8, w: 1000, h: 360 },
  compact: { lon0: -80, lon1: 82, latTop: 58, latBot: 8, w: 680, h: 255 },
};

const project = (l: Layout, lon: number, lat: number): Pt => [
  Math.round(((lon - l.lon0) / (l.lon1 - l.lon0)) * l.w * 10) / 10,
  Math.round(((l.latTop - lat) / (l.latTop - l.latBot)) * l.h * 10) / 10,
];

/** a gentle arc between two points: perpendicular offset of the two inner control points */
const arc = (a: Pt, b: Pt, bend = 0.2): [Pt, Pt, Pt, Pt] => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const [px, py] = dx >= 0 ? [dy, -dx] : [-dy, dx];
  const at = (t: number): Pt => [
    Math.round((a[0] + dx * t + px * bend) * 10) / 10,
    Math.round((a[1] + dy * t + py * bend) * 10) / 10,
  ];
  return [a, at(1 / 3), at(2 / 3), b];
};

const toPath = (pts: [Pt, Pt, Pt, Pt]) => {
  const [a, b, c, d] = pts.map(([x, y]) => `${x} ${y}`);
  return `M${a} C ${b}, ${c}, ${d}`;
};

interface Office {
  key: string;
  label: string;
  sub: string;
  lon: number;
  lat: number;
  hub?: boolean;
  place: 'under' | 'above' | 'below' | 'right';
  i: number;
}

const OFFICES: Office[] = [
  { key: 'pk', label: 'Pakistan', sub: 'Development hub · Karachi', lon: 67.01, lat: 24.86, hub: true, place: 'under', i: 0 },
  { key: 'de', label: 'Germany', sub: 'Office · Berlin', lon: 13.4, lat: 52.52, place: 'right', i: 2 },
  { key: 'us', label: 'USA', sub: 'Office · Coram, New York', lon: -73.0, lat: 40.87, place: 'right', i: 3 },
];

const ROUTES = [
  { key: 'pk-de', from: 'pk', to: 'de', bend: 0.16, d: 0.9 },
  { key: 'pk-us', from: 'pk', to: 'us', bend: 0.2, d: 1.15 },
  { key: 'de-us', from: 'de', to: 'us', bend: 0.18, d: 1.4 },
];

const STEPS = [
  { title: 'Strategy', body: 'Goals, audience and plan' },
  { title: 'Design', body: 'UI / UX, brand and visuals' },
  { title: 'Development', body: 'Web, apps and software' },
  { title: 'Growth', body: 'SEO, marketing and automation' },
];

const cssVar = (name: string, value: string | number) => ({ [name]: value } as CSSProperties);

const FootprintMap: React.FC<{ layout: 'wide' | 'compact' }> = ({ layout }) => {
  const l = LAYOUTS[layout];
  const land = layout === 'wide' ? WIDE_LAND : COMPACT_LAND;
  const pts = Object.fromEntries(OFFICES.map((o) => [o.key, project(l, o.lon, o.lat)])) as Record<string, Pt>;
  const patternId = `land-dots-${layout}`;

  return (
    <div
      className="pf-AboutSection_map"
      data-layout={layout}
      style={layout === 'wide' ? { aspectRatio: `${l.w} / ${l.h}` } : undefined}
    >
      <svg
        className="pf-AboutSection_svg"
        viewBox={`0 0 ${l.w} ${l.h}`}
        style={{ overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          <pattern id={patternId} width="4.2" height="4.2" patternUnits="userSpaceOnUse">
            <circle className="pf-AboutSection_patternDot" cx="2.1" cy="2.1" r="0.95" />
          </pattern>
        </defs>
        <g className="pf-AboutSection_country">
          <path className="pf-AboutSection_countryFill" d={land} fillRule="evenodd" />
          <path className="pf-AboutSection_countryDots" d={land} fill={`url(#${patternId})`} fillRule="evenodd" />
          <path className="pf-AboutSection_countryEdge" d={land} />
        </g>
        {ROUTES.map((r) => {
          const path = toPath(arc(pts[r.from], pts[r.to], r.bend));
          return (
            <g key={r.key} style={cssVar('--d', `${r.d}s`)}>
              <path className="pf-AboutSection_route" d={path} pathLength={1} />
              <path className="pf-AboutSection_flow" d={path} pathLength={100} />
            </g>
          );
        })}
      </svg>
      {OFFICES.map((o) => (
        <div
          key={o.key}
          className="pf-AboutSection_node"
          data-hub={o.hub || undefined}
          data-place={layout === 'compact' && !o.hub ? 'right' : o.place}
          style={{
            left: `${(pts[o.key][0] / l.w) * 100}%`,
            top: `${(pts[o.key][1] / l.h) * 100}%`,
            ...cssVar('--i', o.i),
          }}
        >
          <span className="pf-AboutSection_pin" aria-hidden="true" />
          <span
            className="pf-AboutSection_nodeText"
            // the hub sits near the map's right edge on small screens: anchor its label leftward so it stays inside
            style={layout === 'compact' && o.hub ? { left: 'auto', right: -8, justifyItems: 'end', textAlign: 'right' } : undefined}
          >
            <span className="pf-AboutSection_nodeLabel">{o.label}</span>
            <span className="mono pf-AboutSection_nodeSub">{o.sub}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useAnimIn(ref, { threshold: 0.25 });

  return (
    <section ref={ref} className="container pf-AboutSection_section" id="about" aria-labelledby="about-title">
      <div className="pf-AboutSection_head">
        <div>
          <p className="mono pf-AboutSection_eyebrow">
            <span className="pf-AboutSection_rule" aria-hidden="true" />
            About
          </p>
          <h2 id="about-title" className="pf-AboutSection_title">
            <span className="pf-AboutSection_line">
              <span>One team,</span>
            </span>
            <span className="pf-AboutSection_line">
              <span>idea to launch.</span>
            </span>
          </h2>
        </div>
        <div className="pf-AboutSection_copy">
          <p className="pf-AboutSection_lead">
            A digital agency built for long-term partnerships.{' '}
            <span>
              Strategy, design, development and growth sit in one team, so the people who shape your idea are the ones
              who build and launch it.
            </span>
          </p>
          <p className="pf-AboutSection_body">
            From our offices in Karachi, Berlin and New York, designers, developers and marketers work side by side. We
            partner with businesses across the United States, Germany and beyond, and we stay on after launch to
            measure, refine and keep what we built moving forward.
          </p>
          <ol className="pf-AboutSection_steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="pf-AboutSection_step" style={cssVar('--i', i)}>
                <span className="mono pf-AboutSection_stepIndex">{String(i + 1).padStart(2, '0')}</span>
                <strong className="pf-AboutSection_stepTitle">{s.title}</strong>
                <span className="pf-AboutSection_stepBody">{s.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <figure className="pf-AboutSection_footprint" aria-labelledby="footprint-caption">
        <figcaption id="footprint-caption" className="pf-AboutSection_caption">
          <span className="mono pf-AboutSection_captionLabel">Regional footprint</span>
          <strong className="pf-AboutSection_captionHome">Three offices, one team</strong>
          <span className="mono pf-AboutSection_captionReach">Pakistan · Germany · USA</span>
        </figcaption>
        <FootprintMap layout="wide" />
        <FootprintMap layout="compact" />
      </figure>
    </section>
  );
};

export default AboutSection;
