"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, VideoIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { bookingSchema, type BookingFormData } from "@/lib/validations";
import type { FreelancerData, Service } from "@/components/marketing/freelancer-profile";

const EASE = [0.22, 1, 0.36, 1] as const;

function formatDate(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <span className="text-sm font-medium text-neutral-800">
        {label}
        {hint && <span className="ml-1 font-normal text-neutral-400">{hint}</span>}
      </span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}

export default function BookingConfirm({
  profile,
  service,
  date,
  time,
}: {
  profile: FreelancerData;
  service: Service;
  date: string | null;
  time: string | null;
}) {
  const reduce = useReducedMotion();
  const isFree = service.price.toLowerCase().includes("free");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    defaultValues: { fullName: "", email: "", phone: "", notes: "" },
  });

  const onSubmit = (data: BookingFormData) => {
    // TODO: create the booking, then redirect free bookings to a success page
    // or paid ones to a Stripe checkout session.
    console.log("booking", { ...data, service: service.slug, date, time });
  };

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white px-4 selection:bg-gray-100">
      <div className="flex flex-1 items-start justify-center py-10 sm:items-center">
        <motion.div
          className="w-full max-w-4xl overflow-hidden rounded-3xl border border-neutral-100 bg-white"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="flex flex-col md:flex-row md:divide-x md:divide-neutral-100">
            {/* Summary */}
            <aside className="shrink-0 p-6 md:w-72 md:p-7">
              <Link
                href={`/${profile.handle}/${service.slug}`}
                className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-50"
                aria-label="Back"
              >
                <ArrowLeftIcon className="size-4" />
              </Link>

              <div className="mt-5 flex items-center gap-2.5">
                <div className="size-9 overflow-hidden rounded-full bg-neutral-100">
                  <Image src={profile.avatar} alt={profile.name} width={36} height={36} className="size-full object-cover" />
                </div>
                <span className="text-sm font-medium text-neutral-500">{profile.name}</span>
              </div>

              <h1 className="mt-3 text-xl font-medium font-rounded tracking-tight text-neutral-900">
                {service.name}
              </h1>

              <ul className="mt-5 space-y-2.5 text-sm text-neutral-600">
                <li className="flex items-center gap-2.5">
                  <CalendarIcon className="size-4 text-neutral-400" />
                  {formatDate(date)}
                </li>
                <li className="flex items-center gap-2.5">
                  <ClockIcon className="size-4 text-neutral-400" />
                  {time ?? "—"} · {service.duration}
                </li>
                <li className="flex items-center gap-2.5">
                  <VideoIcon className="size-4 text-neutral-400" />
                  Video call (Google Meet)
                </li>
              </ul>
            </aside>

            {/* Details form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 border-t border-neutral-100 p-6 md:border-t-0 md:p-7">
              <div className="grid gap-4">
                <Field label="Full name" error={errors.fullName?.message}>
                  <Input placeholder="Jane Doe" {...register("fullName")} />
                </Field>

                <Field label="Email" error={errors.email?.message}>
                  <Input type="email" placeholder="jane@example.com" {...register("email")} />
                </Field>

                <Field label="Phone" hint="(optional)" error={errors.phone?.message}>
                  <Input type="tel" placeholder="+351 900 000 000" {...register("phone")} />
                </Field>

                <Field label="Notes" hint="(optional)" error={errors.notes?.message}>
                  <Textarea
                    rows={3}
                    placeholder="Share anything that will help prepare for the session."
                    className="resize-none"
                    {...register("notes")}
                  />
                </Field>
              </div>

              {/* Payment */}
              <div className="mt-6 border-t border-neutral-100 pt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Total</span>
                  <span className="font-medium text-neutral-900">{service.price}</span>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={cn(
                    "mt-4 flex h-12 w-full items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white transition-colors hover:bg-neutral-800",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  {isFree ? "Confirm booking" : `Pay ${service.price}`}
                </button>

                {!isFree && (
                  <p className="mt-2 text-center text-xs text-neutral-400">
                    You&apos;ll be redirected to a secure Stripe checkout.
                  </p>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <footer className="pb-6 text-center">
        <p className="text-xs text-neutral-400">Powered by Itsloty.com</p>
      </footer>
    </div>
  );
}
