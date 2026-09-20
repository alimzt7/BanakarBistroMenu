import { getProducts } from "../../lib/supabase/products";
import { MenuExplorer } from "../../components/menu-explorer";
import Footer from "../../components/footer";

export default async function MenuPage() {
  const products = await getProducts();

  return (
    <>
      <MenuExplorer items={products} />
      <Footer />
    </>
  );
}
