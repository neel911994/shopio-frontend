import { productsService, type StockFilter } from "@/services/products.service";
import ProductStatCards from "@/components/pageProducts/ProductStatCards/ProductStatCards";
import ProductFilters from "@/components/pageProducts/ProductFilters/ProductFilters";
import ProductsTable from "@/components/pageProducts/ProductsTable/ProductsTable";
import ProductsPagination from "@/components/pageProducts/Pagination/Pagination";
import ProductDetailModal from "@/components/pageProducts/ProductDetailModal/ProductDetailModal";
import CreateProductModal from "@/components/pageProducts/CreateProductModal/CreateProductModal";

interface ProductsProps {
  stockFilter?: StockFilter;
  categoryId?: string;
  search?: string;
  page?: number;
  limit?: number;
  productId?: string;
  focusStock?: boolean;
}

export default async function Products({
  stockFilter,
  categoryId,
  search,
  page = 1,
  limit = 10,
  productId,
  focusStock,
}: ProductsProps) {
  const [listResponse, stats] = await Promise.all([
    productsService.listProducts({ stockFilter, categoryId, search, page, limit }),
    productsService.getStats(),
  ]);

  const { products, categories, pagination } = listResponse;

  const productInPage = productId ? products.find((p) => p.id === productId) : null;
  const selectedProduct =
    productInPage ?? (productId ? await productsService.getProduct(productId).catch(() => null) : null);

  // Fallback pagination when API doesn't return one
  const paginationData = pagination ?? {
    total: products.length,
    page,
    limit,
    totalPages: Math.ceil(products.length / limit) || 1,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Products</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your product catalogue.</p>
        </div>
        <CreateProductModal categories={categories} />
      </div>

      <ProductStatCards stats={stats} />

      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <div className="mb-4 flex flex-col gap-2">
          <ProductFilters
            activeStock={stockFilter}
            activeCategoryId={categoryId}
            search={search}
            categories={categories}
          />
          <p className="text-sm text-gray-400 text-right">{paginationData.total} products</p>
        </div>

        <ProductsTable products={products} />

        <ProductsPagination
          page={paginationData.page}
          totalPages={paginationData.totalPages}
          limit={paginationData.limit}
        />
      </div>

      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} focusStock={focusStock} />
      )}
    </div>
  );
}
