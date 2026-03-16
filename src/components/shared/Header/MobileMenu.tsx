"use client";

import { useState } from "react";
import { Avatar } from "@/components/shared";
import { logoutAction } from "@/actions/auth.actions";

interface MobileMenuProps {
  userName?: string;
}

export default function MobileMenu({ userName = "Admin" }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        type="button"
        className="sm:hidden flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <line x1="3" y1="6" x2="17" y2="6" />
          <line x1="3" y1="11" x2="17" y2="11" />
          <line x1="3" y1="16" x2="17" y2="16" />
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 bottom-0 z-50 flex w-72 flex-col bg-[#0f1117] border-l border-gray-800 shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <span className="text-sm font-semibold text-white">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <line x1="4" y1="4" x2="14" y2="14" />
                  <line x1="14" y1="4" x2="4" y2="14" />
                </svg>
              </button>
            </div>

            {/* Profile section */}
            <div className="flex items-center gap-4 px-5 py-5 border-b border-gray-800">
              <Avatar name={userName} size="md" />
              <div>
                <p className="text-sm font-semibold text-white">{userName}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>

            <div className="flex-1" />

            {/* Logout */}
            <div className="px-4 py-5 border-t border-gray-800">
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-red-400"
                >
                  <svg
                    width={18} height={18} viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth={2}
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
