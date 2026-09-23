import { getProducts } from "../../lib/supabase/products";
import { MenuExplorer } from "../../components/menu-explorer";
import Footer from "../../components/footer";
import { WaiterCallButton } from "../../components/waiter-call-button";

export default async function MenuPage() {
  const products = await getProducts();

  return (
    <>
      <MenuExplorer items={products} />
      <WaiterCallButton />
      <Footer />
    </>
  );
}
