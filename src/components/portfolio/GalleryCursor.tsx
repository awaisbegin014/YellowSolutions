import React, { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  areaRef: RefObject<HTMLElement>;
  accent: string;
  label?: string;
}

/**
 * Custom "View Gallery" cursor that trails the pointer while it hovers a gallery frame.
 * Only active for fine pointers (mouse / trackpad) when motion is allowed.
 */
const GalleryCursor: React.FC<Props> = ({ areaRef, accent, label = 'View Gallery' }) => {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const area = areaRef.current;
    if (!enabled || !area) return;
    area.dataset.cursor = 'custom';

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let shown = false;
    let raf = 0;

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      const el = cursorRef.current;
      if (el) el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1 ? 0 : requestAnimationFrame(loop);
    };
    const show = (on: boolean) => {
      if (on !== shown) {
        shown = on;
        cursorRef.current?.toggleAttribute('data-on', on);
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const t = e.target as Element;
      const overFrame = !!t.closest('[data-gallery-frame]') && !t.closest('a');
      target.x = e.clientX;
      target.y = e.clientY;
      if (overFrame && !shown) {
        pos.x = target.x;
        pos.y = target.y;
      }
      show(overFrame);
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const hide = () => show(false);

    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', hide);
    area.addEventListener('pointerdown', hide);
    return () => {
      delete area.dataset.cursor;
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', hide);
      area.removeEventListener('pointerdown', hide);
      cancelAnimationFrame(raf);
    };
  }, [enabled, areaRef]);

  if (!enabled) return null;
  return createPortal(
    <div className="pf-root">
      <div ref={cursorRef} className="pf-GalleryCursor_cursor" aria-hidden="true" style={{ '--accent': accent } as CSSProperties}>
        <span className="pf-GalleryCursor_pill">
          <span>{label}</span>
          <i>↗</i>
        </span>
      </div>
    </div>,
    document.body
  );
};

export default GalleryCursor;
