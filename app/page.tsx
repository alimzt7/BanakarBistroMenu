import Footer from "../components/footer";
import About from "../components/about-us";
import Hero from "../components/hero-section";
import DailySuggest from "../components/daily-suggest";
import { getProducts } from "../lib/supabase/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <Hero />
      <DailySuggest
        signature={
          products.find((product) => product.isFeatured) ?? products[0]
        }
      />
      <About />
      <Footer />
    </main>
  );
}
