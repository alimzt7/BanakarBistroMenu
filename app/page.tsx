import Footer from "../components/footer";
import About from "../components/about-us";
import Hero from "../components/hero-section";
import DailySuggest from "../components/daily-suggest";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <DailySuggest />
      <About />
      <Footer />
    </main>
  );
}
