import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

interface CircularBadgeProps {
  centerText: string;
  centerLabel: string;
  repeatText?: string;
  className?: string;
  size?: number;
}

export default function CircularBadge({
  centerText,
  centerLabel,
  repeatText = 'MEGHA GUSAIN',
  className = '',
  size = 200,
}: CircularBadgeProps) {
  const ringRef = useRef<SVGSVGElement>(null);
  const SIZE = size;
  const RADIUS = SIZE / 2 - 10;
  const fontSize = SIZE < 160 ? 8.5 : 10.5;
  const centerTextSize = SIZE < 160 ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl';
  const labelMaxWidth = SIZE < 160 ? '5.5rem' : '7rem';

  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
      transformOrigin: '50% 50%',
    });
    return () => {
      tween.kill();
    };
  }, []);

  const label = ` • ${repeatText} • PORTFOLIO `.repeat(2);
  const pathId = 'circular-badge-path';

  return (
    <div
      className={`relative flex items-center justify-center rounded-full glass ${className}`}
      style={{ width: SIZE, height: SIZE }}
    >
      <svg ref={ringRef} viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full">
        <defs>
          <path
            id={pathId}
            d={`M ${SIZE / 2}, ${SIZE / 2} m -${RADIUS}, 0 a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
        </defs>
        <text fill="#cbd5e1" fontSize={fontSize} letterSpacing="2" className="font-mono uppercase">
          <textPath href={`#${pathId}`} startOffset="0%">
            {label}
          </textPath>
        </text>
      </svg>

      <div className="flex flex-col items-center justify-center text-center px-4">
        <span className={`${centerTextSize} font-display font-bold text-white`}>{centerText}</span>
        <span
          className="text-[10px] font-mono text-slate-400 mt-1 leading-snug"
          style={{ maxWidth: labelMaxWidth }}
        >
          {centerLabel}
        </span>
      </div>
    </div>
  );
}
