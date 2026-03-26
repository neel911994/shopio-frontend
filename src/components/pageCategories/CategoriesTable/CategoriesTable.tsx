"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Table, MobileCardList, type Column, type CardConfig } from "@/components/shared";
import type { Category } from "@/services/categories.service";

type CategoryRow = {
  id:           string;
  name:         string;
  productCount: number;
};

const columns: Column<CategoryRow>[] = [
  { key: "name",         header: "Category", type: "action" },
  { key: "productCount", header: "Products", type: "text" },
];

interface CategoriesTableProps {
  categories: Category[];
}

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleCategoryClick(row: CategoryRow) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("categoryId", row.id);
    router.push(`${pathname}?${params.toString()}`);
  }

  const rows: CategoryRow[] = categories.map((c) => ({
    id:           c.id,
    name:         c.name,
    productCount: c._count.products,
  }));

  const cardConfig: CardConfig<CategoryRow> = {
    title: (row) => (
      <button
        onClick={() => handleCategoryClick(row)}
        className="font-medium text-indigo-400 hover:text-indigo-300 text-left"
      >
        {row.name}
      </button>
    ),
    trailing: (row) => (
      <span className="text-xs text-gray-400">{row.productCount} products</span>
    ),
  };

  return (
    <>
      <div className="hidden sm:block">
        <Table
          columns={columns}
          data={rows}
          keyField="id"
          onCellAction={handleCategoryClick}
          emptyMessage="No categories found"
        />
      </div>
      <div className="sm:hidden">
        <MobileCardList
          data={rows}
          cardConfig={cardConfig}
          keyExtractor={(row) => row.id}
          onCardClick={handleCategoryClick}
          emptyMessage="No categories found"
        />
      </div>
    </>
  );
}
