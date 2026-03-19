"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function OrderModalOverlay({ children, shortId }: { children: React.ReactNode; shortId: string }) {
  const router   = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleClose() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("orderId");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />
      <div className="relative z-10 w-full max-w-4xl rounded-xl border border-gray-700 bg-gray-900 shadow-2xl flex flex-col max-h-[90vh]">
        {/* close button row */}
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-3 shrink-0">
          <span className="font-mono text-sm font-semibold text-indigo-400">{shortId}</span>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
