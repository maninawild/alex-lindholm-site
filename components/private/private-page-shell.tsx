import type { ReactNode } from "react";
import { CopyDeterrence } from "./copy-deterrence";

export function PrivatePageShell({ children }: { children: ReactNode }) {
  return (
    <CopyDeterrence>
      <div className="relative min-h-screen overflow-hidden bg-paper text-ink">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 grid grid-cols-2 content-around gap-y-28 overflow-hidden px-2 opacity-[0.032] sm:grid-cols-3">
          {Array.from({ length: 24 }, (_, index) => (
            <span key={index} className="-rotate-12 whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink">
              Confidential · Alex Lindholm © 2026
            </span>
          ))}
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </CopyDeterrence>
  );
}
