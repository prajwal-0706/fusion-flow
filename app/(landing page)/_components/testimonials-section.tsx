"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/constants";

// 3D card effect component
function TestimonialCard3D({
  testimonial,
  isActive,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  isActive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform values for 3D rotation
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  // Spring physics for smooth animation
  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Handle mouse/touch events for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isActive) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 20,
      }}
      transition={{ duration: 0.5 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onTouchMove={(e) => {
        if (!cardRef.current || !isActive) return;
        const touch = e.touches[0];
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set(touch.clientX - centerX);
        y.set(touch.clientY - centerY);
      }}
      onTouchEnd={handleMouseLeave}
      className={cn(
        "relative p-8 rounded-2xl overflow-hidden transition-all duration-500",
        isActive
          ? "bg-gradient-to-br from-[#0C0A09]/80 to-[#0C0A09]/70 border border-primary/30 shadow-lg shadow-primary/10 z-10 backdrop-blur-sm"
          : "bg-[#0C0A09]/30 border border-white/5 z-0 backdrop-blur-sm"
      )}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.3),transparent_70%)]" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(var(--primary-rgb), 0.2, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(var(--primary-rgb), 0.2, transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(var(--primary-rgb), 0.2, transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(var(--primary-rgb), 0.2, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(var(--primary-rgb), 0.2, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Quote icon */}
      <div className="absolute -top-4 -right-4 w-24 h-24 text-primary/10">
        <Quote size={96} />
      </div>

      {/* Highlight text */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-primary/40" />

      <div className="relative z-10">
        {/* Industry badge */}
        <div className="absolute -top-2 -right-2">
          <div className="bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full">
            {testimonial.industry}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>

        {/* Highlight text */}
        <motion.p
          className="text-primary font-medium mb-4 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          "{testimonial.highlight}"
        </motion.p>

        {/* Content */}
        <p className="text-zinc-300 mb-6 italic">"{testimonial.content}"</p>

        {/* Achievement badge */}
        <div className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3 flex items-start gap-3">
          <div className="bg-primary/20 p-2 rounded-full">
            {testimonial.icon}
          </div>
          <div>
            <p className="text-white font-medium text-sm">Key Achievement</p>
            <p className="text-zinc-300 text-sm">{testimonial.achievement}</p>
          </div>
        </div>

        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-primary overflow-hidden flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-white">{testimonial.name}</h4>
            <p className="text-sm text-zinc-400">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const goToPrev = () => {
    setAutoplay(false);
    setActiveIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const goToNext = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <div className="relative">
      {/* Carousel container */}
      <div className="relative h-[450px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <TestimonialCard3D
                testimonial={testimonial}
                isActive={activeIndex === index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={goToPrev}
          className="w-10 h-10 rounded-full bg-[#0C0A09] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/30 transition-colors duration-200"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false);
                setActiveIndex(index);
              }}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "bg-primary w-6"
                  : "bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="w-10 h-10 rounded-full bg-[#0C0A09] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/30 transition-colors duration-200"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// Animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-transparent" />

      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />
    </div>
  );
}

// Animated typography component
function AnimatedTypography({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <div className="flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <div className="py-10 relative bg-transparent">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Stats section with animated counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: "Active Users", value: 10000, suffix: "+" },
            { label: "Data Points Collected", value: 1000000000, suffix: "+" },
            { label: "Customer Satisfaction", value: 98, suffix: "%" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0C0A09]/50 border border-white/10 rounded-xl p-6 text-center relative overflow-hidden group backdrop-blur-sm"
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </h3>
              <span className="text-zinc-400">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Section title with animated typography */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <AnimatedTypography text="What Our Customers Are Saying" />
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            <AnimatedTypography text="Join thousands of satisfied users who have transformed their data collection process with Fusion Flow." />
          </p>
        </div>

        {/* Carousel */}
        <TestimonialCarousel />

        {/* Trust badges with logos */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-zinc-400 text-sm mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              "TechCorp",
              "StartupX",
              "GrowthLabs",
              "RetailPro",
              "MarketInsights",
            ].map((company, index) => (
              <motion.div
                key={index}
                className="text-white/30 font-medium relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-24 h-12 bg-white/5 rounded-md flex items-center justify-center backdrop-blur-sm">
                  {company}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Animated counter component
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
