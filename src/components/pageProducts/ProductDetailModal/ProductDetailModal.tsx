import type { Product } from "@/services/products.service";
import { updateProductAction } from "@/actions/products.actions";
import { EditForm } from "@/components/shared";
import ProductModalOverlay from "./ProductModalOverlay";

function getStockLabel(stock: number) {
  if (stock === 0) return "Out of Stock";
  if (stock <= 4) return "Low Stock";
  return "In Stock";
}

interface ProductDetailModalProps {
  product: Product;
  focusStock?: boolean;
}

export default function ProductDetailModal({ product, focusStock }: ProductDetailModalProps) {
  return (
    <ProductModalOverlay productName={product.name}>
      {/* Image placeholder */}
      <div className="mx-6 mb-4 flex h-40 items-center justify-center rounded-lg bg-gray-800">
        <svg className="h-16 w-16 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>

      {/* Read-only fields */}
      <div className="grid grid-cols-2 gap-1 px-6">
        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Price</p>
          <p className="text-sm font-bold text-white">₹{Math.round(product.price).toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Category</p>
          <p className="text-sm font-bold text-white">{product.category.name}</p>
        </div>
        <div className="col-span-2 rounded-lg bg-gray-800 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Stock (current)</p>
          <p className="text-sm font-bold text-white">{getStockLabel(product.stock)} ({product.stock})</p>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mx-6 mt-1 rounded-lg bg-gray-800 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Description</p>
          <p className="text-sm text-gray-300">{product.description}</p>
        </div>
      )}

      {/* Editable stock + isActive + buttons */}
      <div className="mt-4">
        <EditForm
          closeParam="productId"
          saveLabel="Edit Product"
          autoFocusField={focusStock ? "stock" : undefined}
          fields={[
            { key: "stock",    label: "Stock",  type: "number", initialValue: product.stock },
            { key: "isActive", label: "Status", type: "toggle", initialValue: product.isActive },
          ]}
          onSave={async (values) => {
            "use server";
            await updateProductAction(product.id, {
              stock:    values.stock    as number,
              isActive: values.isActive as boolean,
            });
          }}
        />
      </div>
    </ProductModalOverlay>
  );
}
