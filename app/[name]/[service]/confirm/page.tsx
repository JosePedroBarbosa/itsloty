import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingConfirm from "@/components/marketing/booking-confirm";
import { getMockService } from "@/lib/mock-profiles";

interface PageProps {
  params: Promise<{ name: string; service: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name, service } = await params;
  const match = getMockService(name, service);
  if (!match) return {};
  return {
    title: `Confirm booking · ${match.service.name} with ${match.profile.name}`,
    description: match.service.description,
  };
}

export default async function ConfirmPage({ params, searchParams }: PageProps) {
  const { name, service } = await params;
  const { date, time } = await searchParams;
  const match = getMockService(name, service);
  if (!match) notFound();

  return (
    <BookingConfirm
      profile={match.profile}
      service={match.service}
      date={date ?? null}
      time={time ?? null}
    />
  );
}
