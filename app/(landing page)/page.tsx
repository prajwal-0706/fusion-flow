import React from "react";

import Navbar from "./_components/navbar";
import { cn } from "@/lib/utils";
import FeatureGradient from "./_components/feature-gradient";
import FeatureSection from "./_components/feature-section";
import PricingSection from "./_components/pricing-section";
import TestimonialsSection from "./_components/testimonials-section";
import FAQSection from "./_components/faq-section";
import CTASection from "./_components/cta-section";
import Footer from "./_components/footer";
import HeroSection from "./_components/hero-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen gap-4 selection:bg-primary selection:text-white dark bg-[#0C0A09]">
      <Navbar />
      <div className="relative flex flex-col items-center justify-center bg-[#0C0A09]">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0C0A09] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-64 h-64 rounded-full opacity-20",
                "bg-gradient-to-br from-primary/30 to-transparent",
                "animate-[float_8s_ease-in-out_infinite]",
                i % 2 === 0 ? "animate-delay-0" : "animate-delay-1000"
              )}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        <SectionWrapper className="min-h-[calc(100vh-64px)] md:h-[100dvh] text-center relative z-20">
          <HeroSection />
        </SectionWrapper>
        <SectionWrapper
          id="howItWorks"
          primaryTitle="How"
          secondaryTitle="It Works"
          className="py-20 mt-10 font-bold relative z-20"
        >
          <FeatureGradient />
        </SectionWrapper>
        <SectionWrapper
          id="scrapingFeatures"
          primaryTitle="Scraping"
          secondaryTitle="Features"
          className="min-w-full relative z-20 font-bold"
        >
          <FeatureSection />
        </SectionWrapper>
        <SectionWrapper
          id="pricing"
          primaryTitle="Pricing"
          secondaryTitle="Plans"
          className="min-w-full relative z-20 font-bold"
        >
          <PricingSection />
        </SectionWrapper>
        <SectionWrapper
          id="testimonials"
          primaryTitle="What Our"
          secondaryTitle="Customers Say"
          className=" relative z-20 font-bold"
        >
          <TestimonialsSection />
        </SectionWrapper>
        <SectionWrapper
          id="faq"
          primaryTitle="Frequently Asked"
          secondaryTitle="Questions"
          className="min-w-full relative z-20 font-bold"
        >
          <FAQSection />
        </SectionWrapper>
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

function SectionWrapper({
  children,
  className,
  id,
  primaryTitle,
  secondaryTitle,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  primaryTitle?: string;
  secondaryTitle?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-10 box-border max-w-screen-xl mx-auto scroll-mt-[80px] p-5 md:p-10",
        className
      )}
      id={id}
    >
      <div className="text-2xl md:text-4xl lg:text-6xl text-foreground group">
        <span className="bg-gradient-to-b from-primary via-primary/80 to-primary/50 text-transparent bg-clip-text group-hover:to-white/90 transition-all duration-500">
          {primaryTitle}
        </span>
        &nbsp;
        <span className="bg-gradient-to-b from-white via-white/90 to-white/70 text-transparent bg-clip-text group-hover:to-primary/90 transition-all duration-500">
          {secondaryTitle}
        </span>
      </div>
      {children}
    </section>
  );
}
