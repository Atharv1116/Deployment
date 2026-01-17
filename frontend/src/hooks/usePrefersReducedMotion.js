import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export default function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const media = window.matchMedia(QUERY);
      const handler = () => setPrefersReduced(media.matches);

      handler();
      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    }

    return undefined;
  }, []);

  return prefersReduced;
}
