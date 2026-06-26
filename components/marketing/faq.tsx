"use client";

import { useState } from "react";
import { Reveal } from "@/components/common/motion-primitives";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "Are there any setup fees or booking commissions?",
    answer: "No. Loty has a 0% platform booking fee. Standard credit card processing fees apply when accepting client payments through Stripe, but we never take a commission from your bookings.",
  },
  {
    question: "Which calendar integrations do you support?",
    answer: "Loty syncs with Google Calendar, Microsoft Outlook, and Apple iCloud Calendar. It checks your real-time availability so clients can never double-book you.",
  },
  {
    question: "Can I connect my own custom domain?",
    answer: "Yes! With our Pro and Team plans, you can connect your custom domain (e.g. booking.yourname.com) and white-label your scheduling profile.",
  },
  {
    question: "Do my clients need a Loty account to book me?",
    answer: "No. Your clients can choose slots and pay booking fees directly on your public link without signing up for anything.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-white py-20 px-4 md:py-28 selection:bg-gray-100">
      <div className="mx-auto w-full max-w-2xl">
        
        {/* Centered Heading */}
        <Reveal className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-medium font-rounded text-neutral-900 leading-tight">
            Frequently asked questions
          </h2>
        </Reveal>

        {/* Collapsible Accordion List */}
        <Reveal className="flex flex-col divide-y divide-neutral-100 border-t border-b border-neutral-100" delay={0.1}>
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className="py-4 sm:py-5">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-4 text-left font-medium font-rounded text-neutral-900 hover:text-neutral-950 focus:outline-none transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{item.question}</span>
                  <span className={`shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`}>
                    <svg className="size-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>

                {/* Collapsible Content wrapper */}
                <div
                  className={`grid transition-all duration-250 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-3 sm:mt-4" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed pl-1 pr-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

      </div>
    </section>
  );
}
