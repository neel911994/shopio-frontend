import { customersService } from "@/services/customers.service";
import { updateCustomerAction } from "@/actions/customers.actions";
import { EditForm } from "@/components/shared";
import CustomerModalOverlay from "./CustomerModalOverlay";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

const STATUS_COLORS: Record<string, string> = {
  PENDING:   "text-amber-400",
  PAID:      "text-blue-400",
  SHIPPED:   "text-indigo-400",
  DELIVERED: "text-emerald-400",
  CANCELLED: "text-red-400",
};

export default async function CustomerDetailModal({ customerId }: { customerId: string }) {
  const customer = await customersService.getCustomer(customerId);

  const totalSpent = customer.orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const memberSince = new Date(customer.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <CustomerModalOverlay customerName={customer.name}>
      <div className="overflow-y-auto px-6 pb-2 space-y-4">
        {/* Avatar + name + email */}
        <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
            {initials(customer.name)}
          </div>
          <div>
            <p className="text-base font-bold text-white">{customer.name}</p>
            <p className="text-sm text-gray-400">{customer.email}</p>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-1">
          <div className="rounded-lg bg-gray-800 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Member Since</p>
            <p className="text-sm font-bold text-white">{memberSince}</p>
          </div>
          <div className="rounded-lg bg-gray-800 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Total Orders</p>
            <p className="text-sm font-bold text-white">{customer.orders.length}</p>
          </div>
          <div className="col-span-2 rounded-lg bg-gray-800 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Total Spent</p>
            <p className="text-sm font-bold text-white">
              ₹{totalSpent.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Recent orders */}
        {customer.orders.length > 0 && (
          <div className="rounded-lg bg-gray-800 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Recent Orders</p>
            <div className="space-y-2">
              {customer.orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-indigo-400">#{order.id.slice(0, 8).toUpperCase()}</span>
                  <span className={`font-medium ${STATUS_COLORS[order.status] ?? "text-gray-400"}`}>
                    {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                  </span>
                  <span className="text-white font-semibold">
                    ₹{order.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Editable phone + footer buttons */}
      <div className="mt-4">
        <EditForm
          closeParam="customerId"
          saveLabel="Edit Customer"
          fields={[
            { key: "phone", label: "Phone", type: "text", initialValue: customer.phone },
          ]}
          onSave={async (values) => {
            "use server";
            await updateCustomerAction(customer.id, { phone: values.phone as string });
          }}
        />
      </div>
    </CustomerModalOverlay>
  );
}
