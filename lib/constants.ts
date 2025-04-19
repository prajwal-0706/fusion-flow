import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
} from "lucide-react";

export const ROUTES = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "/credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "/billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];

export const HEADER_ROUTES = [
  {
    title: "How it works",
    href: "#howItWorks",
    className: "",
  },
  {
    title: "Scraping Features",
    href: "#scrapingFeatures",
    className: "",
  },
  {
    title: "Pricing",
    href: "#pricing",
    className: "",
  },
  {
    title: "Get Started",
    href: "/sign-in",
    className: "",
    button: true,
  },
];

export const TYPEWRITER_WORDS = [
  {
    text: "Build",
  },
  {
    text: "Powerful",
  },
  {
    text: "Web",
    className: "text-primary dark:text-primary",
  },
  {
    text: "Scraping",
    className: "text-primary dark:text-primary",
  },
  {
    text: "Workflows.",
  },
];