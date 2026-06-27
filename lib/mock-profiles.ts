import type { FreelancerData } from "@/components/marketing/freelancer-profile";

// Mock registry of claimed handles. Replace with a real data source later.
export const mockProfiles: Record<string, FreelancerData> = {
  josebarbosa: {
    name: "José Barbosa",
    handle: "josebarbosa",
    title: "Product Designer & Developer",
    bio: "I help startups and founders turn ideas into polished, shippable products — from design to working code.",
    location: "Lisbon, Portugal",
    rating: "5.0",
    responseTime: "Replies in ~1h",
    avatar: "/mascot.png",
    services: [
      {
        slug: "discovery-call",
        name: "Discovery call",
        duration: "20 min",
        description: "A free intro to talk through your idea and see if we're a fit.",
        price: "Free",
      },
      {
        slug: "product-design-audit",
        name: "Product design audit",
        duration: "60 min",
        description: "A live review of your product with prioritized, actionable fixes.",
        price: "€150",
      },
      {
        slug: "design-build-sprint",
        name: "Design & build sprint",
        duration: "90 min",
        description: "A hands-on working session — we design and ship a real feature together.",
        price: "€280",
      },
      {
        slug: "monthly-advisory",
        name: "Monthly advisory",
        duration: "4 × 45 min",
        description: "Ongoing design & engineering guidance with async support in between.",
        price: "€600 / mo",
      },
    ],
  },
};

export function getMockProfile(handle: string): FreelancerData | undefined {
  return mockProfiles[handle.toLowerCase()];
}

export function getMockService(handle: string, slug: string) {
  const profile = getMockProfile(handle);
  const service = profile?.services.find((s) => s.slug === slug.toLowerCase());
  if (!profile || !service) return undefined;
  return { profile, service };
}
