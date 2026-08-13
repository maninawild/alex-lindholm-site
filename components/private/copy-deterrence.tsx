"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function CopyDeterrence({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const prevent = (event: Event) => event.preventDefault();
    const preventShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && ["c", "x"].includes(event.key.toLowerCase())) {
        event.preventDefault();
      }
    };

    element.addEventListener("contextmenu", prevent);
    element.addEventListener("copy", prevent);
    element.addEventListener("cut", prevent);
    element.addEventListener("dragstart", prevent);
    element.addEventListener("keydown", preventShortcut);

    return () => {
      element.removeEventListener("contextmenu", prevent);
      element.removeEventListener("copy", prevent);
      element.removeEventListener("cut", prevent);
      element.removeEventListener("dragstart", prevent);
      element.removeEventListener("keydown", preventShortcut);
    };
  }, []);

  return (
    <div ref={containerRef} className="private-protected-content">
      {children}
    </div>
  );
}
