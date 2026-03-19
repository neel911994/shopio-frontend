import { ordersService, type OrderStatus } from "@/services/orders.service";
import OrderModalOverlay from "./OrderModalOverlay";
import OrderStatusActions from "./OrderStatusActions";

const statusStyles: Record<OrderStatus, string> = {
  PENDING:   "bg-amber-500/15 text-amber-400",
  PAID:      "bg-purple-500/15 text-purple-400",
  SHIPPED:   "bg-blue-500/15 text-blue-400",
  DELIVERED: "bg-emerald-500/15 text-emerald-400",
  CANCELLED: "bg-red-500/15 text-red-400",
};

interface OrderDetailModalProps {
  orderId: string;
  shortId: string;
  status: OrderStatus;
  customerName: string;
  totalAmount: number;
  itemCount: number;
  createdAt: string;
}

export default async function OrderDetailModal({
  orderId, shortId, status, customerName, totalAmount, itemCount, createdAt,
}: OrderDetailModalProps) {
  const order = await ordersService.getOrder(orderId);
  const subtotal = order.products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <OrderModalOverlay shortId={shortId}>
      {/* Header info */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-700 shrink-0 flex-wrap">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shrink-0">
          {customerName.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-white">{customerName}</span>
        <span className="text-gray-600">·</span>
        <span className="text-sm text-gray-400">{itemCount} items</span>
        <span className="text-gray-600">·</span>
        <span className="text-sm font-semibold text-white">
          ₹{Math.round(totalAmount).toLocaleString("en-IN")}
        </span>
        <span className="text-gray-600">·</span>
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${statusStyles[status]}`}>
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — Order Items */}
        <div className="flex-1 overflow-y-auto border-r border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-white">Order Details</h3>
            <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${statusStyles[status]}`}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
            Order Items <span className="ml-1 text-gray-400">{order.products.length}</span>
          </p>

          <div className="divide-y divide-gray-800 rounded-lg border border-gray-700">
            {order.products.map((p) => (
              <div key={p.productId} className="flex items-center justify-between px-4 py-3 gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{p.productName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{p.categoryName}</p>
                </div>
                <div className="flex items-center gap-6 shrink-0 text-sm">
                  <span className="text-gray-400">Qty: <span className="text-white font-medium">{p.quantity}</span></span>
                  <span className="text-gray-400">₹{Math.round(p.price).toLocaleString("en-IN")}</span>
                  <span className="font-semibold text-white w-24 text-right">
                    ₹{Math.round(p.price * p.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between border-t border-gray-700 pt-4 text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-semibold text-white">₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Right — Info & Actions */}
        <div className="w-72 shrink-0 overflow-y-auto p-6 flex flex-col gap-5">
          {/* Order Information */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Order Information</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID</span>
                <span className="font-mono text-indigo-400">{shortId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date</span>
                <span className="text-white">{createdAt}</span>
              </div>
            </div>
          </div>

          {/* Order Status — client island */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Order Status</p>
            <OrderStatusActions orderId={orderId} currentStatus={status} />
          </div>

          {/* Customer */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Customer</p>
            <div className="text-sm flex justify-between">
              <span className="text-gray-400">Name</span>
              <span className="text-white">{customerName}</span>
            </div>
          </div>
        </div>
      </div>
    </OrderModalOverlay>
  );
}