"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  Package,
  IndianRupee,
  ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  LayoutDashboard,
} from "lucide-react";

type Toast = { type: "success" | "error"; message: string } | null;

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showToast("error", "Failed to load products.");
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.image.trim()) {
      showToast("error", "All fields are required.");
      return;
    }
    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) {
      showToast("error", "Enter a valid price.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("products").insert([
      {
        name: form.name.trim(),
        price,
        image: form.image.trim(),
      },
    ]);

    if (error) {
      showToast("error", "Failed to add product. Check Supabase config.");
    } else {
      showToast("success", `"${form.name}" added successfully!`);
      setForm({ name: "", price: "", image: "" });
      fetchProducts();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string, name: string) => {
    setDeleteId(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      showToast("error", "Failed to delete product.");
    } else {
      showToast("success", `"${name}" deleted.`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
    setDeleteId(null);
  };

  return (
    <main className="min-h-screen bg-[#F5F3F0] pt-8 pb-16">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-medium max-w-sm ${
              toast.type === "success" ? "bg-emerald-600" : "bg-red-500"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#1C1008] text-white w-10 h-10 rounded-xl flex items-center justify-center">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1008]">
                Admin Panel
              </h1>
              <p className="text-[#7C6A58] text-sm">
                Premium Furniture Store — Product Management
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Add Product Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-[#EDE8E1] p-6 sticky top-8">
              <h2 className="text-lg font-serif font-bold text-[#1C1008] mb-6 flex items-center gap-2">
                <PlusCircle size={20} className="text-[#A08878]" />
                Add New Product
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#7C6A58] uppercase tracking-wider mb-2">
                    Product Name
                  </label>
                  <div className="relative">
                    <Package
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A08878]"
                    />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="e.g. Royal Teak Sofa Set"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDE8E1] bg-[#FAF8F5] text-[#1C1008] text-sm placeholder:text-[#C8B9A8] focus:outline-none focus:ring-2 focus:ring-[#1C1008]/20 focus:border-[#1C1008] transition"
                      required
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-[#7C6A58] uppercase tracking-wider mb-2">
                    Price (₹)
                  </label>
                  <div className="relative">
                    <IndianRupee
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A08878]"
                    />
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, price: e.target.value }))
                      }
                      placeholder="e.g. 45000"
                      min="1"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDE8E1] bg-[#FAF8F5] text-[#1C1008] text-sm placeholder:text-[#C8B9A8] focus:outline-none focus:ring-2 focus:ring-[#1C1008]/20 focus:border-[#1C1008] transition"
                      required
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-semibold text-[#7C6A58] uppercase tracking-wider mb-2">
                    Image URL
                  </label>
                  <div className="relative">
                    <ImageIcon
                      size={16}
                      className="absolute left-3.5 top-3.5 text-[#A08878]"
                    />
                    <textarea
                      value={form.image}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, image: e.target.value }))
                      }
                      placeholder="https://images.unsplash.com/..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDE8E1] bg-[#FAF8F5] text-[#1C1008] text-sm placeholder:text-[#C8B9A8] focus:outline-none focus:ring-2 focus:ring-[#1C1008]/20 focus:border-[#1C1008] transition resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Preview */}
                {form.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl overflow-hidden border border-[#EDE8E1] bg-[#F0EBE3] aspect-video relative"
                  >
                    <Image
                      src={form.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-[#A08878]">
                        Image Preview
                      </span>
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1C1008] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#3D2B1F] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <PlusCircle size={16} />
                      Add Product
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Products List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-serif font-bold text-[#1C1008]">
                All Products
                <span className="ml-2 text-sm font-normal text-[#A08878]">
                  ({products.length})
                </span>
              </h2>
              <button
                onClick={fetchProducts}
                className="text-xs text-[#7C6A58] hover:text-[#1C1008] transition-colors border border-[#EDE8E1] px-3 py-1.5 rounded-lg bg-white"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-[#EDE8E1] overflow-hidden animate-pulse"
                  >
                    <div className="bg-[#EDE8E1] aspect-video" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-[#EDE8E1] rounded w-3/4" />
                      <div className="h-3 bg-[#EDE8E1] rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#EDE8E1] p-12 text-center">
                <Package size={40} className="text-[#C8B9A8] mx-auto mb-4" />
                <p className="text-[#7C6A58] font-medium">No products yet</p>
                <p className="text-[#A08878] text-sm mt-1">
                  Add your first product using the form
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence>
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white rounded-2xl border border-[#EDE8E1] overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="relative aspect-video bg-[#F0EBE3] overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, 300px"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder-furniture.jpg";
                          }}
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-[#1C1008] text-sm leading-snug line-clamp-2 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-[#7C6A58] font-bold text-base">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F0EBE3]">
                          <span className="text-xs text-[#A08878] font-mono">
                            ID: {String(product.id).slice(0, 8)}...
                          </span>
                          <button
                            onClick={() =>
                              handleDelete(String(product.id), product.name)
                            }
                            disabled={deleteId === String(product.id)}
                            className="flex items-center gap-1.5 text-xs text-[#A08878] hover:text-red-500 transition-colors disabled:opacity-50"
                          >
                            {deleteId === String(product.id) ? (
                              <Loader2 size={13} className="animate-spin" />
                            ) : (
                              <Trash2 size={13} />
                            )}
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
  }
