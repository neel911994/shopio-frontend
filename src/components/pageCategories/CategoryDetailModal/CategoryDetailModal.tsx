import { categoriesService } from "@/services/categories.service";
import CategoryModalOverlay from "./CategoryModalOverlay";

function stockBadge(stock: number) {
  if (stock === 0) return { label: "Out of Stock", cls: "bg-red-500/15 text-red-400" };
  if (stock <= 4)  return { label: "Low Stock",    cls: "bg-amber-500/15 text-amber-400" };
  return                  { label: "In Stock",     cls: "bg-emerald-500/15 text-emerald-400" };
}

export default async function CategoryDetailModal({ categoryId }: { categoryId: string }) {
  const category = await categoriesService.getCategory(categoryId);

  return (
    <CategoryModalOverlay categoryName={category.name}>
      <div className="overflow-y-auto px-6 pb-6 space-y-4">
        {/* Summary */}
        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Total Products</p>
          <p className="text-2xl font-bold text-white">{category.products.length}</p>
        </div>

        {/* Products list */}
        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Products</p>
          <div className="divide-y divide-gray-700">
            {category.products.map((product) => {
              const badge = stockBadge(product.stock);
              return (
                <div key={product.id} className="flex items-center justify-between py-2.5 gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{product.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-400">Stock: {product.stock}</span>
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${badge.cls}`}>
                      {badge.label}
                    </span>
                    <span className={`text-xs font-semibold ${product.isActive ? "text-emerald-400" : "text-gray-500"}`}>
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              );
            })}
            {category.products.length === 0 && (
              <p className="text-sm text-gray-500 py-4 text-center">No products in this category.</p>
            )}
          </div>
        </div>
      </div>
    </CategoryModalOverlay>
  );
}
