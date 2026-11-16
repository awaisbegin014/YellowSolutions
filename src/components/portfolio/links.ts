import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** the site-wide quote modal (mounted in the Navbar) listens for this event */
export const openQuote = () => window.dispatchEvent(new Event('open-quote-modal'));

/** same behavior as the Navbar's hash links: go home, then smooth-scroll to the section */
export function useGoToSection() {
  const navigate = useNavigate();
  const location = useLocation();
  return useCallback(
    (hash: string) => {
      const scroll = () => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      if (location.pathname !== '/') {
        navigate('/');
        window.setTimeout(scroll, 100);
      } else {
        scroll();
      }
    },
    [location.pathname, navigate]
  );
}
