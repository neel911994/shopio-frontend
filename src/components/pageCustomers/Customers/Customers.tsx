import { customersService } from "@/services/customers.service";
import type { Customer, CustomerPagination } from "@/services/customers.service";
import CustomersTable from "@/components/pageCustomers/CustomersTable/CustomersTable";
import CustomerFilters from "@/components/pageCustomers/CustomerFilters/CustomerFilters";
import CustomersPagination from "@/components/pageCustomers/Pagination/Pagination";
import CustomerDetailModal from "@/components/pageCustomers/CustomerDetailModal/CustomerDetailModal";

interface CustomersProps {
  search?:     string;
  page?:       number;
  limit?:      number;
  customerId?: string;
}

function parseResponse(
  response: unknown,
  page: number,
  limit: number,
): { customers: Customer[]; pagination: CustomerPagination } {
  if (Array.isArray(response)) {
    return {
      customers: response as Customer[],
      pagination: { total: response.length, page, limit, totalPages: Math.ceil(response.length / limit) || 1 },
    };
  }
  const obj = response as Record<string, unknown>;
  const customers = (Array.isArray(obj.data) ? obj.data : Array.isArray(obj.customers) ? obj.customers : []) as Customer[];
  const p = obj.pagination as CustomerPagination | undefined;
  return {
    customers,
    pagination: p ?? { total: customers.length, page, limit, totalPages: Math.ceil(customers.length / limit) || 1 },
  };
}

export default async function Customers({ search, page = 1, limit = 20, customerId }: CustomersProps) {
  const response = await customersService.listCustomers({ search, page, limit });
  const { customers, pagination } = parseResponse(response, page, limit);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Customers</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your customer base.</p>
      </div>

      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <CustomerFilters search={search} />
          <p className="text-sm text-gray-400">{pagination.total} customers</p>
        </div>

        <CustomersTable customers={customers} />

        <CustomersPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          limit={pagination.limit}
        />
      </div>

      {customerId && <CustomerDetailModal customerId={customerId} />}
    </div>
  );
}