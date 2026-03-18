"use client";

import { useEffect, useState } from "react";
import { getOrderAction, editOrderStatusAction } from "@/actions/orders.actions";
import type { OrderDetail, OrderStatus } from "@/services/orders.service";

const ALL_STATUSES: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

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
  onClose: () => void;
}

export default function OrderDetailModal({
  orderId, shortId, status, customerName, totalAmount, itemCount, createdAt, onClose,
}: OrderDetailModalProps) {
  const [order, setOrder]               = useState<OrderDetail | null>(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(status);
  const [saving, setSaving]             = useState(false);
  const [saveError, setSaveError]       = useState<string | null>(null);

  useEffect(() => {
    getOrderAction(orderId)
      .then(setOrder)
      .catch((e) => setError(e.message ?? "Failed to load order"))
      .finally(() => setLoading(false));
  }, [orderId]);

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      await editOrderStatusAction(orderId, selectedStatus);
      onClose();
    } catch (e: unknown) {
      setSaveError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const subtotal = order?.products.reduce((sum, p) => sum + p.price * p.quantity, 0) ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl rounded-xl border border-gray-700 bg-gray-900 shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-700 px-6 py-4 shrink-0">
          <span className="font-mono text-sm font-semibold text-indigo-400">{shortId}</span>
          <span className="text-gray-600">·</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
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
          <button onClick={onClose} className="ml-auto text-gray-400 hover:text-white transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
              Order Items <span className="ml-1 text-gray-400">{itemCount}</span>
            </p>

            {loading && (
              <div className="flex items-center gap-2 py-8 text-gray-400">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading items...
              </div>
            )}

            {error && <p className="py-8 text-sm text-red-400">{error}</p>}

            {order && (
              <>
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
              </>
            )}
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

            {/* Order Status */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Order Status</p>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-gray-500">Changing status will notify the customer.</p>
            </div>

            {/* Customer */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Customer</p>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name</span>
                  <span className="text-white">{customerName}</span>
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {saveError && <p className="text-xs text-red-400">{saveError}</p>}

            {/* Action buttons */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || selectedStatus === status}
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
              <button
                onClick={() => { setSelectedStatus("CANCELLED"); }}
                className="w-full rounded-lg border border-red-800 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
              >
                × Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}