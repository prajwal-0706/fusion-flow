import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { TYPEWRITER_WORDS } from "@/lib/constants";
import { ChevronRightIcon, GlobeIcon, Zap, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-full gap-8 md:gap-6 mt-5 md:-mt-20">
      {/* Animated background elements */}
      <div className="absolute top-0 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-70 animate-pulse delay-1000"></div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Main heading */}
        <TypewriterEffectSmooth
          className="text-3xl md:text-4xl lg:text-6xl font-bold"
          cursorClassName="bg-primary"
          words={TYPEWRITER_WORDS}
        />

        {/* Subtitle */}
        <p className="text-muted-foreground text-sm md:text-base lg:text-xl max-w-2xl mx-auto -mt-4 md:-mt-6">
          Create, automate, and scale your web scraping projects with ease. No
          coding required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-2">
          <Button
            className="w-52 h-12 rounded-xl text-base border-primary text-primary hover:text-white hover:bg-primary/30 group flex items-center justify-center relative overflow-hidden"
            variant={"outline"}
          >
            <Link
              href={"/sign-in"}
              className="flex items-center justify-center relative z-10"
            >
              Get Started
              <ChevronRightIcon className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <Button
            className="w-52 h-12 rounded-xl text-base bg-primary/10 text-primary hover:bg-primary/20 group flex items-center justify-center relative overflow-hidden"
            variant={"ghost"}
          >
            <Link
              href={"#howItWorks"}
              className="flex items-center justify-center relative z-10"
            >
              Learn More
            </Link>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>

        {/* Free credits text */}
        <p className="text-sm md:text-base text-primary relative mt-2">
          <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
          New users get 200 credits for free upon first login
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto w-full px-4 md:px-0 mt-4">
          <div className="bg-black/40 backdrop-blur-sm border border-primary/20 p-4 md:p-6 rounded-xl group hover:bg-black/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110">
                <GlobeIcon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm md:text-base font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                  No-Code Interface
                </p>
                <p className="text-xs md:text-sm text-gray-200">
                  Build complex workflows visually
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-primary/20 p-4 md:p-6 rounded-xl group hover:bg-black/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm md:text-base font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                  Lightning Fast
                </p>
                <p className="text-xs md:text-sm text-gray-200">
                  Extract data at scale
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-primary/20 p-4 md:p-6 rounded-xl group hover:bg-black/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm md:text-base font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                  Secure & Reliable
                </p>
                <p className="text-xs md:text-sm text-gray-200">
                  Enterprise-grade platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
