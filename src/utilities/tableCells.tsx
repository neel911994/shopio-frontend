"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

function useModalNav(key: string, value: string) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  return () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };
}

export function ProductNameCell({ id, name }: { id: string; name: string }) {
  const navigate = useModalNav("productId", id);
  return (
    <button onClick={navigate} className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors text-left">
      {name}
    </button>
  );
}

export function OrderIdCell({ orderId, shortId }: { orderId: string; shortId: string }) {
  const navigate = useModalNav("orderId", orderId);
  return (
    <button onClick={navigate} className="font-mono text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
      {shortId}
    </button>
  );
}

export function CustomerNameCell({ id, name }: { id: string; name: string }) {
  const navigate = useModalNav("customerId", id);
  return (
    <button onClick={navigate} className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors text-left">
      {name}
    </button>
  );
}

export function CategoryNameCell({ id, name }: { id: string; name: string }) {
  const navigate = useModalNav("categoryId", id);
  return (
    <button onClick={navigate} className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors text-left">
      {name}
    </button>
  );
}
