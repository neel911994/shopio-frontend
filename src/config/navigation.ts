import {
  HomeIcon,
  ClipboardIcon,
  PackageIcon,
  UsersIcon,
  BoxIcon,
} from "@/components/svg";
import type { ComponentType } from "react";

export interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    ],
  },
  {
    label: "Management",
    items: [
      { href: "/orders", label: "Orders", icon: ClipboardIcon },
      { href: "/products", label: "Products", icon: PackageIcon },
      { href: "/customers", label: "Customers", icon: UsersIcon },
      { href: "/categories", label: "Categories", icon: BoxIcon },
    ],
  },
];

// Flat list used by mobile bottom nav and PageTitle lookup
export const allNavItems: NavItem[] = navSections.flatMap(
  (section) => section.items
);