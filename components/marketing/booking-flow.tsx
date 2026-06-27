"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeftIcon, ClockIcon, VideoIcon, GlobeIcon, CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import type { FreelancerData, Service } from "@/components/marketing/freelancer-profile";

const EASE = [0.22, 1, 0.36, 1] as const;

// Mock availability — every 30 min from 09:00 to 17:00.
function buildSlots(): string[] {
  const slots: string[] = [];
  for (let h = 9; h < 17; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

export default function BookingFlow({
  profile,
  service,
}: {
  profile: FreelancerData;
  service: Service;
}) {
  const reduce = useReducedMotion();
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const router = useRouter();
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const slots = React.useMemo(buildSlots, []);

  const goToConfirm = (slot: string) => {
    if (!date) return;
    const iso = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
    const params = new URLSearchParams({ date: iso, time: slot });
    router.push(`/${profile.handle}/${service.slug}/confirm?${params.toString()}`);
  };

  const longDate = date
    ? date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : null;

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white px-4 selection:bg-gray-100">
      <div className="flex flex-1 items-center justify-center py-10">
      <motion.div
        className="w-full max-w-4xl overflow-hidden rounded-3xl border border-neutral-100 bg-white"
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="flex flex-col md:flex-row md:divide-x md:divide-neutral-100">
          {/* Service summary */}
          <aside className="shrink-0 p-6 md:w-72 md:p-7">
            <Link
              href={`/${profile.handle}`}
              className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-50"
              aria-label="Back to profile"
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
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{service.description}</p>

            <ul className="mt-5 space-y-2.5 text-sm text-neutral-600">
              <li className="flex items-center gap-2.5">
                <ClockIcon className="size-4 text-neutral-400" />
                {service.duration}
              </li>
              <li className="flex items-center gap-2.5">
                <VideoIcon className="size-4 text-neutral-400" />
                Video call (Google Meet)
              </li>
              <li className="flex items-center gap-2.5">
                <GlobeIcon className="size-4 text-neutral-400" />
                Europe/Lisbon
              </li>
              <li className="flex items-center gap-2.5 font-medium text-neutral-900">
                <CalendarIcon className="size-4 text-neutral-400" />
                {service.price}
              </li>
            </ul>
          </aside>

          {/* Calendar */}
          <div className="flex justify-center border-t border-neutral-100 p-4 md:border-t-0 md:p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              startMonth={today}
              disabled={[{ before: today }, { dayOfWeek: [0, 6] }]}
              className="[--cell-size:2.6rem] p-0"
            />
          </div>

          {/* Time slots */}
          <div className="flex w-full flex-col border-t border-neutral-100 p-6 md:w-64 md:border-t-0">
            {date ? (
              <>
                <p className="mb-4 text-sm font-medium text-neutral-900">{longDate}</p>
                <div className="-mr-2 flex max-h-[21rem] flex-col gap-2 overflow-y-auto pr-2">
                  {slots.map((slot, i) => (
                    <motion.button
                      key={slot}
                      type="button"
                      onClick={() => goToConfirm(slot)}
                      initial={{ opacity: 0, y: reduce ? 0 : 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: reduce ? 0 : i * 0.015, ease: EASE }}
                      className="h-11 shrink-0 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                    >
                      {slot}
                    </motion.button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                <CalendarIcon className="size-6 text-neutral-300" />
                <p className="mt-3 text-sm text-neutral-400">Select a day to see available times.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      </div>

      <footer className="pb-6 text-center">
        <p className="text-xs text-neutral-400">Powered by Itsloty.com</p>
      </footer>
    </div>
  );
}
