import type { Customer } from "@/services/customers.service";
import type { CustomerRow } from "@/models/tableRows";
import { customerColumns, customerCardConfig } from "@/utilities/tableConfig";
import { Table, MobileCardList } from "@/components/shared";

interface CustomersTableProps {
  customers: Customer[];
}

export default function CustomersTable({ customers }: CustomersTableProps) {
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
    <>
      <div className="hidden sm:block">
        <Table
          columns={customerColumns}
          data={rows}
          keyField="id"
          emptyMessage="No customers found"
        />
      </div>
      <div className="sm:hidden">
        <MobileCardList
          data={rows}
          cardConfig={customerCardConfig}
          keyExtractor={(row) => row.id}
          emptyMessage="No customers found"
        />
      </div>
    </>
  );
}
