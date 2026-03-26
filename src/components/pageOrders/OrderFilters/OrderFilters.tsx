"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { OrderStatus } from "@/services/orders.service";

const STATUS_FILTERS: { label: string; value: OrderStatus | undefined }[] = [
  { label: "All",        value: undefined },
  { label: "Pending",    value: "PENDING" },
  { label: "Paid",       value: "PAID" },
  { label: "Shipped",    value: "SHIPPED" },
  { label: "Delivered",  value: "DELIVERED" },
  { label: "Cancelled",  value: "CANCELLED" },
];

interface OrderFiltersProps {
  activeStatus?: OrderStatus;
  startDate?: string;
  endDate?: string;
  customerName?: string;
}

export default function OrderFilters({ activeStatus, startDate = "", endDate = "", customerName = "" }: OrderFiltersProps) {
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState(customerName);
  const [localStart, setLocalStart]   = useState(startDate);
  const [localEnd, setLocalEnd]       = useState(endDate);

  function buildUrl(overrides: {
    status?: OrderStatus | undefined;
    startDate?: string;
    endDate?: string;
    customerName?: string;
  }) {
    const params = new URLSearchParams();
    const s = "status" in overrides ? overrides.status : activeStatus;
    const sd = "startDate" in overrides ? overrides.startDate : localStart;
    const ed = "endDate"   in overrides ? overrides.endDate   : localEnd;
    const q  = "customerName"    in overrides ? overrides.customerName    : localSearch;
    if (s)  params.set("status",       s);
    if (sd) params.set("startDate",    sd);
    if (ed) params.set("endDate",      ed);
    if (q)  params.set("customerName", q);
    const qs = params.toString();
    return qs ? `/orders?${qs}` : "/orders";
  }

  function handleStatus(value: OrderStatus | undefined) {
    router.push(buildUrl({ status: value }));
  }

  function handleDateChange(field: "startDate" | "endDate", value: string) {
    if (field === "startDate") setLocalStart(value);
    else setLocalEnd(value);
    router.push(buildUrl({ [field]: value }));
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(buildUrl({ customerName: localSearch }));
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Row 1: status pills */}
      <div className="flex flex-nowrap gap-0.5">
        {STATUS_FILTERS.map((f) => {
          const isActive = f.value === activeStatus;
          return (
            <button
              key={f.label}
              onClick={() => handleStatus(f.value)}
              className={`rounded-full px-2 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? "text-white font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Row 2: search + date range */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Customer name search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search customer..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="rounded-lg border border-gray-700 bg-gray-900 py-1.5 pl-9 pr-3 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none w-full sm:w-48"
          />
        </div>

        {/* Date range */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={localStart}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:border-indigo-500 focus:outline-none [color-scheme:dark]"
          />
          <span className="text-gray-500 text-sm">to</span>
          <input
            type="date"
            value={localEnd}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:border-indigo-500 focus:outline-none [color-scheme:dark]"
          />
        </div>
      </div>
    </div>
  );
}