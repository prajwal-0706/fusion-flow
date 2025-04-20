"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Footer = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0.9, 1], [20, 0]);

  return (
    <motion.footer
      style={{ opacity, y }}
      className="relative w-full overflow-hidden bg-transparent border-t border-primary/10"
    >
      {/* Ultra-premium animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated particles with premium glow effect */}
        <div className="absolute w-full h-full">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full shadow-[0_0_15px_rgba(var(--primary),0.6)]"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: 0,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Animated gradient lines with premium glow */}
        <div className="absolute inset-0">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_15px_rgba(var(--primary),0.4)]"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 1,
              }}
              style={{ top: `${15 + i * 12}%` }}
            />
          ))}
        </div>

        {/* Premium grid pattern with subtle animation */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 [background-size:20px_20px] [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"></div>
        </div>

        {/* Premium 3D effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Ultra-premium brand section */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent"
              >
                Fusion Flow
              </motion.div>
            </Link>
            <p className="text-muted-foreground max-w-xs text-lg leading-relaxed">
              Build powerful web scraping workflows with AI-powered automation.
            </p>
            <div className="flex space-x-6">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-3 rounded-lg border transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm",
                    social.className,
                    social.borderColor,
                    social.glowColor
                  )}
                >
                  <social.icon
                    className={cn("w-5 h-5", social.iconClassName)}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Ultra-premium footer links sections */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="font-semibold text-xl bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center space-x-3 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
                        {link.icon}
                      </span>
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ultra-premium bottom section */}
        <div className="mt-24 pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-sm text-muted-foreground"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              © {new Date().getFullYear()} Fusion Flow. All rights reserved.
            </motion.p>
            <div className="flex space-x-8 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors relative group"
              >
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors relative group"
              >
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
