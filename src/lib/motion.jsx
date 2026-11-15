import { useEffect, useRef, useState } from 'react';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Fades content up the first time it scrolls into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion() || !('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('in'); io.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>{children}</Tag>;
}

/** Counts up to `value` once visible. */
export function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(reducedMotion() ? value : 0);
  useEffect(() => {
    if (reducedMotion()) return;
    const el = ref.current;
    let frame;
    // Never leave a zero on screen if animation frames are throttled.
    const safety = setTimeout(() => setN(value), 2600);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now() + 500;
      const tick = now => {
        const t = Math.min(1, Math.max(0, (now - start) / 1100));
        setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); clearTimeout(safety); };
  }, [value]);
  return <b ref={ref}>{n}{suffix}</b>;
}

/** Letters gain weight as the pointer approaches them (variable font axis). */
export function WeightText({ lines }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion() || !finePointer()) return;
    const letters = [...root.querySelectorAll('.ch')];
    let frame = 0, x = -9999, y = -9999;
    const apply = () => {
      frame = 0;
      for (const el of letters) {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / 320);
        el.style.setProperty('--w', Math.round(520 + (k * k) * 330 - (1 - k) * 60));
      }
    };
    const move = e => { x = e.clientX; y = e.clientY; if (!frame) frame = requestAnimationFrame(apply); };
    const leave = () => { letters.forEach(el => el.style.removeProperty('--w')); };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => { window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave); cancelAnimationFrame(frame); };
  }, []);
  return <span ref={ref} aria-hidden="true">{lines.map((line, i) => <span className="line" key={line}><span style={{ '--d': `${0.15 + i * 0.12}s` }}>{[...line].map((c, j) => <span className="ch" key={j}>{c}</span>)}</span></span>)}</span>;
}

/** Subtle 3D tilt that follows the pointer. */
export function Tilt({ children, max = 5 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !finePointer()) return;
    const host = el.parentElement;
    const move = e => {
      const r = host.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--ry', `${px * max * 2}deg`);
      el.style.setProperty('--rx', `${-py * max * 2}deg`);
    };
    const leave = () => { el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg'); };
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave);
    return () => { host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); };
  }, [max]);
  return <div className="tilt" ref={ref}>{children}</div>;
}

/** Plays a muted looping video only while it is on screen. */
export function AutoVideo({ src, poster, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || reducedMotion()) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {}); else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />;
}

/** Tracks the pointer inside an element as CSS variables for a spotlight. */
export function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}
