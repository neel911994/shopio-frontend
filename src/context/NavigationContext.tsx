"use client";

import { createContext, useContext, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { allNavItems, type NavItem } from "@/config/navigation";

interface NavigationContextType {
  activeItem: NavItem | undefined;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const activeItem = allNavItems.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  );

  return (
    <NavigationContext.Provider value={{ activeItem }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}