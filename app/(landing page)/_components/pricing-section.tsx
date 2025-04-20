"use client";

import { Button } from "@/components/ui/button";
import { PRICING_PLANS } from "@/lib/constants";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useId, useState } from "react";

function PricingPattern({ className }: { className?: string }) {
  const id = useId();
  const gridSize = 30;
  const dots = [
    [1, 1],
    [3, 2],
    [5, 1],
    [7, 3],
    [9, 2],
    [2, 4],
    [4, 5],
    [6, 4],
    [8, 6],
    [10, 5],
    [1, 7],
    [3, 8],
    [5, 7],
    [7, 9],
    [9, 8],
    [2, 10],
    [4, 11],
    [6, 10],
    [8, 12],
    [10, 11],
  ];

  const lines = [
    { x1: 2, y1: 2, x2: 8, y2: 8 },
    { x1: 4, y1: 4, x2: 10, y2: 10 },
    { x1: 6, y1: 6, x2: 12, y2: 12 },
    { x1: 8, y1: 8, x2: 14, y2: 14 },
    { x1: 10, y1: 10, x2: 16, y2: 16 },
  ];

  return (
    <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]">
      <svg
        aria-hidden="true"
        className={cn("absolute inset-0 h-full w-full", className)}
      >
        <defs>
          <pattern
            id={`${id}-grid`}
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M${gridSize} 0L0 0 0 ${gridSize}`}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.05"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id}-grid)`} />

        {/* Animated dots */}
        {dots.map(([x, y], i) => (
          <circle
            key={`${id}-dot-${i}`}
            cx={(x * gridSize) / 2}
            cy={(y * gridSize) / 2}
            r="1.5"
            className="fill-primary/30"
            style={{
              animation: `pulse 3s infinite ${i * 100}ms`,
              transformOrigin: `${(x * gridSize) / 2}px ${
                (y * gridSize) / 2
              }px`,
            }}
          />
        ))}

        {/* Animated lines */}
        {lines.map((line, i) => (
          <line
            key={`${id}-line-${i}`}
            x1={(line.x1 * gridSize) / 2}
            y1={(line.y1 * gridSize) / 2}
            x2={(line.x2 * gridSize) / 2}
            y2={(line.y2 * gridSize) / 2}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="0.5"
            className="animate-pulse"
            style={{
              animationDelay: `${i * 200}ms`,
              animationDuration: "4s",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function PriceHighlight({ children }: { children: React.ReactNode }) {
  const id = useId();
  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        className="absolute -inset-x-4 -inset-y-2 w-[calc(100%+32px)] h-[calc(100%+16px)] pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`${id}-gradient`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(var(--primary-rgb), 0.2)" />
            <stop offset="50%" stopColor="rgba(var(--primary-rgb), 0.1)" />
            <stop offset="100%" stopColor="rgba(var(--primary-rgb), 0)" />
          </linearGradient>
          <filter id={`${id}-glow`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M1 8.5C1 4.35786 4.35786 1 8.5 1H35.5C39.6421 1 43 4.35786 43 8.5V28.5C43 32.6421 39.6421 36 35.5 36H8.5C4.35786 36 1 32.6421 1 28.5V8.5Z"
          fill={`url(#${id}-gradient)`}
          strokeWidth="1.5"
          stroke="rgba(var(--primary-rgb), 0.3)"
          filter={`url(#${id}-glow)`}
        />
      </svg>
      {children}
    </div>
  );
}

export default function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative p-8 rounded-3xl overflow-hidden transition-all duration-300",
                "bg-[#0C0A09]",
                plan.highlighted && "border border-primary/20",
                hoveredPlan === plan.title
                  ? "scale-[1.02] shadow-lg shadow-primary/10"
                  : "hover:scale-[1.01]"
              )}
              onMouseEnter={() => setHoveredPlan(plan.title)}
              onMouseLeave={() => setHoveredPlan(null)}
              onFocus={() => setHoveredPlan(plan.title)}
              onBlur={() => setHoveredPlan(null)}
              tabIndex={0}
              role="button"
              aria-label={`${plan.title} plan - ${plan.description}`}
            >
              <PricingPattern
                className={cn(
                  "stroke-white/[0.05] [mask-image:linear-gradient(to_bottom,white,transparent)]",
                  plan.highlighted && "stroke-primary/[0.15]"
                )}
              />

              {plan.highlighted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -top-px left-1/2 -translate-x-1/2"
                >
                  <div className="relative -mt-2 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent p-px">
                    <div className="rounded-full bg-[#0C0A09] px-3 py-1">
                      <span className="text-xs font-medium text-primary">
                        Most Popular
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="relative z-10 space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                    {plan.title}
                  </h3>
                  <p className="mt-2 text-zinc-400">{plan.description}</p>
                </div>

                <PriceHighlight>
                  <div className="flex items-baseline gap-1 relative z-10">
                    <span className="text-5xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-zinc-400">/one-time</span>
                  </div>
                </PriceHighlight>

                <div className="space-y-4">
                  {[
                    `${plan.credits.toLocaleString()} credits`,
                    "Unlimited projects",
                    "Priority support",
                    "Advanced analytics",
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 group/feature transition-transform duration-200 hover:translate-x-1"
                    >
                      <div className="relative flex h-5 w-5 items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-primary/20 group-hover/feature:bg-primary/30 transition-colors duration-300" />
                        <Check className="h-3 w-3 text-primary relative" />
                      </div>
                      <span className="text-zinc-300 group-hover/feature:text-white transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={cn(
                    "w-full h-12 rounded-xl text-base font-medium relative overflow-hidden group",
                    "transition-all duration-500",
                    plan.highlighted
                      ? "bg-gradient-to-br from-primary via-primary/90 to-primary text-white shadow-lg shadow-primary/20"
                      : "bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white border border-white/10"
                  )}
                  asChild
                >
                  <Link href={plan.link}>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                    {/* Creative hover effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/20 transition-colors duration-300" />
                    {/* Glow effect */}
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-zinc-400 text-sm mb-4">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              className="text-sm border-primary/20 text-primary hover:bg-primary/10"
              asChild
            >
              <Link href="#faq">Compare all features</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-sm text-zinc-400 hover:text-white"
              asChild
            >
              <Link href="#contact">Need help choosing?</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
