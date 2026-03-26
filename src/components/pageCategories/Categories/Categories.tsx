import { categoriesService } from "@/services/categories.service";
import CategoriesTable from "@/components/pageCategories/CategoriesTable/CategoriesTable";
import CategoryDetailModal from "@/components/pageCategories/CategoryDetailModal/CategoryDetailModal";
import CreateCategoryModal from "@/components/pageCategories/CreateCategoryModal/CreateCategoryModal";

interface CategoriesProps {
  categoryId?: string;
}

export default async function Categories({ categoryId }: CategoriesProps) {
  const categories = await categoriesService.listCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Categories</h2>
          <p className="text-sm text-gray-400 mt-1">Organise your product catalogue into categories.</p>
        </div>
        <CreateCategoryModal />
      </div>

      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
        <p className="text-sm text-gray-400 text-right mb-4">{categories.length} categories</p>
        <CategoriesTable categories={categories} />
      </div>

      {categoryId && <CategoryDetailModal categoryId={categoryId} />}
    </div>
  );
}
