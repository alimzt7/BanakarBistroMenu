import Footer from "../components/footer";
import About from "../components/about-us";
import Hero from "../components/hero-section";
import DailySuggest from "../components/daily-suggest";
import { getDailySuggestion } from "../lib/supabase/products";

export default async function HomePage() {
  const signature = await getDailySuggestion();

  return (
    <main>
      <Hero />
      <DailySuggest signature={signature} />
      <About />
      <Footer />
    </main>
  );
}
