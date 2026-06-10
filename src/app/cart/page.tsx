"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, ArrowLeft, MessageCircle } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();

  const totalPrice = getTotalPrice();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const orderLines = items
      .map(
        (item) =>
          `• ${item.name} (Qty: ${item.quantity}) — ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n");

    const message = encodeURIComponent(
      `Hello! I'd like to place an order:\n\n${orderLines}\n\n*Total: ₹${totalPrice.toLocaleString(
        "en-IN"
      )}*\n\nPlease confirm availability and delivery details.`
    );

    window.open(`https://wa.me/918511882726?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#7C6A58] hover:text-[#3D2B1F] transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1008]">
            Your Cart
          </h1>
          <p className="text-[#7C6A58] mt-1">
            {items.length === 0
              ? "Your cart is empty"
              : `${items.reduce((a, i) => a + i.quantity, 0)} item(s) in your cart`}
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <ShoppingBag size={64} className="text-[#C8B9A8] mb-6" />
            <h2 className="text-2xl font-serif font-semibold text-[#1C1008] mb-3">
              Nothing here yet
            </h2>
            <p className="text-[#7C6A58] mb-8 max-w-sm">
              Browse our premium collection and add items you love.
            </p>
            <Link
              href="/#products"
              className="bg-[#1C1008] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#3D2B1F] transition-colors"
            >
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-[#EDE8E1] p-4 sm:p-5 flex gap-4"
                  >
                    {/* Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-[#F0EBE3]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder-furniture.jpg";
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-[#1C1008] text-sm sm:text-base leading-snug truncate">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#C8B9A8] hover:text-red-500 transition-colors flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="text-[#7C6A58] text-xs mt-1">
                        ₹{item.price.toLocaleString("en-IN")} each
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#EDE8E1] rounded-full px-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[#3D2B1F] hover:bg-[#EDE8E1] transition-colors font-medium"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-[#1C1008]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[#3D2B1F] hover:bg-[#EDE8E1] transition-colors font-medium"
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal */}
                        <p className="font-bold text-[#1C1008] text-sm sm:text-base">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                onClick={clearCart}
                className="text-xs text-[#A08878] hover:text-red-500 transition-colors underline underline-offset-2"
              >
                Clear all items
              </button>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white rounded-2xl shadow-sm border border-[#EDE8E1] p-6 h-fit sticky top-24"
            >
              <h2 className="text-lg font-serif font-bold text-[#1C1008] mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-[#7C6A58]"
                  >
                    <span className="truncate mr-2">
                      {item.name}{" "}
                      <span className="text-[#A08878]">×{item.quantity}</span>
                    </span>
                    <span className="font-medium text-[#1C1008] flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#EDE8E1] pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#1C1008]">Total</span>
                  <span className="text-xl font-bold text-[#1C1008]">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-xs text-[#A08878] mt-1">
                  Delivery charges to be confirmed on WhatsApp
                </p>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-md shadow-green-100"
              >
                <MessageCircle size={20} />
                Order via WhatsApp
              </button>

              <p className="text-xs text-center text-[#A08878] mt-4">
                We&apos;ll confirm your order and delivery details on WhatsApp
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
            }
