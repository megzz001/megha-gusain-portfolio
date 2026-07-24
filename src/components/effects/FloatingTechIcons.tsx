import { Code2 } from 'lucide-react';
import { SiReact, SiJavascript, SiHtml5, SiCss, SiPython, SiNodedotjs } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

interface FloatingIcon {
  icon: React.ReactNode;
  className: string;
  delay: string;
}

const ICONS: FloatingIcon[] = [
  { icon: <SiHtml5 />, className: 'top-[12%] left-[4%] text-5xl text-orange-500', delay: '0s' },
  { icon: <SiCss />, className: 'top-[28%] left-[13%] text-4xl text-blue-500', delay: '0.6s' },
  { icon: <SiJavascript />, className: 'top-[8%] right-[8%] text-4xl text-yellow-400', delay: '1.2s' },
  { icon: <SiReact />, className: 'top-[42%] right-[2%] text-5xl text-cyan-400', delay: '0.3s' },
  { icon: <FaJava />, className: 'bottom-[26%] left-[6%] text-5xl text-red-500', delay: '0.9s' },
  { icon: <Code2 />, className: 'bottom-[10%] left-[20%] text-4xl text-brand-accent', delay: '1.5s' },
  { icon: <SiPython />, className: 'bottom-[16%] right-[16%] text-5xl text-sky-400', delay: '0.4s' },
  { icon: <SiNodedotjs />, className: 'bottom-[4%] right-[6%] text-4xl text-emerald-500', delay: '1s' },
];

export default function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
      {ICONS.map((item, idx) => (
        <span
          key={idx}
          className={`absolute animate-float opacity-70 drop-shadow-[0_0_12px_rgba(99,102,241,0.25)] ${item.className}`}
          style={{ animationDelay: item.delay }}
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}
