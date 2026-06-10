"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Sofa } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-brown-800 rounded-lg flex items-center justify-center group-hover:bg-brown-700 transition-colors">
                <Sofa className="w-5 h-5 text-beige-100" />
              </div>
              <div className="leading-tight">
                <p className="font-serif text-base font-700 text-brown-800 tracking-wide">
                  Prestige
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest -mt-0.5">
                  Furniture
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-brown-800 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-brown-800 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-2 bg-brown-800 hover:bg-brown-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Cart</span>
                  {totalItems() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                    >
                      {totalItems()}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-beige-100 transition-colors"
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-brown-800" />
                ) : (
                  <Menu className="w-5 h-5 text-brown-800" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-white/98 backdrop-blur-lg shadow-xl border-t border-beige-200 md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-gray-700 font-medium border-b border-beige-100 last:border-0 hover:text-brown-800 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="py-3 text-amber-700 font-medium hover:text-amber-800 transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
