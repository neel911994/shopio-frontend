import Categories from "@/components/pageCategories/Categories/Categories";

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  const { categoryId } = await searchParams;
  return <Categories categoryId={categoryId} />;
}
