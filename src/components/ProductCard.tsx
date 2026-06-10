"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, MessageCircle, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const waLink = `https://wa.me/918511882726?text=I want to buy ${encodeURIComponent(product.name)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-beige-100 hover:border-beige-200 transition-all duration-300 group flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-beige-50">
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl bg-beige-100">
            🛋️
          </div>
        )}

        {/* Category badge */}
        {product.category && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brown-800 text-xs font-semibold px-3 py-1 rounded-full border border-beige-200">
            {product.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-semibold text-brown-800 text-lg leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        <div className="mt-auto">
          <p className="text-2xl font-bold text-brown-800 mb-4">
            ₹{product.price.toLocaleString("en-IN")}
            <span className="text-sm font-normal text-gray-400 ml-1">
              /piece
            </span>
          </p>

          {/* Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-brown-800 hover:bg-brown-700 text-white"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </motion.button>

            <motion.a
              whileTap={{ scale: 0.95 }}
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold bg-green-500 hover:bg-green-600 text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Buy Now
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
            }
