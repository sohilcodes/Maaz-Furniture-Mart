"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCartStore();

  const total = totalPrice();

  return (
    <main className="min-h-screen px-8 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 border rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center border-t pt-6">
            <p className="text-xl font-bold">Total: ₹{total}</p>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </main>
  );
        }
