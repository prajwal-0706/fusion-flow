"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { ZapIcon, Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { HEADER_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = HEADER_ROUTES.filter((route) => !route.button).map(
        (route) => route.href.substring(1)
      );

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollIntoView = (ele: string) => {
    const element = document.getElementById(ele.substring(1));
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
    });

    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent h-32" />
        <header
          ref={navbarRef}
          className={cn(
            "relative w-full h-16 flex items-center transition-all duration-500",
            scrolled
              ? "bg-black/40 backdrop-blur-xl border-b border-white/5"
              : "bg-transparent"
          )}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-1 h-16 bg-gradient-to-b from-primary/30 to-transparent opacity-50" />
            <div className="absolute top-0 right-1/3 w-1 h-16 bg-gradient-to-b from-primary/20 to-transparent opacity-30" />
          </div>

          {/* Main container with max width */}
          <div className="max-w-screen-xl mx-auto w-full px-4 lg:px-6 flex items-center justify-between relative z-10">
            {/* Logo section */}
            <Link href="#" className="flex items-center justify-center group">
              <motion.div
                className="relative p-2 rounded-full bg-gradient-to-br from-primary/20 to-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 blur-md opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <ZapIcon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300 relative z-10" />
                <AnimatePresence>
                  {hoveredItem === "logo" && (
                    <motion.div
                      className="absolute -top-1 -right-1 text-primary"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <span
                className="ml-2 text-white font-bold text-xl bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text text-transparent group-hover:from-primary group-hover:via-white group-hover:to-primary transition-all duration-300"
                onMouseEnter={() => setHoveredItem("logo")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                Fusion Flow
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex ml-auto items-center bg-black/20 backdrop-blur-sm rounded-full border border-white/5 shadow-lg relative overflow-hidden">
              {/* Decorative background for nav */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />

              <div className="flex items-center gap-0.5 p-1">
                {HEADER_ROUTES.map(
                  ({ className, href, title, button }, index) =>
                    button ? (
                      <Link
                        className="text-sm font-medium text-white group-hover:text-primary relative z-10 ml-0.5"
                        href={href}
                        key={title}
                      >
                        <Button
                          variant="outline"
                          className="h-8 px-4 text-sm border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 relative overflow-hidden group"
                        >
                          <span className="relative z-10">{title}</span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </Button>
                      </Link>
                    ) : (
                      <motion.div
                        key={href}
                        className="relative"
                        onHoverStart={() => setHoveredItem(href)}
                        onHoverEnd={() => setHoveredItem(null)}
                      >
                        <motion.span
                          className={cn(
                            "h-8 text-sm font-medium cursor-pointer select-none relative group px-3 rounded-full flex items-center justify-center transition-all duration-300",
                            activeSection === href.substring(1)
                              ? "text-primary bg-primary/10 shadow-sm shadow-primary/10"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          )}
                          onClick={() => scrollIntoView(href)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {title}
                          <AnimatePresence>
                            {hoveredItem === href && (
                              <motion.div
                                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </AnimatePresence>

                          {/* Subtle glow effect for active item */}
                          {activeSection === href.substring(1) && (
                            <motion.div
                              className="absolute inset-0 rounded-full bg-primary/5 blur-sm"
                              animate={{
                                opacity: [0.5, 0.7, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          )}
                        </motion.span>
                      </motion.div>
                    )
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-auto text-white/70 hover:text-white transition-colors z-50 relative group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 relative z-10">
              {HEADER_ROUTES.map(({ href, title, button }, index) => (
                <motion.div
                  key={title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {button ? (
                    <Link href={href}>
                      <Button
                        variant="outline"
                        className="text-base border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10">{title}</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </Button>
                    </Link>
                  ) : (
                    <button
                      className={cn(
                        "text-lg font-medium cursor-pointer select-none relative group",
                        activeSection === href.substring(1)
                          ? "text-primary"
                          : "text-white/70 hover:text-white"
                      )}
                      onClick={() => scrollIntoView(href)}
                    >
                      {title}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary"
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            activeSection === href.substring(1) ? "100%" : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
