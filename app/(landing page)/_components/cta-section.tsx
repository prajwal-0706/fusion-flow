"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sparkles,
  Globe,
  Database,
  Bot,
  Workflow,
  Shield,
  Zap,
  ChevronRight,
  Rocket,
} from "lucide-react";
import { useRef, useState } from "react";
import { features } from "@/lib/constants";

// Simple animated feature card
function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate the animation direction based on index
  const isEven = index % 2 === 0;
  const xOffset = isEven ? -20 : 20;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-primary/20 transition-colors duration-300 hover:bg-black/30 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        </div>

        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
          {description}
        </p>

        <motion.div
          className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={isHovered ? { x: 5 } : { x: 0 }}
        >
          Learn more <ChevronRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-12 translate-x-6 -translate-y-6 rotate-45 bg-gradient-to-t from-primary/20 to-transparent group-hover:from-primary/30 transition-colors duration-300" />
      </div>
    </motion.div>
  );
}

// Animated highlight text
function HighlightText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block text-primary">
      {children}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/50"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      />
    </span>
  );
}

// Orbital Icon Component
function OrbitingIcon({
  icon: Icon,
  angle,
  radius,
  duration,
}: {
  icon: React.ElementType;
  angle: number;
  radius: number;
  duration: number;
}) {
  return (
    <>
      {/* Orbital Path */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
        style={{
          width: radius * 2,
          height: radius * 2,
          boxShadow: "0 0 10px rgba(var(--primary-rgb), 0.1)",
        }}
      />

      {/* Moving Icon */}
      <motion.div
        initial={{ rotate: angle }}
        animate={{ rotate: angle + 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2"
        style={{
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
        }}
      >
        <div
          className="absolute p-3 rounded-xl bg-black/50 backdrop-blur-sm border border-primary/20 shadow-lg"
          style={{
            transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
            left: "100%",
            top: "50%",
            boxShadow: "0 0 15px rgba(var(--primary-rgb), 0.2)",
          }}
        >
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </motion.div>
    </>
  );
}

// Updated Modern Orbital Visualization
function OrbitalVisualization() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 rounded-3xl overflow-hidden bg-transparent">
        {/* Background Grid */}
        {/* <div className="absolute inset-0 [background-size:20px_20px] [background-image:linear-gradient(to_right,primary/10_1px,transparent_1px),linear-gradient(to_bottom,primary/10_1px,transparent_1px)]" /> */}

        {/* Center Container */}
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          {/* Center Point */}
          <div className="absolute w-4 h-4 rounded-full bg-primary/50 blur-[2px]" />
          <div className="absolute w-2 h-2 rounded-full bg-primary" />

          {/* Orbital System */}
          <div className="relative w-[400px] h-[400px]">
            {/* Inner Orbit */}
            <OrbitingIcon icon={Globe} angle={0} radius={80} duration={10} />
            <OrbitingIcon
              icon={Database}
              angle={180}
              radius={80}
              duration={10}
            />

            {/* Middle Orbit */}
            <OrbitingIcon icon={Bot} angle={60} radius={140} duration={25} />
            <OrbitingIcon
              icon={Workflow}
              angle={240}
              radius={140}
              duration={25}
            />

            {/* Outer Orbit */}
            <OrbitingIcon
              icon={Shield}
              angle={120}
              radius={200}
              duration={40}
            />
            <OrbitingIcon icon={Zap} angle={300} radius={200} duration={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative py-32 overflow-hidden">
      {/* <AnimatedBackground /> */}

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Start your journey today</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              <HighlightText>Transform</HighlightText> your data collection
              <br />
              with Fusion Flow
            </h2>

            <p className="text-zinc-300 text-lg md:text-xl max-w-xl">
              Join thousands of businesses that trust Fusion Flow for their web
              scraping needs. Start your free trial today and get 200 credits to
              explore our platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="relative h-14 px-8 rounded-xl text-base font-medium bg-primary text-white overflow-hidden group hover:bg-primary/90 transition-colors duration-300"
                asChild
              >
                <Link href="/sign-up">
                  <span className="relative flex items-center gap-2">
                    Get Started Now
                    <Rocket className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-14 px-8 rounded-xl text-base font-medium border-primary/30 text-primary hover:bg-primary/10 transition-colors duration-300"
                asChild
              >
                <Link href="/demo">Request a Demo</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right column - Orbital Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl"
          >
            <OrbitalVisualization />
          </motion.div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
