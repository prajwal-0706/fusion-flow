import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
  BrainIcon,
  CodeIcon,
  DatabaseIcon,
  Edit3Icon,
  EyeIcon,
  FileJson2Icon,
  GlobeIcon,
  Link2Icon,
  MouseIcon,
  MousePointerClick,
  SendIcon,
  TextIcon,
} from "lucide-react";

export const ROUTES = [
  {
    href: "/home",
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

export const HOW_IT_WORKS = [
  {
    title: "Build Your Workflow",
    description:
      "Create powerful workflows with intuitive tools and actions, simplifying complex scraping tasks.",
  },
  {
    title: "Scrape with Precision",
    description:
      "Extract data efficiently from any web page using advanced tools, including AI-powered data extraction.",
  },

  {
    title: "Automate and Optimize",
    description:
      "Schedule workflows, monitor execution stats, and optimize processes for maximum efficiency.",
  },
  {
    title: "Deliver Anywhere",
    description:
      "Send your scraped data directly to APIs, webhooks, or your preferred storage seamlessly.",
  },
];

export const FEATURES = [
  {
    title: "Launch browser",
    description:
      "Initiates a browser instance to begin the web scraping process, enabling interaction with web pages.",
    icon: <GlobeIcon className="stroke-pink-400" />,
    hoverChipClassName: "group-hover/feature:bg-pink-500",
  },
  {
    title: "Page to HTML",
    description:
      "Extracts the complete HTML content of the current page for detailed analysis and processing.",
    icon: <CodeIcon className="stroke-rose-400" />,
    hoverChipClassName: "group-hover/feature:bg-rose-500",
  },
  {
    title: "Extract text from element",
    description:
      "Retrieves the text content from a specified HTML element using a given CSS selector.",
    icon: <TextIcon className="stroke-rose-400" />,
    hoverChipClassName: "group-hover/feature:bg-rose-500",
  },
  {
    title: "Fill input",
    description:
      "Automatically fills a specified input field with a desired value, emulating user input.",
    icon: <Edit3Icon className="stroke-orange-400" />,
    hoverChipClassName: "group-hover/feature:bg-orange-500",
  },
  {
    title: "Click Element",
    description:
      "Simulates a click action on a specified HTML element, triggering any associated events or navigation.",
    icon: <MousePointerClick className="stroke-orange-400" />,
    hoverChipClassName: 'group-hover/feature:bg-"-500',
  },
  {
    title: "Scroll to element",
    description:
      "Scrolls to a specified element on the page, emulating user behavior for dynamic content loading.",
    icon: <MouseIcon className="stroke-orange-400" />,
    hoverChipClassName: "group-hover/feature:bg-orange-500",
  },
  {
    title: "Wait for element",
    description:
      "Pauses the workflow until a specified element becomes visible or hidden on the page.",
    icon: <EyeIcon className="stroke-amber-400" />,
    hoverChipClassName: "group-hover/feature:bg-amber-500",
  },
  {
    title: "Deliver via webhook",
    description:
      "Sends the scraped data to an external API endpoint through a POST request for further processing or storage.",
    icon: <SendIcon className="stroke-blue-400" />,
    hoverChipClassName: "group-hover/feature:bg-blue-500",
  },
  {
    title: "Extract data via AI",
    description:
      "Uses AI to parse HTML content and extract structured data based on a custom prompt, returning JSON output.",
    icon: <BrainIcon className="stroke-rose-400" />,
    hoverChipClassName: "group-hover/feature:bg-rose-500",
  },
  {
    title: "Read JSON",
    description:
      "Reads and retrieves a specific key or property from a JSON object for use in workflows.",
    icon: <FileJson2Icon className="stroke-orange-400" />,
    hoverChipClassName: "group-hover/feature:bg-orange-500",
  },
  {
    title: "Build JSON",
    description:
      "Adds or updates data within an existing JSON object or creates a new one with the specified properties.",
    icon: <DatabaseIcon className="stroke-orange-400" />,
    hoverChipClassName: "group-hover/feature:bg-orange-500",
  },
  {
    title: "Navigate to URL",
    description:
      "Navigates to a specified URL, loading the desired web page for scraping or interaction.",
    icon: <Link2Icon className="stroke-orange-400" />,
    hoverChipClassName: "group-hover/feature:bg-orange-500",
  },
];
