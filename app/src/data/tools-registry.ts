import {
  Copy,
  Cookie,
  FileText,
  Globe,
  ImagePlus,
  ListFilter,
  Merge,
  Scissors,
  Shield,
  StickyNote,
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
    title: "Cookie Converter",
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
    title: "Split Data",
    description: "Split text by delimiter into separate columns",
    icon: Scissors,
    category: "data",
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
  },
  {
    slug: "batch-watermark",
    title: "Batch Watermark",
    description: "Add watermark to multiple images at once",
    icon: ImagePlus,
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
