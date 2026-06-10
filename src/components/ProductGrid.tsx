"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { motion } from "framer-motion";
import { PackageX } from "lucide-react";

const CATEGORIES = ["All", "Sofa", "Bed", "Tijori", "Wooden"];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) =>
          p.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-3">
            Our Collection
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brown-800 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Handpicked furniture for every room — premium quality, fair prices.
          </p>
          <div className="w-16 h-1 bg-amber-400 rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-brown-800 text-white border-brown-800 shadow-md"
                  : "bg-white text-gray-600 border-beige-200 hover:border-brown-800 hover:text-brown-800"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4"
          >
            <PackageX className="w-16 h-16 text-beige-300" />
            <p className="text-xl font-medium">No products found</p>
            <p className="text-sm">
              {activeCategory !== "All"
                ? "Try a different category"
                : "Add products from the Admin Panel"}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
