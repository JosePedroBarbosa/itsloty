"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden border-t border-neutral-100 bg-white text-neutral-900">
      <div className="mx-auto w-full max-w-5xl px-6 flex flex-col items-center pt-20 md:pt-28 pb-8">
        <p
          className="block w-full select-none whitespace-nowrap text-center font-medium font-rounded leading-none tracking-tighter text-neutral-900/90"
          style={{ fontSize: "clamp(3.5rem, 14vw, 13rem)" }}
        >
          itsloty.com
        </p>
        <div className="mt-10 flex w-full flex-row items-center justify-between text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Loty. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="underline underline-offset-4 decoration-neutral-200 transition-colors hover:text-neutral-900">
              Terms
            </Link>
            <Link href="/privacy" className="underline underline-offset-4 decoration-neutral-200 transition-colors hover:text-neutral-900">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}