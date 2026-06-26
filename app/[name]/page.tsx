import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/marketing/header";
import ClaimProfile from "@/components/marketing/claim-profile";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const isValid = /^[a-z0-9_-]+$/.test(name) && name.length >= 1 && name.length <= 30;
  if (!isValid) return {};
  const formattedName = name
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return {
    title: `itsloty.com/${name} is available!`,
    description: `Claim the handle ${formattedName} on Loty and build your public booking page in seconds.`,
  };
}

export default async function NamePage({ params }: PageProps) {
  const { name } = await params;
  const isValid = /^[a-z0-9_-]+$/.test(name) && name.length >= 1 && name.length <= 30;
  const reservedWords = ["login", "terms", "privacy", "api", "dashboard", "settings", "pricing", "features"];
  if (!isValid || reservedWords.includes(name.toLowerCase())) notFound();

  const claimUrl = `/login?name=${encodeURIComponent(name)}`;
  const formattedName = name
    .split(/[-_]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <>
      <Header />
      <ClaimProfile name={name} formattedName={formattedName} claimUrl={claimUrl} />
    </>
  );
}
