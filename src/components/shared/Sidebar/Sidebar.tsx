"use client";

import Link from "next/link";
import { navSections, allNavItems, type NavItem } from "@/config/navigation";
import { useNavigation } from "@/context/NavigationContext";
import { logoutAction } from "@/actions/auth.actions";

function NavLink({ item }: { item: NavItem }) {
  const { activeItem } = useNavigation();
  const isActive = activeItem?.href === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-gray-700/60 text-white"
          : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
      }`}
    >
      <Icon size={18} className={isActive ? "text-indigo-400" : "text-gray-500"} />
      {item.label}
    </Link>
  );
}

function MobileNavLink({ item }: { item: NavItem }) {
  const { activeItem } = useNavigation();
  const isActive = activeItem?.href === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-medium transition-colors ${
        isActive ? "text-indigo-400" : "text-gray-500 hover:text-gray-300"
      }`}
    >
      <Icon size={20} />
      {item.label}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden sm:flex flex-col w-60 flex-shrink-0 border-r border-gray-800 bg-[#0f1117]">
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout — pinned to bottom */}
        <div className="px-3 py-4 border-t border-gray-800">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18} height={18} viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-gray-800 bg-[#0f1117] px-1">
        {allNavItems.map((item) => (
          <MobileNavLink key={item.href} item={item} />
        ))}
      </nav>
    </>
  );
}