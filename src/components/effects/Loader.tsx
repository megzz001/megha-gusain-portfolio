import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    gsap.to([leftRef.current, rightRef.current], {
      scaleX: 1.66,
      duration: 1,
      ease: 'power2.inOut',
    });

    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setPercent(count);
      if (count >= 100) {
        clearInterval(interval);
        setExiting(true);

        const tl = gsap.timeline({
          delay: 0.15,
          onComplete: () => {
            document.body.style.overflow = prevOverflow;
            onComplete();
          },
        });
        tl.to(leftRef.current, { xPercent: -100, duration: 1, ease: 'power3.inOut' }, 0);
        tl.to(rightRef.current, { xPercent: 100, duration: 1, ease: 'power3.inOut' }, 0);
      }
    }, 10);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex" aria-hidden="true">
      <div
        ref={leftRef}
        className="w-1/2 h-full bg-black origin-right"
        style={{ transform: 'scaleX(1)' }}
      />
      <div
        ref={rightRef}
        className="w-1/2 h-full bg-black origin-left"
        style={{ transform: 'scaleX(1)' }}
      />

      {!exiting && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none">
          <span className="font-display font-bold text-3xl sm:text-4xl text-[#e2e8f0] tabular-nums tracking-wider">
            {percent}%
          </span>
        </div>
      )}
    </div>
  );
}
