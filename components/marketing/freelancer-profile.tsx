import Image from "next/image";
import { BadgeCheckIcon } from "lucide-react";
import ProfileServices from "@/components/marketing/profile-services";

export type Service = {
  slug: string;
  name: string;
  duration: string;
  description: string;
  price: string;
};

export type FreelancerData = {
  name: string;
  handle: string;
  title: string;
  bio: string;
  location: string;
  rating: string;
  responseTime: string;
  avatar: string;
  services: Service[];
};

/** Placeholder profile used for the public preview while a handle is unclaimed. */
export function sampleFreelancer(name: string, handle: string): FreelancerData {
  return {
    name,
    handle,
    title: "Product Designer",
    bio: "Freelance product designer helping startups ship beautiful, usable interfaces.",
    location: "Lisbon, Portugal",
    rating: "4.9",
    responseTime: "Replies in ~1h",
    avatar: "/mascot.png",
    services: [
      {
        slug: "intro-call",
        name: "Intro call",
        duration: "30 min",
        description: "A quick chat to see if we're a good fit.",
        price: "Free",
      },
      {
        slug: "design-consultation",
        name: "Design consultation",
        duration: "60 min",
        description: "A focused audit of your product with clear next steps.",
        price: "€120",
      },
      {
        slug: "design-sprint",
        name: "Design sprint",
        duration: "90 min",
        description: "A deep working session on your key user flows.",
        price: "€200",
      },
    ],
  };
}

function VerifiedBadge() {
  return (
    <BadgeCheckIcon className="size-[18px] fill-neutral-900 text-white" aria-hidden="true" />
  );
}

function Star() {
  return (
    <svg className="size-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.05.31a1 1 0 011.9 0l1.9 5.86h6.16a1 1 0 01.59 1.81l-4.99 3.62 1.91 5.86a1 1 0 01-1.54 1.12L10 14.97l-4.98 3.62a1 1 0 01-1.54-1.12l1.9-5.86L.4 7.98a1 1 0 01.59-1.81h6.16L9.05.31z" />
    </svg>
  );
}

export default function FreelancerProfile({ data }: { data: FreelancerData }) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <div className="mx-auto w-full max-w-xl flex-1 px-5 py-16 sm:py-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="size-24 overflow-hidden rounded-full bg-neutral-100">
          <Image src={data.avatar} alt={data.name} width={96} height={96} className="size-full object-cover" />
        </div>

        <div className="mt-5 flex items-center gap-1.5">
          <h1 className="text-2xl font-medium font-rounded tracking-tight text-neutral-900">{data.name}</h1>
          <VerifiedBadge />
        </div>
        <p className="mt-0.5 text-sm text-neutral-500">{data.title}</p>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">{data.bio}</p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <svg className="size-3.5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {data.location}
          </span>
          <span className="text-neutral-300">·</span>
          <span className="flex items-center gap-1">
            <Star />
            {data.rating}
          </span>
          <span className="text-neutral-300">·</span>
          <span>{data.responseTime}</span>
        </div>
      </div>

        {/* Services */}
        <ProfileServices handle={data.handle} services={data.services} />
      </div>

      {/* Footer pinned to the bottom of the page */}
      <footer className="px-5 py-8 text-center">
        <p className="text-xs text-neutral-400">Powered by Itsloty.com</p>
      </footer>
    </div>
  );
}
