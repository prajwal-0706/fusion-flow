import React from "react";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import Navbar from "./_components/navbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { TYPEWRITER_WORDS } from "@/lib/constants";

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

        <SectionWrapper className="h-[50rem] text-center -mt-[10rem] relative z-20">
          <TypewriterEffectSmooth
            className="mb-0 space-y-0"
            cursorClassName="bg-primary"
            words={TYPEWRITER_WORDS}
          />
          <p className="text-muted-foreground text-sm md:text-xl">
            Create, automate, and scale your web scraping projects with ease. No
            coding required.
          </p>
          <div className="flex flex-col md:flex-row m-5">
            <Button
              className="w-52 h-12 rounded-xl text-base border-primary text-primary hover:text-white hover:bg-primary/30 group flex items-center justify-center"
              variant={"outline"}
            >
              <Link
                href={"/sign-in"}
                className="flex items-center justify-center"
              >
                Get Started
                <ChevronRightIcon className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <p className="text-base text-primary">
            New users get 200 credits for free upon first login
          </p>
        </SectionWrapper>
      </div>

      <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
          Backgrounds
        </p>
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
      <div className="text-2xl md:text-4xl lg:text-6xl text-foreground">
        <span className="text-primary">{primaryTitle}</span>
        <span className="">{secondaryTitle}</span>
      </div>
      {children}
    </section>
  );
}
