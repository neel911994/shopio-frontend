import type { Category } from "@/services/categories.service";
import type { CategoryRow } from "@/models/tableRows";
import { categoryColumns, categoryCardConfig } from "@/utilities/tableConfig";
import { Table, MobileCardList } from "@/components/shared";

interface CategoriesTableProps {
  categories: Category[];
}

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const rows: CategoryRow[] = categories.map((c) => ({
    id:           c.id,
    name:         c.name,
    productCount: c._count.products,
  }));

  return (
    <>
      <div className="hidden sm:block">
        <Table
          columns={categoryColumns}
          data={rows}
          keyField="id"
          emptyMessage="No categories found"
        />
      </div>
      <div className="sm:hidden">
        <MobileCardList
          data={rows}
          cardConfig={categoryCardConfig}
          keyExtractor={(row) => row.id}
          emptyMessage="No categories found"
        />
      </div>
    </>
  );
}
