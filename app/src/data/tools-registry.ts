import {
  Code,
  Copy,
  Cookie,
  FileSearch,
  FileText,
  Filter,
  Globe,
  IdCard,
  Image,
  ImagePlus,
  LayoutGrid,
  ListFilter,
  Merge,
  ScanFace,
  Scissors,
  Shield,
  Smile,
  StickyNote,
  UserSearch,
  type LucideIcon,
} from "lucide-react";

export type ToolCategory = "security" | "data" | "utility";

export type ToolItem = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
  /** Show in featured section on hub page */
  featured?: boolean;
};

export type ToolCategoryInfo = {
  id: ToolCategory;
  label: string;
};

export const TOOL_CATEGORIES: ToolCategoryInfo[] = [
  { id: "security", label: "Security" },
  { id: "data", label: "Data Processing" },
  { id: "utility", label: "Utilities" },
];

export const TOOLS: ToolItem[] = [
  // Security
  {
    slug: "2fa",
    title: "2FA Generator",
    description: "Generate TOTP codes from your 2FA secrets",
    icon: Shield,
    category: "security",
    featured: true,
  },
  {
    slug: "cookie",
    title: "Log In by Cookie",
    description: "Convert JSON cookies to UID|Pass|Cookie format",
    icon: Cookie,
    category: "security",
    featured: true,
  },

  // Data Processing
  {
    slug: "filter",
    title: "Account Filter",
    description: "Parse & reformat account data with flexible output",
    icon: ListFilter,
    category: "data",
    featured: true,
  },
  {
    slug: "split-data",
    title: "Split Data Profile",
    description: "Split text by delimiter into separate columns",
    icon: Scissors,
    category: "data",
    featured: true,
  },
  {
    slug: "remove-duplicates",
    title: "Remove Duplicates",
    description: "Remove or highlight duplicate lines from text",
    icon: Copy,
    category: "data",
  },
  {
    slug: "merge",
    title: "Filter & Merge",
    description: "Combine multiple text sources and merge by key",
    icon: Merge,
    category: "data",
  },

  // Utilities
  {
    slug: "notepad",
    title: "Online Notepad",
    description: "Quick notes saved in your browser",
    icon: StickyNote,
    category: "utility",
  },
  {
    slug: "check-ip",
    title: "IP Checker",
    description: "View your public IP address and location info",
    icon: Globe,
    category: "utility",
    featured: true,
  },
  {
    slug: "batch-watermark",
    title: "Batch Watermark",
    description: "Add watermark to multiple images at once",
    icon: ImagePlus,
    category: "utility",
  },

  // New tools
  {
    slug: "check-duplicates",
    title: "Check Duplicates",
    description: "Report duplicate lines without removing them",
    icon: FileSearch,
    category: "data",
  },
  {
    slug: "find-fb-id",
    title: "Find Facebook ID",
    description: "Extract numeric IDs from Facebook profile URLs",
    icon: UserSearch,
    category: "utility",
  },
  {
    slug: "fb-icons",
    title: "Facebook Icons",
    description: "Copy unicode emoji icons for social media marketing",
    icon: Smile,
    category: "utility",
  },
  {
    slug: "filter-text",
    title: "Filter Text",
    description: "Filter lines by keyword or length conditions",
    icon: Filter,
    category: "data",
  },
  {
    slug: "check-content",
    title: "Check Content",
    description: "Analyze text: word count, emails, URLs, and more",
    icon: FileText,
    category: "utility",
  },
  {
    slug: "mini-tools",
    title: "All Tools",
    description: "Browse all available tools in one place",
    icon: LayoutGrid,
    category: "utility",
  },
  {
    slug: "bookmarklets",
    title: "Bookmarklet Scripts",
    description: "Useful JS bookmarklets for ad account management",
    icon: Code,
    category: "utility",
  },

  // Phase 2 tools
  {
    slug: "check-uid",
    title: "Check Live UID",
    description: "Check if Facebook UIDs are live or dead accounts",
    icon: ScanFace,
    category: "security",
  },
  {
    slug: "fake-id",
    title: "Fake ID Generator",
    description: "Generate fictional ID card images for testing purposes",
    icon: IdCard,
    category: "utility",
  },
  {
    slug: "random-face",
    title: "Random Face Generator",
    description: "Generate random avatar photos instantly",
    icon: Image,
    category: "utility",
  },
];

/** Get tools filtered by category */
export function getToolsByCategory(category: ToolCategory): ToolItem[] {
  return TOOLS.filter((t) => t.category === category);
}

/** Get featured tools for hub page */
export function getFeaturedTools(): ToolItem[] {
  return TOOLS.filter((t) => t.featured);
}

/** Find a tool by slug */
export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
