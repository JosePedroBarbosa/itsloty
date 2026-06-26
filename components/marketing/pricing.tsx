"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/common/motion-primitives";

const Check = () => (
  <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-white py-20 px-4 md:py-28">
      <div className="mx-auto w-full max-w-5xl">

        {/* Heading */}
        <Reveal className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-medium font-rounded text-neutral-900 leading-tight">
            Start for free. Scale when you grow.
          </h2>
        </Reveal>

        {/* Top 3 cards */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-stretch">

          {/* Free */}
          <StaggerItem className="flex flex-col h-full border border-neutral-200 rounded-3xl p-8 transition-shadow duration-300 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
            <Image src="/mascot.png" alt="" width={64} height={64} className="h-16 w-auto self-start mb-4 object-contain" />
            <h3 className="text-3xl font-medium font-rounded text-neutral-900 mb-2">Free</h3>
            <p className="text-sm text-neutral-600 mb-4">For solo starters</p>
            <div className="mb-3 min-h-[3rem]">
              <span className="text-2xl font-semibold font-rounded text-neutral-900">$0</span>
            </div>
            <Link href="/login" className="flex h-10 w-full items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-50 text-sm font-medium text-neutral-900 transition-colors mb-6">
              Get started
            </Link>
            <ul className="flex-1 space-y-3">
              {[
                "Beautiful booking page",
                "Unlimited appointments",
                "0% platform booking fee",
                "Personalised URL link",
                "Client timezone adjustment",
                "Email notifications",
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                  <Check /><span>{f}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Pro */}
          <StaggerItem className="flex flex-col h-full border border-neutral-200 rounded-3xl p-8 transition-shadow duration-300 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
            <Image src="/mascot.png" alt="" width={64} height={64} className="h-16 w-auto self-start mb-4 object-contain" />
            <h3 className="text-3xl font-medium font-rounded text-neutral-900 mb-2">Pro</h3>
            <p className="text-sm text-neutral-600 mb-4">For pros & creators</p>
            <div className="mb-3 min-h-[3rem]">
              <span className="text-2xl font-semibold font-rounded text-neutral-900">$15</span>
              <span className="text-base font-normal text-neutral-900 ml-1">/ mo</span>
              {/*<p className="text-xs text-neutral-500 mt-1">
                or{" "}
                <Link href="/login?plan=pro&interval=year" className="underline">$150/yr</Link>
                {" "}billed annually
              </p>*/}
            </div>
            <Link href="/login?plan=pro" className="flex h-10 w-full items-center justify-center rounded-full bg-neutral-900 hover:bg-black text-sm font-medium text-white transition-colors mb-6">
              Get Pro
            </Link>
            <p className="text-sm font-medium text-neutral-900 mb-3">Everything in Free, plus:</p>
            <ul className="flex-1 space-y-3">
              {[
                "Accept upfront payments",
                "Stripe integration in 1 click",
                "Custom domain name",
                "Remove Loty branding",
                "Fixed & percentage deposits",
                "Automatic client invoices",
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                  <Check /><span>{f}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Team */}
          <StaggerItem className="flex flex-col h-full border border-neutral-200 rounded-3xl p-8 transition-shadow duration-300 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
            <Image src="/mascot.png" alt="" width={64} height={64} className="h-16 w-auto self-start mb-4 object-contain" />
            <h3 className="text-3xl font-medium font-rounded text-neutral-900 mb-2">Team</h3>
            <p className="text-sm text-neutral-600 mb-4">For agencies & teams</p>
            <div className="mb-3 min-h-[3rem]">
              <span className="text-2xl font-semibold font-rounded text-neutral-900">$49</span>
              <span className="text-base font-normal text-neutral-900 ml-1">/ mo</span>
              {/*<p className="text-xs text-neutral-500 mt-1">or $490/yr billed annually</p>*/}
            </div>
            <Link href="/login?plan=team" className="flex h-10 w-full items-center justify-center rounded-full bg-neutral-900 hover:bg-black text-sm font-medium text-white transition-colors mb-6">
              Get Team
            </Link>
            <p className="text-sm font-medium text-neutral-900 mb-3">Everything in Pro, plus:</p>
            <ul className="flex-1 space-y-3">
              {[
                "Round-robin scheduling",
                "Collective booking pages",
                "Advanced analytics dashboard",
                "Priority support",
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                  <Check /><span>{f}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>

        {/* Enterprise banner — wide card like Ollama's Team row */}
        {/*<div className="border border-neutral-200 rounded-3xl p-8 flex flex-col gap-8 md:flex-row md:items-start">
          <div className="flex flex-col md:w-1/3">
            <Image src="/mascot.png" alt="" width={96} height={96} className="h-24 w-auto self-start mb-4 object-contain" />
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-medium font-rounded text-neutral-900">Enterprise</h3>
              <span className="inline-flex items-center whitespace-nowrap rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                Coming soon
              </span>
            </div>
            <p className="text-sm text-neutral-600 mb-6">Power your whole organisation with Loty</p>
            <Link href="mailto:hello@itsloty.com" className="flex h-10 w-full md:max-w-[calc(100%-2rem)] items-center justify-center rounded-full bg-neutral-900 hover:bg-black text-sm font-medium text-white transition-colors">
              Contact us
            </Link>
          </div>
          <div className="flex-1 border-t border-neutral-200 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="text-sm font-medium text-neutral-900 mb-3">What's included:</p>
            <ul className="space-y-3">
              {[
                "Shared usage across your team",
                "Centralised billing and administration",
                "Single sign-on (SSO)",
                "Custom permissions and access controls",
                "Dedicated account manager",
                "Priority support and SLA",
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                  <Check /><span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>*/}

      </div>
    </section>
  );
}