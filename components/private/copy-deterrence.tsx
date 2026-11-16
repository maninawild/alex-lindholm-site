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

    element.addEventListener("selectstart", prevent);
    element.addEventListener("contextmenu", prevent);
    document.addEventListener("copy", prevent, true);
    document.addEventListener("cut", prevent, true);
    element.addEventListener("dragstart", prevent);
    document.addEventListener("keydown", preventShortcut, true);

    return () => {
      element.removeEventListener("selectstart", prevent);
      element.removeEventListener("contextmenu", prevent);
      document.removeEventListener("copy", prevent, true);
      document.removeEventListener("cut", prevent, true);
      element.removeEventListener("dragstart", prevent);
      document.removeEventListener("keydown", preventShortcut, true);
    };
  }, []);

  return (
    <div ref={containerRef} className="private-protected-content">
      {children}
    </div>
  );
}
