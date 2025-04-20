"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  Sparkles,
  Zap,
  Shield,
  Coins,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/lib/constants";

const FAQ_CATEGORIES = [
  { id: "all", label: "All FAQs", icon: Sparkles },
  { id: "general", label: "General", icon: Sparkles },
  { id: "features", label: "Features", icon: Zap },
  { id: "security", label: "Security", icon: Shield },
  { id: "pricing", label: "Pricing", icon: Coins },
  { id: "ai", label: "AI & Automation", icon: Brain },
];

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon =
    FAQ_CATEGORIES.find((cat) => cat.id === item.category)?.icon || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group border border-white/10 rounded-xl overflow-hidden bg-[#0C0A09] hover:border-primary/50 transition-colors duration-300"
      style={{ width: "100%" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors duration-200"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Icon className="h-5 w-5 text-primary flex-shrink-0" />
          <h3 className="font-medium text-white group-hover:text-primary transition-colors duration-200 truncate">
            {item.question}
          </h3>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-zinc-400 transition-transform duration-300 flex-shrink-0 ml-4",
            isOpen && "transform rotate-180 text-primary"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-zinc-300 border-t border-white/10">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "general"
  );

  const filteredFAQs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-zinc-400 -mt-10">
            Find answers to common questions about Fusion Flow
          </p>
        </motion.div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 text-white placeholder-zinc-400"
          />
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10"
              )}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-zinc-400 text-sm">
            Still have questions?{" "}
            <a href="#contact" className="text-primary hover:underline">
              Contact our support team
            </a>{" "}
            for assistance.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
