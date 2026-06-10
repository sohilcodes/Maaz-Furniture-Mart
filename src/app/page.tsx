import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductGrid />
      <AboutSection />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-brown-900 py-8 text-center border-t border-white/5">
        <p className="text-beige-200/50 text-sm">
          © {new Date().getFullYear()} Prestige Furniture Store. All rights
          reserved.
        </p>
        <p className="text-beige-200/30 text-xs mt-1">
          Made with ❤️ in India
        </p>
      </footer>
    </main>
  );
}
