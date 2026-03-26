"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CustomerFiltersProps {
  search?: string;
}

export default function CustomerFilters({ search = "" }: CustomerFiltersProps) {
  const [localSearch, setLocalSearch] = useState(search);
  const router = useRouter();

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const qs = localSearch ? `?search=${encodeURIComponent(localSearch)}` : "";
      router.push(`/customers${qs}`);
    }
  }

  return (
    <div className="relative w-full sm:w-64">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        placeholder="Search by name or phone..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border border-gray-700 bg-gray-900 py-1.5 pl-9 pr-3 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
      />
    </div>
  );
}