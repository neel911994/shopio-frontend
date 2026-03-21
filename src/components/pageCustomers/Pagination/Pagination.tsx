"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/shared";

interface CustomersPaginationProps {
  page:       number;
  totalPages: number;
  limit:      number;
}

export default function CustomersPagination({ page, totalPages, limit }: CustomersPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page",  String(newPage));
    params.set("limit", String(limit));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-gray-400">Page {page} of {totalPages}</p>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}