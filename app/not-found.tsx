"use client";

import Link from "next/link";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [footerLink, setFooterLink] = useState("#footer");

  useEffect(() => {
    setFooterLink(window.location.origin + "#footer");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0C0A09] relative overflow-hidden">
      {/* Background pattern */}
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
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-64 h-64 rounded-full opacity-20",
              "bg-gradient-to-br from-primary/30 to-transparent",
              "animate-[float_8s_ease-in-out_infinite]",
              i % 2 === 0 ? "animate-delay-0" : "animate-delay-1000"
            )}
            style={{
              left: `${Math.random() * 100 - 20}%`,
              top: `${Math.random() * 100 - 20}%`,
              animationDelay: `${i * 2 + 1}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-2xl w-full">
        {/* Background Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] relative">
            <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-[spin_25s_linear_infinite]" />
            <div className="absolute inset-8 border-2 border-primary/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute inset-16 border-2 border-primary/10 rounded-full animate-[spin_15s_linear_infinite]" />
            <div className="absolute inset-24 border-2 border-primary/10 rounded-full animate-[spin_10s_linear_infinite]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <h1 className="text-[180px] font-bold leading-none tracking-tighter">
              <span className="bg-gradient-to-b from-primary via-primary/90 to-primary/40 text-transparent bg-clip-text animate-gradient">
                404
              </span>
            </h1>
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-primary/20 to-transparent mx-auto my-8" />
          </div>

          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-b from-white via-white/95 to-white/60 text-transparent bg-clip-text">
              Page Not Found
            </span>
          </h2>

          <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Home Button */}
            <Link
              href="/"
              className="group flex items-center gap-2 px-6 py-2.5 rounded-md bg-black/40 border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:bg-black/60 hover:border-primary/20 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            >
              <HomeIcon className="w-5 h-5 text-primary" />
              <span className="text-white font-medium">Home</span>
            </Link>

            {/* Dashboard Button */}
            <Link
              href="/home"
              className="group flex items-center gap-2 px-6 py-2.5 rounded-md bg-black/40 border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:bg-black/60 hover:border-white/20 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            >
              <ArrowLeftIcon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
              <span className="text-white/70 font-medium group-hover:text-white transition-colors duration-300">
                Dashboard
              </span>
            </Link>
          </div>

          <div className="mt-12">
            <Link
              href={footerLink}
              className="group text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <span className="relative">
                Need help? Contact support
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-primary/50 via-primary to-primary/50 group-hover:w-full transition-all duration-200" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
