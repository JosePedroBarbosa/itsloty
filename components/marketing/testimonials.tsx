"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/common/motion-primitives";

const testimonials = [
  {
    text: "I used to spend hours every week going back and forth with clients just to schedule a call. Loty cut that to zero.",
    name: "Sara M.",
    role: "Freelance Designer",
    avatar: "SM",
  },
  {
    text: "Collecting payments upfront changed everything for me. No more no-shows. No more chasing invoices. I just send my link and get paid.",
    name: "João R.",
    role: "Personal Trainer",
    avatar: "JR",
  },
  {
    text: "The timezone handling alone is worth it. I work with clients across 4 continents and Loty just figures it out.",
    name: "Priya K.",
    role: "Life Coach",
    avatar: "PK",
  },
  {
    text: "I set up my booking page in about 15 minutes. Clients always comment on how smooth the booking experience is.",
    name: "Tom W.",
    role: "Videographer",
    avatar: "TW",
  },
  {
    text: "The deposit feature is a game changer. My no-show rate dropped by 80%. Clients are so much more committed when they've paid upfront.",
    name: "Léa B.",
    role: "Nutritionist",
    avatar: "LB",
  },
  {
    text: "I removed the Loty branding and connected my own domain. My clients think I built a custom booking system.",
    name: "Carlos F.",
    role: "Business Consultant",
    avatar: "CF",
  },
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600 flex-shrink-0">
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full bg-white py-20 px-4 md:py-28">
      <div className="mx-auto w-full max-w-5xl">

        {/* Heading — matches the other sections */}
        <Reveal className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-medium font-rounded text-neutral-900 leading-tight">
            What people are saying
          </h2>
        </Reveal>

        {/* Grid */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch" stagger={0.06}>
          {testimonials.map((t) => (
            <StaggerItem
              key={t.name}
              className="h-full rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col justify-between gap-6 transition-shadow duration-300 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
            >
              <p className="text-sm text-neutral-700 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar initials={t.avatar} />
                <div>
                  <p className="text-sm font-medium text-neutral-900">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

      </div>
    </section>
  );
}