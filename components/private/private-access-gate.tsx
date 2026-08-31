"use client";

import { useActionState } from "react";
import Link from "next/link";
import { unlockPrivatePage, type PrivateAccessState } from "@/app/private/actions";

const initialState: PrivateAccessState = { error: null };

type PrivateAccessGateProps = {
  pageSlug: string;
  returnPath?: string;
};

export function PrivateAccessGate({ pageSlug, returnPath }: PrivateAccessGateProps) {
  const [state, formAction, pending] = useActionState(unlockPrivatePage, initialState);

  return (
    <main className="relative flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden bg-[#0d1117] px-5 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(143,63,77,0.34),transparent_36%),radial-gradient(circle_at_85%_80%,rgba(37,99,235,0.2),transparent_34%)]" />
      <section className="relative w-full max-w-md rounded-sm border border-white/12 bg-white/[0.055] p-7 shadow-[0_32px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-9" aria-labelledby="private-access-title">
        <Link href="/" className="text-sm font-semibold tracking-[-0.01em] text-white/78 transition hover:text-white">
          Alex Lindholm
        </Link>
        <h1 id="private-access-title" className="mt-12 font-serif text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-balance sm:text-5xl">
          Personal access required
        </h1>
        <p className="mt-5 text-base leading-7 text-white/66">
          This unlisted area is shared directly with selected collaborators and community partners.
        </p>

        <form action={formAction} className="mt-9">
          <input type="hidden" name="page" value={pageSlug} />
          {returnPath ? <input type="hidden" name="returnPath" value={returnPath} /> : null}
          <label htmlFor="access-code" className="text-sm font-semibold text-white/84">
            Access code
          </label>
          <input
            id="access-code"
            name="accessCode"
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            aria-describedby={state.error ? "access-error" : "access-help"}
            className="mt-2 min-h-12 w-full rounded-md border border-white/18 bg-black/20 px-4 text-base text-white outline-none transition placeholder:text-white/26 focus:border-white/55 focus:ring-2 focus:ring-white/12"
            placeholder="Enter the code shared with you"
          />
          <p id="access-help" className="mt-2 text-xs leading-5 text-white/42">
            Codes are case-sensitive. Your session will remain active for seven days.
          </p>
          {state.error ? (
            <p id="access-error" role="alert" className="mt-3 rounded-md border border-red-300/20 bg-red-300/10 px-3 py-2 text-sm leading-5 text-red-100">
              {state.error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-[#10131a] transition hover:bg-white/90 disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? "Verifying…" : "Continue securely"}
          </button>
        </form>

        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="text-xs leading-5 text-white/46">No access code yet?</p>
          <a
            href="https://wa.me/message/4OIGQ3FHUZQSD1"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#25D366]/35 bg-[#25D366]/10 px-4 text-sm font-semibold text-[#8ff0b2] transition hover:border-[#25D366]/65 hover:bg-[#25D366]/18"
          >
            Contact Alex on WhatsApp to request access
          </a>
        </div>
      </section>
    </main>
  );
}
