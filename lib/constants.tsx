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
  Award,
  Zap,
  Sparkles,
  TrendingUp,
  Bot,
  Workflow,
  Shield,
  Globe,
  Database,
  Github,
  Twitter,
  Linkedin,
  Mail,
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
    title: "Testimonials",
    href: "#testimonials",
    className: "",
  },
  {
    title: "FAQ",
    href: "#faq",
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
    hoverChipClassName: "group-hover/feature:bg-orange-500",
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

export const PRICING_PLANS = [
  {
    title: "Small Pack",
    description: "Get 1,000 credits",
    credits: 1000,
    price: 9.99,
    link: "/billing",
  },
  {
    title: "Medium Pack",
    description: "Get 5,000 credits",
    credits: 5000,
    price: 39.99,
    highlighted: true,
    link: "/billing",
  },
  {
    title: "Large Pack",
    description: "Get 10,000 credits",
    credits: 10000,
    price: 69.99,
    link: "/billing",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Data Analyst",
    company: "TechCorp Inc.",
    content:
      "Fusion Flow has completely transformed how we collect data. What used to take our team days now takes minutes. The automation features are a game-changer.",
    rating: 5,
    highlight: "Automation features are a game-changer",
    industry: "Technology",
    achievement: "Reduced data collection time by 87%",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "StartupX",
    content:
      "As someone with no coding background, I was skeptical about web scraping. Fusion Flow made it incredibly simple. The interface is intuitive and the support team is amazing.",
    rating: 5,
    highlight: "Made web scraping incredibly simple",
    industry: "Startup",
    achievement: "Launched product 3 weeks ahead of schedule",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthLabs",
    content:
      "We've been using Fusion Flow for our competitive analysis and it's been invaluable. The data quality is excellent and the export options make it easy to integrate with our existing tools.",
    rating: 4,
    highlight: "Invaluable for competitive analysis",
    industry: "Marketing",
    achievement: "Identified 12 new market opportunities",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    name: "David Wilson",
    role: "E-commerce Manager",
    company: "RetailPro",
    content:
      "The price monitoring capabilities have saved us thousands. We can now track competitor pricing in real-time and adjust our strategy accordingly. The ROI has been incredible.",
    rating: 5,
    highlight: "Saved us thousands on price monitoring",
    industry: "E-commerce",
    achievement: "Increased profit margins by 23%",
    icon: <Award className="w-5 h-5" />,
  },
  {
    name: "Lisa Thompson",
    role: "Research Analyst",
    company: "MarketInsights",
    content:
      "Fusion Flow's advanced filtering options allow us to extract exactly the data we need. The scheduled scraping has been a lifesaver for our regular market reports.",
    rating: 5,
    highlight: "Advanced filtering options are excellent",
    industry: "Research",
    achievement: "Reduced research time by 65%",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

export const FAQ_ITEMS = [
  {
    category: "general",
    question: "What is Fusion Flow?",
    answer:
      "Fusion Flow is a powerful web scraping platform that combines AI capabilities with intuitive workflow automation. It allows you to extract data from any website without writing complex code, making data collection accessible to both beginners and advanced users.",
  },
  {
    category: "features",
    question: "What makes Fusion Flow different from other scraping tools?",
    answer:
      "Fusion Flow stands out with its AI-powered data extraction, intuitive visual workflow builder, and seamless integration capabilities. Our platform offers advanced features like browser automation, AI-powered extraction, and real-time monitoring, all in a user-friendly interface.",
  },
  {
    category: "features",
    question: "What types of data can I extract with Fusion Flow?",
    answer:
      "You can extract any type of data from websites including text, images, tables, and structured data. Our AI-powered extraction can understand context and relationships in the data, making it perfect for e-commerce, news, social media, and any other web content.",
  },
  {
    category: "features",
    question: "How does the visual workflow builder work?",
    answer:
      "Our visual workflow builder lets you create scraping workflows by dragging and dropping actions like 'Launch browser', 'Extract text', 'Click element', and more. You can chain these actions together, add conditions, and schedule them to run automatically.",
  },
  {
    category: "security",
    question: "How do you ensure data security?",
    answer:
      "We implement enterprise-grade security measures including end-to-end encryption, secure credential storage, and regular security audits. Your data and workflows are protected with the highest standards, and we comply with major security frameworks.",
  },
  {
    category: "security",
    question: "How are my credentials and API keys protected?",
    answer:
      "All credentials and API keys are encrypted at rest and in transit. We use industry-standard encryption and secure storage practices. Your sensitive data is never exposed in logs or to other users.",
  },
  {
    category: "pricing",
    question: "How does the credit system work?",
    answer:
      "Credits are consumed based on the complexity of your scraping tasks. Simple extractions use fewer credits, while complex workflows with AI processing use more. Each plan comes with a set number of credits, and you can always upgrade as needed.",
  },
  {
    category: "pricing",
    question: "What's included in each pricing plan?",
    answer:
      "Each plan includes unlimited projects, priority support, and advanced analytics. The Small Pack (1,000 credits) is perfect for beginners, the Medium Pack (5,000 credits) is our most popular choice, and the Large Pack (10,000 credits) is ideal for power users.",
  },
  {
    category: "pricing",
    question: "Do you offer a free trial?",
    answer:
      "Yes! We offer a 14-day free trial with 200 credits to explore our platform. No credit card is required, and you can cancel anytime. We also provide a money-back guarantee if you're not satisfied.",
  },
  {
    category: "ai",
    question: "How does the AI-powered extraction work?",
    answer:
      "Our AI system analyzes webpage structures and content to intelligently extract data based on your requirements. It can understand context, handle dynamic content, and adapt to website changes automatically, making your scraping more reliable.",
  },
  {
    category: "ai",
    question: "Can I customize the AI extraction behavior?",
    answer:
      "Yes! You can provide custom prompts to guide the AI's extraction behavior. This allows you to specify exactly what data you want to extract and how it should be structured, making the extraction process more precise and tailored to your needs.",
  },
  {
    category: "features",
    question: "What integrations are available?",
    answer:
      "Fusion Flow integrates seamlessly with popular platforms through webhooks and APIs. You can send your scraped data directly to your preferred storage solution, CRM, or any other system that accepts webhook or API requests.",
  },
  {
    category: "features",
    question: "How do I handle rate limiting and IP blocking?",
    answer:
      "Our platform includes built-in rate limiting controls and IP rotation capabilities. You can set custom delays between requests, use proxy servers, and implement sophisticated retry mechanisms to avoid detection and ensure reliable data collection.",
  },
  {
    category: "general",
    question: "Do I need coding experience to use Fusion Flow?",
    answer:
      "No coding experience is required! Our visual workflow builder and AI-powered features make it easy for anyone to create powerful scraping workflows. However, advanced users can also use our API and custom code actions for more complex scenarios.",
  },
  {
    category: "general",
    question: "What kind of support do you offer?",
    answer:
      "We offer comprehensive support including documentation, tutorials, API references, and direct support channels. Premium users get priority support with faster response times and dedicated assistance for complex workflows.",
  },
];

export const features = [
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "Access data from websites worldwide with our distributed infrastructure.",
  },
  {
    icon: Database,
    title: "Powerful Extraction",
    description:
      "Extract structured data from any website with our advanced algorithms.",
  },
  {
    icon: Bot,
    title: "AI-Powered",
    description:
      "Leverage our AI to automatically identify and extract relevant data.",
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description:
      "Create custom workflows to automate your data collection process.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Your data is protected with enterprise-grade security measures.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get your data in seconds with our high-performance infrastructure.",
  },
];

export const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features", icon: "✨" },
      { label: "How It Works", href: "#howItWorks", icon: "🔧" },
      { label: "Pricing", href: "#pricing", icon: "💎" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.gg/fusionflow", icon: "💬" },
      { label: "Twitter", href: "https://twitter.com/fusionflow", icon: "🐦" },
      { label: "GitHub", href: "https://github.com/fusionflow", icon: "💻" },
    ],
  },
];

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/fusionflow",
    icon: Github,
    className: "bg-zinc-900",
    iconClassName: "text-zinc-300 group-hover:text-white",
    shape: "rounded-lg",
    animation: "hover:rotate-3 hover:translate-y-[-2px]",
    glowColor: "group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    borderColor: "border-zinc-800",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/fusionflow",
    icon: Twitter,
    className: "bg-sky-500/10",
    iconClassName: "text-sky-400 group-hover:text-sky-300",
    shape: "rounded-full",
    animation: "hover:rotate-[-3deg] hover:translate-y-[-2px]",
    glowColor: "group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]",
    borderColor: "border-sky-500/20",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/fusionflow",
    icon: Linkedin,
    className: "bg-blue-500/10",
    iconClassName: "text-blue-400 group-hover:text-blue-300",
    shape: "rounded-lg",
    animation: "hover:rotate-3 hover:translate-y-[-2px]",
    glowColor: "group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    borderColor: "border-blue-500/20",
  },
  {
    label: "Email",
    href: "mailto:hello@fusionflow.com",
    icon: Mail,
    className: "bg-rose-500/10",
    iconClassName: "text-rose-400 group-hover:text-rose-300",
    shape: "rounded-full",
    animation: "hover:rotate-[-3deg] hover:translate-y-[-2px]",
    glowColor: "group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    borderColor: "border-rose-500/20",
  },
];
