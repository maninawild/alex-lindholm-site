"use client";

import { useEffect, useRef } from "react";

/** Keep the final value readable without JavaScript and stable during counting. */
export function CountUp({ value }: { value: string }) {
  const container = useRef<HTMLSpanElement>(null);
  const display = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = container.current;
    const text = display.current;
    const match = /^(\d+)(.*)$/.exec(value);
    if (!element || !text || !match || !("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    let frame = 0;
    let started = false;
    let disposed = false;
    text.textContent = `0${suffix}`;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started || disposed) return;
      started = true;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        if (disposed) return;
        const progress = Math.min((now - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        text.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    const finish = () => {
      if (!motion.matches) return;
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      text.textContent = value;
    };
    motion.addEventListener("change", finish);
    observer.observe(element);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", finish);
      text.textContent = value;
    };
  }, [value]);

  return (
    <span ref={container} className="relative inline-block tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible">{value}</span>
      <span aria-hidden="true" ref={display} className="absolute inset-0">{value}</span>
    </span>
  );
}
