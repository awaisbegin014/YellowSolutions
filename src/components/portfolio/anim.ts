import { useEffect, type RefObject } from 'react';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface AnimInOptions {
  threshold?: number;
  /** called once the section enters; `instant` is true when no animation will play */
  onIn?: (instant: boolean) => void;
}

/**
 * Marks a section data-anim="ready" until it scrolls into view, then data-anim="in".
 * The ported stylesheet keys all of its entrance animations off these two states.
 */
export function useAnimIn(ref: RefObject<HTMLElement>, { threshold = 0.2, onIn }: AnimInOptions = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const go = (instant: boolean) => {
      el.dataset.anim = 'in';
      onIn?.(instant);
    };

    if (prefersReducedMotion() || el.getBoundingClientRect().bottom < 0) {
      go(true);
      return;
    }

    el.dataset.anim = 'ready';
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          requestAnimationFrame(() => requestAnimationFrame(() => go(false)));
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
