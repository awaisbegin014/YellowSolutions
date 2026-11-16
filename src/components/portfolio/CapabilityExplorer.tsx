import React, { useId, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useAnimIn } from './anim';
import { capabilities, type Capability, type FlowStep, type Visual } from './data';

const n = (v: number) => ({ '--n': v } as CSSProperties);
const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

const Screens: React.FC<{ main: NonNullable<Extract<Visual, { kind: 'screens' }>['main']>; phone?: Extract<Visual, { kind: 'screens' }>['phone'] }> = ({
  main,
  phone,
}) => (
  <div className="pf-CapabilityExplorer_screens" data-with-phone={phone ? '' : undefined}>
    <div className="pf-CapabilityExplorer_shot" style={{ aspectRatio: `${main.width} / ${main.height}` }}>
      <img src={main.src} alt={main.alt} width={main.width} height={main.height} style={{ objectPosition: 'top' }} />
    </div>
    {phone && (
      <div className="pf-CapabilityExplorer_phoneShot" style={{ aspectRatio: `${phone.width} / ${phone.height}` }}>
        <img src={phone.src} alt={phone.alt} width={phone.width} height={phone.height} style={{ objectPosition: 'top' }} />
      </div>
    )}
  </div>
);

const Flow: React.FC<{ steps: FlowStep[] }> = ({ steps }) => (
  <ol className="pf-CapabilityExplorer_flow" style={{ '--steps': steps.length } as CSSProperties}>
    {steps.map((s, i) => (
      <li key={s.label} className="pf-CapabilityExplorer_step" style={n(i)}>
        <span className="mono pf-CapabilityExplorer_stepIndex">{String(i + 1).padStart(2, '0')}</span>
        <strong>{s.label}</strong>
        <span className="pf-CapabilityExplorer_stepSub">{s.sub}</span>
        {s.chips && (
          <span className="pf-CapabilityExplorer_chips">
            {s.chips.map((c, k) => (
              <span key={c} className="pf-CapabilityExplorer_miniChip" style={n(k)}>
                {c}
              </span>
            ))}
          </span>
        )}
        {i < steps.length - 1 && <span className="pf-CapabilityExplorer_connector" aria-hidden="true" />}
      </li>
    ))}
  </ol>
);

const PIPELINE_COUNTS = [3, 2, 2, 1];

const Pipeline: React.FC = () => (
  <div className="pf-CapabilityExplorer_pipeline">
    <div className="pf-CapabilityExplorer_columns">
      {['Lead', 'Qualified', 'Proposal', 'Won'].map((name, a) => (
        <div key={name} className="pf-CapabilityExplorer_column" style={n(a)}>
          <span className="mono pf-CapabilityExplorer_columnHead">{name}</span>
          {Array.from({ length: PIPELINE_COUNTS[a] }, (_, t) => (
            <span key={t} className="pf-CapabilityExplorer_card" style={n(3 * a + t)}>
              <i />
              <i />
            </span>
          ))}
        </div>
      ))}
      <span className="pf-CapabilityExplorer_mover" aria-hidden="true">
        <i />
        <i />
      </span>
    </div>
    <div className="pf-CapabilityExplorer_sync">
      <span className="mono">CRM</span>
      <span className="pf-CapabilityExplorer_syncLine" aria-hidden="true" />
      <span className="mono">Sales</span>
    </div>
  </div>
);

const Visibility: React.FC = () => (
  <div className="pf-CapabilityExplorer_visibility">
    <svg viewBox="0 0 400 180" className="pf-CapabilityExplorer_chart" aria-hidden="true">
      {[45, 90, 135].map((y) => (
        <line key={y} className="pf-CapabilityExplorer_gridLine" x1="0" x2="400" y1={y} y2={y} />
      ))}
      <path className="pf-CapabilityExplorer_area" d="M0 168 C 70 166, 110 150, 150 132 S 250 70, 300 52 S 370 22, 400 14 L 400 180 L 0 180 Z" />
      <path className="pf-CapabilityExplorer_curve" d="M0 168 C 70 166, 110 150, 150 132 S 250 70, 300 52 S 370 22, 400 14" pathLength={1} />
    </svg>
    <ol className="pf-CapabilityExplorer_phases">
      {['Technical', 'Content', 'Local', 'Authority'].map((name, t) => (
        <li key={name} style={n(t)}>
          <span className="pf-CapabilityExplorer_phaseDot" aria-hidden="true" />
          <span className="mono">{name}</span>
        </li>
      ))}
    </ol>
  </div>
);

const VisualView: React.FC<{ visual: Visual }> = ({ visual }) => {
  switch (visual.kind) {
    case 'screens':
      return <Screens main={visual.main} phone={visual.phone} />;
    case 'flow':
      return <Flow steps={visual.steps} />;
    case 'pipeline':
      return <Pipeline />;
    case 'visibility':
      return <Visibility />;
  }
};

const Preview: React.FC<{ capability: Capability }> = ({ capability }) => (
  <div className="pf-CapabilityExplorer_preview">
    <div className="pf-CapabilityExplorer_stage">
      <VisualView visual={capability.visual} />
    </div>
    <div className="pf-CapabilityExplorer_meta">
      <h3 className="pf-CapabilityExplorer_metaTitle">{capability.title}</h3>
      <p className="pf-CapabilityExplorer_metaBody">{capability.body}</p>
      {capability.related && (
        <p className="pf-CapabilityExplorer_related">
          <span className="mono">Related work</span>
          {capability.related.map((r) => (
            <span key={r} className="pf-CapabilityExplorer_chip">
              {r}
            </span>
          ))}
        </p>
      )}
      <Link to={capability.href} className="pf-CapabilityExplorer_link">
        <span>Explore the service</span>
        <i aria-hidden="true">↗</i>
      </Link>
    </div>
  </div>
);

const CapabilityExplorer: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const uid = useId();
  const [open, setOpen] = useState(0);
  const active = open < 0 ? 0 : open;
  const current = capabilities[active];

  useAnimIn(ref, { threshold: 0.12 });

  return (
    <section ref={ref} className="container pf-CapabilityExplorer_section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="pf-CapabilityExplorer_head">
        <div>
          <p className="mono pf-CapabilityExplorer_eyebrow">
            <span className="pf-CapabilityExplorer_rule" aria-hidden="true" />
            Capabilities
          </p>
          <h2 id="capabilities-title" className="pf-CapabilityExplorer_title">
            What we build, <em>and how it works.</em>
          </h2>
        </div>
        <p className="pf-CapabilityExplorer_note">
          {capabilities.length} disciplines, one delivery team. Choose one to see the kind of system behind it.
        </p>
      </div>

      <div className="pf-CapabilityExplorer_explorer">
        <ol className="pf-CapabilityExplorer_list">
          {capabilities.map((c, i) => {
            const isOpen = open === i;
            return (
              <li
                key={c.title}
                className="pf-CapabilityExplorer_item"
                data-active={i === active || undefined}
                data-open={isOpen || undefined}
                style={{ '--i': i } as CSSProperties}
              >
                <button
                  type="button"
                  className="pf-CapabilityExplorer_row"
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-panel-${i}`}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse' && isDesktop()) setOpen(i);
                  }}
                  onFocus={() => isDesktop() && setOpen(i)}
                  onClick={() => setOpen(isDesktop() ? i : isOpen ? -1 : i)}
                >
                  <span className="mono pf-CapabilityExplorer_index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pf-CapabilityExplorer_rowTitle">{c.title}</span>
                  <span className="pf-CapabilityExplorer_chevron" aria-hidden="true" />
                </button>
                <div id={`${uid}-panel-${i}`} className="pf-CapabilityExplorer_inline" hidden={!isOpen}>
                  {isOpen && <Preview capability={c} />}
                </div>
              </li>
            );
          })}
        </ol>

        <aside className="pf-CapabilityExplorer_panel" aria-label={`Preview: ${current.title}`}>
          <div className="mono pf-CapabilityExplorer_panelTop">
            <span>
              <span className="pf-CapabilityExplorer_liveDot" aria-hidden="true" />
              Preview
            </span>
            <span>
              {String(active + 1).padStart(2, '0')} / {String(capabilities.length).padStart(2, '0')}
            </span>
          </div>
          <Preview key={current.title} capability={current} />
        </aside>
      </div>
    </section>
  );
};

export default CapabilityExplorer;
