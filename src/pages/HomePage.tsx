import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import RecommendedList from "@/components/home/RecommendedList";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* Hero */}
      <HeroSection />

      {/* Content */}
      <section className="px-4 -mt-10 relative z-10 space-y-6">
        <CategoryGrid />

        {/* 🔥 Recommended dari API */}
        <RecommendedList />
      </section>

      <Footer />
    </main>
  );
}
