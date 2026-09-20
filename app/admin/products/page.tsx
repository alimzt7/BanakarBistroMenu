import { getProducts } from "../../../lib/supabase/products";
import { ProductsManager } from "../../../components/admin/products-manager";

export default async function AdminProductsPage() {
  const products = await getProducts({ includeArchived: true });

  return <ProductsManager initialProducts={products} />;
}
