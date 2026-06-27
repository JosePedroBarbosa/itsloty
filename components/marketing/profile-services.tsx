"use client";

import * as React from "react";
import Link from "next/link";
import type { Service } from "@/components/marketing/freelancer-profile";

const INITIAL = 3;

export default function ProfileServices({
  handle,
  services,
}: {
  handle: string;
  services: Service[];
}) {
  const [expanded, setExpanded] = React.useState(false);
  const visible = expanded ? services : services.slice(0, INITIAL);
  const remaining = services.length - INITIAL;

  return (
    <div className="mt-14">
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">Services</p>
      <div className="mt-2 divide-y divide-neutral-100">
        {visible.map((s) => (
          <Link
            key={s.name}
            href={`/${handle}/${s.slug}`}
            className="group flex items-center justify-between gap-6 py-5 transition-opacity hover:opacity-70"
          >
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="text-[15px] font-medium text-neutral-900">{s.name}</p>
                <span className="shrink-0 text-xs text-neutral-400">{s.duration}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-neutral-500">{s.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 text-neutral-900">
              <span className="text-[15px] font-medium">{s.price}</span>
              <svg
                className="size-4 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
        ))}

        {!expanded && remaining > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex w-full items-center justify-center gap-1 py-4 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            Show {remaining} more
            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
