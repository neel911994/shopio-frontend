import Customers from "@/components/pageCustomers/Customers/Customers";

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string; limit?: string; customerId?: string }>;
}

export default async function CustomersPage({ searchParams }: PageProps) {
  const { search, page, limit, customerId } = await searchParams;
  return (
    <Customers
      search={search}
      page={page  ? Number(page)  : undefined}
      limit={limit ? Number(limit) : undefined}
      customerId={customerId}
    />
  );
}