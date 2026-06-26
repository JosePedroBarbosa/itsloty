import Header from "@/components/marketing/header";
import Hero from "@/components/marketing/hero";
import Features from "@/components/marketing/features";
import Pricing from "@/components/marketing/pricing";
import FAQ from "@/components/marketing/faq";
import CTA from "@/components/marketing/cta";
import Footer from "@/components/marketing/footer";
import Testimonials from "@/components/marketing/testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}