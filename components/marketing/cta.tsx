"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameSchema, type NameFormData } from "@/lib/validations";
import { EASE } from "@/components/common/motion-primitives";

export default function CTA() {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: NameFormData) => {
    window.location.href = `/login?name=${encodeURIComponent(data.name)}`;
  };

  return (
    <section id="cta" className="w-full bg-white pt-20 pb-28 px-4 md:pt-28 md:pb-40 selection:bg-gray-100">
      <motion.div
        className="mx-auto w-full max-w-2xl text-center flex flex-col items-center"
        initial={{ opacity: 0, y: reduce ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {/* Centered Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <Image
            src="/mascot.png"
            alt="Loty Mascot"
            width={160}
            height={160}
            className="w-40 h-auto object-contain mb-6"
          />
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-medium font-rounded text-neutral-900 tracking-tight mb-4">
          Ready to claim your link?
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-neutral-500 mb-8 max-w-md leading-relaxed">
          Lock in your personal booking address today for free. Setup takes 30 seconds, no credit card required.
        </p>

        {/* Interactive Claim Input Box matching Hero */}
        <div className="flex flex-col items-center w-full max-w-[460px]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className={`group relative flex items-center justify-between gap-3 rounded-2xl border bg-white p-3 pl-5 pr-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05),0_12px_24px_-4px_rgba(0,0,0,0.02)] transition-all duration-200 ${
              mounted && errors.name
                ? "border-red-500 focus-within:border-red-500"
                : "border-neutral-200/80 focus-within:border-neutral-800 hover:border-neutral-300"
            }`}>
              <div className="flex items-center text-neutral-400 select-none text-sm sm:text-[15px] w-full font-medium">
                <span>itsloty.com/</span>
                <input
                  type="text"
                  placeholder="name"
                  {...register("name", {
                    onChange: (e) => {
                      e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "");
                    }
                  })}
                  className="ml-0.5 bg-transparent py-0.5 text-neutral-900 focus:outline-none placeholder-neutral-300 w-full min-w-0 font-medium font-sans"
                />
              </div>
              <button
                type="submit"
                disabled={!mounted || !isValid}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 text-white hover:bg-neutral-850 transition-colors cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Claim handle"
              >
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </form>
          {mounted && errors.name?.message && (
            <p className="mt-2 text-xs text-red-600 text-left w-full pl-4.5">
              {errors.name.message}
            </p>
          )}
        </div>

      </motion.div>
    </section>
  );
}
