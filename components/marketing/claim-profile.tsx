"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  { name: "30-min intro call", duration: "30 min", price: "Free" },
  { name: "Strategy session", duration: "60 min", price: "$120" },
];

export default function ClaimProfile({
  name,
  formattedName,
  claimUrl,
}: {
  name: string;
  formattedName: string;
  claimUrl: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-white px-4 py-12 selection:bg-gray-100">
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Ghost profile preview — blurred underneath */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 opacity-60 blur-[2px] pointer-events-none select-none">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-neutral-100">
              <Image src="/mascot.png" alt="" width={80} height={80} className="h-full w-full object-cover" />
            </div>
            <h2 className="mt-4 text-xl font-medium font-rounded text-neutral-900">{formattedName}</h2>
            <p className="text-sm text-neutral-500">itsloty.com/{name}</p>
          </div>

          <div className="mt-8 space-y-3">
            {services.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-2xl border border-neutral-100 bg-neutral-50 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">{s.name}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">{s.duration}</p>
                </div>
                <span className="text-sm font-medium text-neutral-900">{s.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Simple claim overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3.5 py-1 text-xs font-medium text-neutral-600 backdrop-blur-sm"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          >
            itsloty.com/{name} is available
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36, ease: EASE }}
          >
            <Link
              href={claimUrl}
              className="group mt-6 inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-black px-7 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-800"
            >
              Claim {name} for free
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
