"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, Quote, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/constants";
import CountUp from "react-countup";

function GridPattern() {
  return (
    <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]">
      <div className="absolute inset-0 [background:linear-gradient(to_right,transparent,primary/5,transparent)] animate-[move_4s_linear_infinite]" />
      <div className="absolute inset-0 [background-size:20px_20px] [background-image:linear-gradient(to_right,primary/5_1px,transparent_1px),linear-gradient(to_bottom,primary/5_1px,transparent_1px)] [mask-image:radial-gradient(white,transparent_90%)]" />
    </div>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: { label: string; value: string; suffix?: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const springConfig = { damping: 15, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm p-6 md:p-8">
        {/* Animated borders */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

        <div className="relative space-y-2 text-center">
          <div className="inline-flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary/50 animate-pulse" />

            {/* @ts-ignore */}
            <CountUp
              className="relative mx-2 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-b from-white via-white/90 to-white/70 text-transparent bg-clip-text group-hover:to-primary/90 transition-all duration-500"
              end={Number(stat.value)}
              duration={1}
              suffix={stat.suffix || ""}
            />
            <Sparkles className="w-5 h-5 text-primary/50 animate-pulse" />
          </div>
          <div className="text-sm md:text-base text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500">
            {stat.label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  const springConfig = { damping: 15, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 p-6 md:p-8 overflow-hidden"
    >
      <GridPattern />

      {/* Content */}
      <div className="relative space-y-4">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-primary text-primary transition-transform duration-300 group-hover:scale-110"
            />
          ))}
        </div>

        {/* Quote */}
        <div className="relative">
          <Quote className="absolute -top-1 -left-2 w-8 h-8 text-primary/20 group-hover:text-primary/30 transition-colors duration-500" />
          <p className="text-lg md:text-xl text-white pl-6 font-medium">
            {testimonial.highlight}
          </p>
        </div>

        {/* Content */}
        <p className="text-zinc-400 text-sm md:text-base group-hover:text-zinc-300 transition-colors duration-500">
          {testimonial.content}
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <span className="text-white font-bold text-lg">
                {testimonial.name.charAt(0)}
              </span>
            </div>
            <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div>
            <h4 className="font-medium text-white group-hover:text-primary transition-colors duration-500">
              {testimonial.name}
            </h4>
            <p className="text-sm text-zinc-400">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      <div className="text-center max-w-3xl -mt-12 mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative inline-block"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-zinc-400"
        >
          Join thousands of satisfied users who have transformed their data
          collection process with Fusion Flow.
        </motion.p>
      </div>

      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
      <div className="absolute inset-0 [background-size:50px_50px] [background-image:linear-gradient(to_right,primary/5_1px,transparent_1px),linear-gradient(to_bottom,primary/5_1px,transparent_1px)] [mask-image:radial-gradient(white,transparent_90%)]" />

      <div className="relative container mx-auto px-4 max-w-7xl">
        {/* Heading */}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { label: "Active Users", value: "100", suffix: "+" },
            { label: "Data Points Collected", value: "10000", suffix: "+" },
            { label: "Customer Satisfaction", value: "98", suffix: "%" },
          ].map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="hidden md:block relative px-4 md:px-10">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="flex"
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-2 md:px-4"
                  style={{ width: "33.333%" }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev > 0 ? prev - 1 : TESTIMONIALS.length - 3
                )
              }
              className="p-2 rounded-full bg-black/20 border border-white/10 hover:border-primary/30 hover:bg-black/40 transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 text-white group-hover:text-primary transition-colors duration-300" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: TESTIMONIALS.length - 2 }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      activeIndex === index
                        ? "w-6 bg-primary"
                        : "bg-white/20 hover:bg-white/40"
                    )}
                  />
                )
              )}
            </div>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev < TESTIMONIALS.length - 3 ? prev + 1 : 0
                )
              }
              className="p-2 rounded-full bg-black/20 border border-white/10 hover:border-primary/30 hover:bg-black/40 transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 text-white group-hover:text-primary transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
