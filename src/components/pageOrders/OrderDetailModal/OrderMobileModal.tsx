"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { editOrderStatusAction } from "@/actions/orders.actions";
import type { OrderStatus, OrderProductDetail } from "@/services/orders.service";

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING:   "bg-amber-500/15 text-amber-400",
  PAID:      "bg-purple-500/15 text-purple-400",
  SHIPPED:   "bg-blue-500/15 text-blue-400",
  DELIVERED: "bg-emerald-500/15 text-emerald-400",
  CANCELLED: "bg-red-500/15 text-red-400",
};

const STATUS_SELECT_COLOR: Record<OrderStatus, string> = {
  PENDING:   "text-amber-400",
  PAID:      "text-purple-400",
  SHIPPED:   "text-blue-400",
  DELIVERED: "text-emerald-400",
  CANCELLED: "text-red-400",
};

const ALL_STATUSES: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING:   "⏳  Pending",
  PAID:      "💳  Paid",
  SHIPPED:   "📦  Shipped",
  DELIVERED: "✅  Delivered",
  CANCELLED: "✕  Cancelled",
};

type Tab = "items" | "status" | "customer";

interface OrderMobileModalProps {
  orderId:      string;
  shortId:      string;
  status:       OrderStatus;
  customerName: string;
  totalAmount:  number;
  itemCount:    number;
  createdAt:    string;
  products:     OrderProductDetail[];
}

export default function OrderMobileModal({
  orderId, shortId, status, customerName, totalAmount, itemCount, createdAt, products,
}: OrderMobileModalProps) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const [tab, setTab]           = useState<Tab>("items");
  const [selected, setSelected] = useState<OrderStatus>(status);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const initials = customerName.charAt(0).toUpperCase();

  function handleClose() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("orderId");
    router.push(`${pathname}?${params.toString()}`);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await editOrderStatusAction(orderId, selected);
      router.refresh();
      handleClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

      {/* Sheet */}
      <div className="relative z-10 flex flex-col rounded-t-2xl border border-gray-700 bg-gray-900 max-h-[92vh] overflow-hidden">

        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-9 rounded-full bg-gray-700" />
        </div>

        {/* Header */}
        <div className="shrink-0 px-4 pb-3 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-sm font-bold text-indigo-400">{shortId}</span>
            <button
              onClick={handleClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-bold text-white">
              {initials}
            </div>
            <span className="text-sm font-semibold text-white">{customerName}</span>
            <span className="text-gray-600">·</span>
            <span className="text-xs text-gray-400">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
            <span className="text-gray-600">·</span>
            <span className="text-xs font-semibold text-white">₹{Math.round(totalAmount).toLocaleString("en-IN")}</span>
            <span className="text-gray-600">·</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[status]}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 border-b border-gray-700/50">
          {(["items", "status", "customer"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-colors border-b-2 ${
                tab === t
                  ? "text-indigo-400 border-indigo-400"
                  : "text-gray-500 border-transparent hover:text-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* ── ITEMS TAB ── */}
          {tab === "items" && (
            <div>
              {/* Order info */}
              <div className="px-4 py-4 border-b border-gray-700/50 space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Order Information</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Order ID</span>
                  <span className="font-mono text-indigo-400">{shortId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="text-white">{createdAt}</span>
                </div>
              </div>

              {/* Items */}
              <div className="px-4 py-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Order Items
                  <span className="ml-2 rounded-full bg-indigo-500/15 px-2 py-0.5 text-indigo-400 normal-case font-bold">{products.length}</span>
                </p>
                {products.map((p) => (
                  <div key={p.productId} className="rounded-lg border border-gray-700 bg-gray-800 p-3">
                    <p className="text-sm font-semibold text-white mb-0.5">{p.productName}</p>
                    <p className="text-xs text-gray-500 mb-2.5">{p.categoryName}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-bold text-amber-400">
                          Qty: {p.quantity}
                        </span>
                        <span>× ₹{Math.round(p.price).toLocaleString("en-IN")}</span>
                      </div>
                      <span className="text-sm font-bold text-white">
                        ₹{Math.round(p.price * p.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between border-t border-gray-700 pt-3 text-sm">
                  <span className="text-gray-400 font-medium">Subtotal</span>
                  <span className="font-bold text-white text-base">₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          )}

          {/* ── STATUS TAB ── */}
          {tab === "status" && (
            <div className="px-4 py-4 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Order Status</p>

              <div className="relative">
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value as OrderStatus)}
                  className={`w-full appearance-none rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm font-semibold focus:border-indigo-500 focus:outline-none ${STATUS_SELECT_COLOR[selected]}`}
                >
                  {ALL_STATUSES.map((s) => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <p className="text-xs text-gray-500">Changing status will notify the customer by email.</p>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setSelected(status)}
                  className="rounded-lg border border-gray-700 bg-gray-800 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || selected === status}
                  className="rounded-lg bg-indigo-600 py-2.5 text-sm font-bold text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>

              <button
                onClick={() => setShowConfirm(true)}
                className="w-full rounded-lg border border-red-800/60 bg-red-500/8 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/15 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>✕</span> Cancel Order
              </button>
            </div>
          )}

          {/* ── CUSTOMER TAB ── */}
          {tab === "customer" && (
            <div>
              <div className="px-4 py-4 border-b border-gray-700/50">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Customer</p>
                <div className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{customerName}</p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Order Summary</p>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Order ID</span>
                    <span className="font-mono text-indigo-400">{shortId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="text-white">{createdAt}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Items</span>
                    <span className="text-white">{itemCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total</span>
                    <span className="font-semibold text-white">₹{Math.round(totalAmount).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[status]}`}>
                      {status.charAt(0) + status.slice(1).toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Cancel confirm overlay */}
      {showConfirm && (
        <div className="absolute inset-0 z-20 flex items-end justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-red-900/40 bg-gray-900 p-6">
            <p className="text-center text-3xl mb-2">⚠️</p>
            <p className="text-center text-base font-bold text-white mb-1">Cancel this order?</p>
            <p className="text-center text-xs text-gray-400 mb-5 leading-relaxed">
              This will cancel <span className="text-white font-semibold">{shortId}</span> for{" "}
              <span className="text-white font-semibold">{customerName}</span>.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-gray-700 bg-gray-800 py-2.5 text-sm font-semibold text-gray-300"
              >
                Go Back
              </button>
              <button
                onClick={async () => {
                  setShowConfirm(false);
                  setSelected("CANCELLED");
                  setSaving(true);
                  try {
                    await editOrderStatusAction(orderId, "CANCELLED");
                    router.refresh();
                    handleClose();
                  } finally {
                    setSaving(false);
                  }
                }}
                className="rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white hover:bg-red-500"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
