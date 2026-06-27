import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingFlow from "@/components/marketing/booking-flow";
import { getMockService } from "@/lib/mock-profiles";

interface PageProps {
  params: Promise<{ name: string; service: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name, service } = await params;
  const match = getMockService(name, service);
  if (!match) return {};
  return {
    title: `Book ${match.service.name} with ${match.profile.name} · Loty`,
    description: match.service.description,
  };
}

export default async function BookingPage({ params }: PageProps) {
  const { name, service } = await params;
  const match = getMockService(name, service);
  if (!match) notFound();

  return <BookingFlow profile={match.profile} service={match.service} />;
}
