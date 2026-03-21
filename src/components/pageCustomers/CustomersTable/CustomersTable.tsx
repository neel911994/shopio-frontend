"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Table, type Column } from "@/components/shared";
import type { Customer } from "@/services/customers.service";

type CustomerRow = {
  id:          string;
  name:        string;
  email:       string;
  phone:       string;
  totalOrders: number;
  joined:      string;
};

const columns: Column<CustomerRow>[] = [
  { key: "name",        header: "Name",         type: "action" },
  { key: "email",       header: "Email",        type: "text" },
  { key: "phone",       header: "Phone",        type: "text" },
  { key: "totalOrders", header: "Total Orders", type: "text" },
  { key: "joined",      header: "Joined",       type: "text" },
];

interface CustomersTableProps {
  customers: Customer[];
}

export default function CustomersTable({ customers }: CustomersTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleCustomerClick(row: CustomerRow) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("customerId", row.id);
    router.push(`${pathname}?${params.toString()}`);
  }

  const rows: CustomerRow[] = customers.map((c) => ({
    id:          c.id,
    name:        c.name,
    email:       c.email,
    phone:       c.phone,
    totalOrders: c.totalOrders,
    joined:      new Date(c.createdAt).toLocaleDateString("en-IN", {
      day:   "2-digit",
      month: "short",
      year:  "numeric",
    }),
  }));

  return (
    <Table
      columns={columns}
      data={rows}
      keyField="id"
      onCellAction={handleCustomerClick}
      emptyMessage="No customers found"
    />
  );
}
