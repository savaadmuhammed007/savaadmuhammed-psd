import { useEffect, useRef, useState } from 'react';

/**
 * Adds a "visible" flag once the returned ref's element scrolls into view.
 * Pair it with a CSS module class that animates in on that flag, e.g:
 *
 *   const [ref, visible] = useReveal();
 *   <section ref={ref} className={`${s.section} ${visible ? s.visible : ''}`}>
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
