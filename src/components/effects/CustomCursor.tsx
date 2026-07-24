import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

const HOVER_SELECTOR = 'a, button, input, textarea, select, [role="button"], .cursor-hover';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    document.body.classList.add('custom-cursor-active');

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const outlineX = gsap.quickTo(outline, 'x', { duration: 0.35, ease: 'power3' });
    const outlineY = gsap.quickTo(outline, 'y', { duration: 0.35, ease: 'power3' });

    const handleMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      outlineX(e.clientX);
      outlineY(e.clientY);
    };

    const handleOver = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(HOVER_SELECTOR)) {
        gsap.to(outline, { scale: 1.8, borderColor: '#6366f1', duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 0.5, duration: 0.3, ease: 'power2.out' });
      }
    };

    const handleOut = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(HOVER_SELECTOR)) {
        gsap.to(outline, { scale: 1, borderColor: '#e2e8f0', duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-accent pointer-events-none z-[200] -translate-x-1/2 -translate-y-1/2 hidden md:block no-print"
        aria-hidden="true"
      />
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-[200] -translate-x-1/2 -translate-y-1/2 hidden md:block no-print"
        style={{ borderColor: '#e2e8f0' }}
        aria-hidden="true"
      />
    </>
  );
}
