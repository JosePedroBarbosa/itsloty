"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/common/motion-primitives";

type Feature = {
  src: string;
  alt: string;
  title: string;
  description: string;
  points: string[];
  priority?: boolean;
};

const features: Feature[] = [
  {
    src: "/feature.png",
    alt: "Booking showcase mascot",
    title: "Your booking page in minutes",
    description:
      "A clean, professional digital profile. Showcase your portfolio, list your services, and receive direct bookings without back-and-forth emails.",
    points: [
      "Personalised URL link (itsloty.com/name)",
      "List unlimited services and booking slots",
      "Automatic client-friendly timezone adjustment",
    ],
    priority: true,
  },
  {
    src: "/feature2.png",
    alt: "Customizable schedules mascot",
    title: "Customizable schedules",
    description:
      "Define your working hours, set automatic buffer times between appointments, and block dates on the fly. Let clients book from your real-time availability.",
    points: [
      "Set weekly working hours and timezone rules",
      "Add automatic buffer times between meetings",
      "Sync personal calendar events to block busy slots",
    ],
  },
  {
    src: "/feature3.png",
    alt: "Secure upfront payments mascot",
    title: "Secure Upfront Payments",
    description:
      "Eliminate no-shows by collecting full payments or deposits before confirming any booking. Connect Stripe in one click to activate direct deposits.",
    points: [
      "1-click onboarding with Stripe Integration",
      "Fixed amounts or percentage deposits",
      "Automatic client invoices and direct banking payouts",
    ],
  },
];

function Check() {
  return (
    <svg className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="w-full bg-white py-20 px-4 md:py-28 selection:bg-gray-100">
      <div className="mx-auto w-full max-w-5xl">
        {/* Alternating Features List */}
        <div className="flex flex-col gap-24 md:gap-32">
          {features.map((feature, index) => {
            const imageLeft = index % 2 === 0;
            return (
              <div
                key={feature.title}
                className={`flex flex-col items-center gap-12 md:gap-20 ${
                  imageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <motion.div
                  className="flex-1 w-full"
                  initial={{ opacity: 0, x: reduce ? 0 : imageLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <Image
                    src={feature.src}
                    alt={feature.alt}
                    width={600}
                    height={480}
                    className="w-full h-auto object-contain"
                    priority={feature.priority}
                  />
                </motion.div>

                <motion.div
                  className="flex-1 max-w-lg"
                  initial={{ opacity: 0, y: reduce ? 0 : 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                >
                  <h3 className="text-2xl sm:text-3xl font-medium font-rounded text-neutral-900 mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.points.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                        <Check />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
