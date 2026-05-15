import { Chrome, Globe, ScanFace, Scissors, Shield, type LucideIcon } from "lucide-react";

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
    slug: "check-uid",
    title: "Check Live UID",
    description: "Check if Facebook UIDs are live or dead accounts",
    icon: ScanFace,
    category: "security",
    featured: true,
  },

  // Data Processing
  {
    slug: "split-data",
    title: "Split Data Profile",
    description: "Split text by delimiter into separate columns",
    icon: Scissors,
    category: "data",
    featured: true,
  },

  // Utilities
  {
    slug: "check-ip",
    title: "IP Checker",
    description: "View your public IP address and location info",
    icon: Globe,
    category: "utility",
    featured: true,
  },
  {
    slug: "goads-extension",
    title: "GOADS Extension",
    description: "Free Chrome extension — bypass BM invites, login by cookie",
    icon: Chrome,
    category: "utility",
    featured: true,
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
