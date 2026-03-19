"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { editOrderStatusAction } from "@/actions/orders.actions";
import type { OrderStatus } from "@/services/orders.service";

const ALL_STATUSES: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

interface OrderStatusActionsProps {
  orderId: string;
  currentStatus: OrderStatus;
}

export default function OrderStatusActions({ orderId, currentStatus }: OrderStatusActionsProps) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<OrderStatus>(currentStatus);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState<string | null>(null);

  function closeModal() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("orderId");
    router.push(`${pathname}?${params.toString()}`);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await editOrderStatusAction(orderId, selected);
      closeModal();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-2">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as OrderStatus)}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
      >
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500">Changing status will notify the customer.</p>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex gap-2 pt-1">
        <button
          onClick={closeModal}
          className="flex-1 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Discard
        </button>
        <button
          onClick={handleSave}
          disabled={saving || selected === currentStatus}
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
      <button
        onClick={() => setSelected("CANCELLED")}
        className="w-full rounded-lg border border-red-800 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
      >
        × Cancel Order
      </button>
    </div>
  );
}
