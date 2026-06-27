"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

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
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-white px-4 py-12 text-center selection:bg-gray-100">
      <section className="-mt-8 flex w-full max-w-xl flex-col items-center">
        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.8, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Image
            src="/mascot-available.png"
            alt="Loty Mascot"
            width={288}
            height={288}
            className="mb-8 h-56 w-auto object-contain"
            priority
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="mt-5 max-w-md text-[32px] font-medium font-rounded leading-[1.15] tracking-tight text-neutral-900 sm:text-[40px]"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
        >
          <span className="italic text-neutral-950">{formattedName}</span> is available
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500 sm:text-base"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
        >
          Claim this handle and turn it into your own booking page in seconds.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          <Link
            href={claimUrl}
            className="group mt-8 inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-black px-7 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-800"
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
      </section>
    </div>
  );
}
