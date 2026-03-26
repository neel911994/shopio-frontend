import Products from "@/components/pageProducts/Products/Products";

export const dynamic = 'force-dynamic';
import type { StockFilter } from "@/services/products.service";

interface PageProps {
  searchParams: Promise<{
    stockFilter?: string;
    categoryId?: string;
    search?: string;
    page?: string;
    limit?: string;
    productId?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <Products
      stockFilter={params.stockFilter as StockFilter | undefined}
      categoryId={params.categoryId}
      search={params.search}
      page={params.page ? Number(params.page) : undefined}
      limit={params.limit ? Number(params.limit) : undefined}
      productId={params.productId}
    />
  );
}
