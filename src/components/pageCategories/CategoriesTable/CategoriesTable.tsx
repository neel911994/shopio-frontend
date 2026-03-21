"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Table, type Column } from "@/components/shared";
import type { Category } from "@/services/categories.service";

type CategoryRow = {
  id:            string;
  name:          string;
  productCount:  number;
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

  return (
    <Table
      columns={columns}
      data={rows}
      keyField="id"
      onCellAction={handleCategoryClick}
      emptyMessage="No categories found"
    />
  );
}
