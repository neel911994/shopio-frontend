import type { Product } from "@/services/products.service";
import type { ProductRow } from "@/models/tableRows";
import { getStockLabel, productColumns, productCardConfig } from "@/utilities/tableConfig";
import { Table, MobileCardList } from "@/components/shared";

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const rows: ProductRow[] = products.map((p) => ({
    id:           p.id,
    name:         p.name,
    categoryName: p.category.name,
    price:        p.price,
    stock:        p.stock,
    stockLabel:   getStockLabel(p.stock),
    isActive:     p.isActive,
  }));

  return (
    <>
      <div className="hidden sm:block">
        <Table
          columns={productColumns}
          data={rows}
          keyField="id"
          emptyMessage="No products found"
        />
      </div>
      <div className="sm:hidden">
        <MobileCardList
          data={rows}
          cardConfig={productCardConfig}
          keyExtractor={(row) => row.id}
          emptyMessage="No products found"
        />
      </div>
    </>
  );
}
