"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Table, MobileCardList, type Column, type CardConfig } from "@/components/shared";
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

  const cardConfig: CardConfig<CustomerRow> = {
    title: (row) => (
      <button
        onClick={() => handleCustomerClick(row)}
        className="font-medium text-indigo-400 hover:text-indigo-300 text-left"
      >
        {row.name}
      </button>
    ),
    subtitle: (row) => row.email,
    meta: [
      { value: (row) => row.phone },
      { label: "Orders:", value: (row) => row.totalOrders },
    ],
    trailing: (row) => (
      <span className="text-xs text-gray-400">{row.joined}</span>
    ),
  };

  return (
    <>
      <div className="hidden sm:block">
        <Table
          columns={columns}
          data={rows}
          keyField="id"
          onCellAction={handleCustomerClick}
          emptyMessage="No customers found"
        />
      </div>
      <div className="sm:hidden">
        <MobileCardList
          data={rows}
          cardConfig={cardConfig}
          keyExtractor={(row) => row.id}
          onCardClick={handleCustomerClick}
          emptyMessage="No customers found"
        />
      </div>
    </>
  );
}
