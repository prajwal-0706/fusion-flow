"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FEATURE_GROUPS = {
  browser: FEATURES.slice(0, 3),
  interaction: FEATURES.slice(3, 6),
  data: FEATURES.slice(6, 9),
  automation: FEATURES.slice(9, 12),
};

export default function FeatureSection() {
  return (
    <motion.div
      className="relative z-10 py-10 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(FEATURE_GROUPS).map(([group, features], groupIndex) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{
              duration: 0.5,
              delay: groupIndex * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            viewport={{ once: true }}
            className="relative group/container"
          >
            <div className="absolute inset-0 bg-[#0C0A09] rounded-3xl overflow-hidden">
              <div
                className={cn(
                  "absolute inset-0",
                  "[background-size:20px_20px]",
                  "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                  "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
                )}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0C0A09] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
              <motion.div
                className="absolute inset-0 opacity-0 group-hover/container:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.05) 0%, transparent 70%)",
                }}
              />
              {/* Top border */}
              <span className="absolute top-0 left-[20%] w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover/container:w-[60%] transition-all duration-700" />
              {/* Bottom border */}
              <span className="absolute bottom-0 right-[20%] w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover/container:w-[60%] transition-all duration-700" />
              {/* Left border */}
              <span className="absolute left-0 top-[20%] h-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent group-hover/container:h-[60%] transition-all duration-700" />
              {/* Right border */}
              <span className="absolute right-0 bottom-[20%] h-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent group-hover/container:h-[60%] transition-all duration-700" />
            </div>
            <div className="relative p-6 space-y-6">
              <motion.h3
                className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 capitalize relative group/heading"
                whileHover={{ x: 10 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative">
                  <span
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover/container:opacity-100 transition-all duration-300 
                    before:absolute before:content-[''] before:w-8 before:h-8 before:-left-3 before:-top-3 before:bg-primary/20 before:rounded-full before:blur-lg before:opacity-0 group-hover/container:before:opacity-100 before:transition-all before:duration-300"
                  />
                  {group}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent group-hover/container:w-full transition-all duration-500" />
                </span>
              </motion.h3>
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={feature.title}
                    {...feature}
                    index={index}
                    groupIndex={groupIndex}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

const FeatureCard = ({
  title,
  description,
  icon,
  index,
  groupIndex,
  hoverChipClassName,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  groupIndex: number;
  hoverChipClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 300 };
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
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: (groupIndex * 3 + index) * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative bg-white/5 dark:bg-neutral-900/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 dark:hover:bg-neutral-800/10 transition-all duration-300 border border-neutral-200/10 dark:border-neutral-700/10"
      whileHover={{
        y: -2,
      }}
    >
      <div className="flex items-start gap-4">
        <motion.div
          className="mt-1 p-2 rounded-lg bg-white/10 dark:bg-neutral-800/10 group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              className={cn(
                "h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover:h-2 group-hover:w-2 transition-all duration-300",
                hoverChipClassName?.replace(
                  "group-hover/feature:bg-",
                  "group-hover:bg-"
                )
              )}
              whileHover={{ scale: 1.5 }}
            />
            <motion.h4
              className="text-base font-semibold text-neutral-800 dark:text-neutral-100 group-hover:translate-x-1 transition-transform duration-300"
              whileHover={{ x: 5 }}
            >
              {title}
            </motion.h4>
          </div>
          <motion.p
            className="text-sm font-bold text-neutral-600 dark:text-neutral-400"
            whileHover={{ x: 3 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
