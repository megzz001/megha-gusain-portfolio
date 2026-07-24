import { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

interface RevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  start?: string;
}

export default function Reveal({
  children,
  className,
  y = 40,
  x = 0,
  delay = 0,
  duration = 0.8,
  start = 'top 85%',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, x, delay, duration, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}
