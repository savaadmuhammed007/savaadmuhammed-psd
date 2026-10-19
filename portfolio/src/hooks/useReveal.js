import { useEffect, useRef, useState } from 'react';

/**
 * Adds a "visible" flag once the returned ref's element scrolls into view.
 * Uses threshold: 0 and rootMargin: '100px 0px' with an immediate getBoundingClientRect
 * check to ensure tall sections and grid items always trigger reliably on mobile devices.
 */
export function useReveal(threshold = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    // Check if element is already within or near the viewport on mount
    const rect = node.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top <= windowHeight + 100 && rect.bottom >= -100) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0,
        rootMargin: '100px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
