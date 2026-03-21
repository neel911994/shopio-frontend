"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { StockFilter } from "@/services/products.service";

const STOCK_FILTERS: { label: string; value: StockFilter | undefined }[] = [
  { label: "All",          value: undefined },
  { label: "In Stock",     value: "inStock" },
  { label: "Low Stock",    value: "lowStock" },
  { label: "Out of Stock", value: "outOfStock" },
];

interface Category {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  activeStock?: StockFilter;
  activeCategoryId?: string;
  search?: string;
  categories?: Category[];
}

export default function ProductFilters({
  activeStock,
  activeCategoryId,
  search = "",
  categories = [],
}: ProductFiltersProps) {
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState(search);

  function buildUrl(overrides: {
    stockFilter?: StockFilter | undefined;
    categoryId?: string | undefined;
    search?: string;
  }) {
    const params = new URLSearchParams();
    const stock      = "stockFilter" in overrides ? overrides.stockFilter  : activeStock;
    const categoryId = "categoryId"  in overrides ? overrides.categoryId   : activeCategoryId;
    const q          = "search"      in overrides ? overrides.search        : localSearch;
    if (stock)      params.set("stockFilter", stock);
    if (categoryId) params.set("categoryId",  categoryId);
    if (q)          params.set("search",      q);
    const qs = params.toString();
    return qs ? `/products?${qs}` : "/products";
  }

  function handleStock(value: StockFilter | undefined) {
    router.push(buildUrl({ stockFilter: value }));
  }

  function handleCategory(id: string | undefined) {
    router.push(buildUrl({ categoryId: id }));
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(buildUrl({ search: localSearch }));
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: category pills (lhs) + search + stock dropdown (rhs) */}
      <div className="flex flex-row gap-3 justify-between w-full">
        <div className="flex flex-nowrap gap-1">
          <button
            onClick={() => handleCategory(undefined)}
            className={`rounded-full px-2 py-1.5 text-sm font-medium transition-colors ${
              !activeCategoryId ? "text-white font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`rounded-full px-2 py-1.5 text-sm font-medium transition-colors ${
                activeCategoryId === cat.id ? "text-white font-semibold" : "text-gray-400 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search product..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="rounded-lg border border-gray-700 bg-gray-900 py-1.5 pl-9 pr-3 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none w-48"
            />
          </div>

          {/* Stock filter dropdown */}
          <select
            value={activeStock ?? ""}
            onChange={(e) => handleStock((e.target.value as StockFilter) || undefined)}
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
          >
            {STOCK_FILTERS.map((f) => (
              <option key={f.label} value={f.value ?? ""}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}