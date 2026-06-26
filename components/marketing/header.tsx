"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function PanelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M15 4v16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

type NavItem = { label: string; href: string; external?: boolean };

const navItems: NavItem[] = [
  { label: "Features", href: "/#features" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Pricing", href: "/#pricing" },
];

type MenuColumn = { heading: string; size: "lg" | "sm"; links: { label: string; href: string }[] };

const menus: Record<string, MenuColumn[]> = {
  Features: [
    {
      heading: "Core Features",
      size: "lg",
      links: [
        { label: "Showcase & Booking", href: "/#features" },
        { label: "Upfront Payments", href: "/#features" },
        { label: "Two-Way Sync", href: "/#features" },
      ],
    },
  ],
  Testimonials: [
    {
      heading: "Loved by professionals",
      size: "lg",
      links: [
        { label: "Designers & creators", href: "/#testimonials" },
        { label: "Coaches & trainers", href: "/#testimonials" },
        { label: "Consultants", href: "/#testimonials" },
      ],
    },
  ],
  Pricing: [
    {
      heading: "Pricing Plans",
      size: "lg",
      links: [
        { label: "Free Plan", href: "/#pricing" },
        { label: "Pro Plan", href: "/#pricing" },
        { label: "Max Plan", href: "/#pricing" },
      ],
    },
  ],
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [panelMenu, setPanelMenu] = useState<string>(navItems[0].label);
  const pathname = usePathname();

  const open = activeMenu !== null;
  const panelColumns = menus[panelMenu] ?? [];

  // Clicking the logo always scrolls to the very top. On the home page we stay
  // put and smooth-scroll instead of triggering a no-op navigation.
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openMenu = (label: string) => {
    setActiveMenu(label);
    setPanelMenu(label);
  };
  const closeMenu = () => setActiveMenu(null);

  return (
    <header
      className="sticky top-0 z-40 bg-white text-gray-900"
      onMouseLeave={closeMenu}
    >
      <div className="w-full pl-2 pr-6 flex py-0 items-center justify-between">
        <div className="flex h-full items-center gap-4">
          <Link href="/" onClick={handleLogoClick} className="flex items-center mr-4" aria-label="Loty">
            <Image
              src="/icon.svg"
              alt="Loty"
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
              priority
            />
          </Link>

          <nav className="hidden h-full items-center gap-6 md:flex">
            {navItems.map((item) => {
              const isThisActive = activeMenu === item.label;
              const isAnyActive = activeMenu !== null;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => openMenu(item.label)}
                  className={`inline-flex h-16 items-center gap-1 text-[14px] font-medium transition-colors duration-200 ease-out ${
                    isThisActive
                      ? "text-black"
                      : isAnyActive
                      ? "text-black/30 hover:text-black/70"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.external && <ArrowUpRight className="size-3.5 opacity-50" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center md:flex">
            <Link
              href="/login"
              className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-full bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
            >
              Get started
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-black transition-colors hover:bg-neutral-200 md:hidden"
          >
            <PanelIcon className="size-5" />
          </button>
        </div>
      </div>

      {/* Camada de Desfoque de Fundo */}
      <div
        aria-hidden="true"
        onMouseEnter={closeMenu}
        className={`fixed inset-x-0 bottom-0 top-16 z-20 hidden bg-black/5 backdrop-blur-md transition-opacity duration-300 ease-out md:block ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Painel Dropdown Mega Menu */}
      <div
        className={`fixed inset-x-0 top-16 z-30 hidden origin-top border-b border-gray-100 bg-white shadow-[0_16px_32px_-16px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out md:block ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="w-full pl-[104px] flex gap-24 pt-8 pb-14">
          {panelColumns.map((col) => (
            <div key={col.heading}>
              <p className="mb-5 text-[12px] font-semibold uppercase tracking-wider text-black/40">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={
                        col.size === "lg"
                          ? "block py-1 text-[26px] font-medium leading-tight text-black transition-colors hover:text-black/50 tracking-tight"
                          : "block py-1 text-base font-medium text-black transition-all hover:text-black/50"
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex h-dvh flex-col items-center justify-between bg-white px-0 pt-0 pb-10 overscroll-contain md:hidden"
        >
          {/* Top Bar - Logo on left, Close button on right */}
          <div className="w-full pl-2 pr-6 flex py-0 items-center justify-between">
            <Link
              href="/"
              onClick={(e) => {
                setMenuOpen(false);
                handleLogoClick(e);
              }}
              className="flex items-center"
              aria-label="Loty"
            >
              <Image
                src="/icon.svg"
                alt="Loty"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
                priority
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-black transition-colors hover:bg-neutral-200"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          {/* Navigation - Centered and stretched list */}
          <div className="w-full max-w-md flex flex-col justify-center my-auto px-6">
            <nav className="flex flex-col divide-y divide-gray-100">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-5 text-3xl font-medium tracking-tight text-gray-900 transition-colors hover:text-black/60"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="size-6 text-gray-400" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer CTA - Stretched Button */}
          <div className="w-full max-w-md pb-6 px-6 flex justify-center">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-black text-base font-medium text-white transition-colors hover:bg-neutral-900 shadow-sm"
            >
              Get started
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}