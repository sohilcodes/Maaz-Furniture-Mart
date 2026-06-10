"use client";

import { motion } from "framer-motion";
import { Award, Users, Package, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Users,   value: "10,000+", label: "Happy Customers" },
  { icon: Package, value: "500+",    label: "Products Available" },
  { icon: Award,   value: "15+",     label: "Years Experience" },
  { icon: ThumbsUp,value: "4.9★",    label: "Average Rating" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-3">
              Who We Are
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brown-800 leading-tight mb-6">
              Crafting Comfort
              <br />
              <span className="text-amber-700">Since Decades</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We provide premium quality sofas, beds, safes (tijori), and wooden
              furniture with fast delivery and best pricing. Each piece is
              handcrafted by skilled artisans using sustainably sourced wood and
              premium fabrics.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              From living rooms to bedrooms, from security needs to aesthetic
              excellence — we cover every corner of your home with furniture
              that lasts a lifetime.
            </p>

            <div className="flex flex-wrap gap-3">
              {["100% Genuine Wood", "ISI Marked Steel", "PAN India Delivery", "EMI Available"].map((t) => (
                <span
                  key={t}
                  className="bg-amber-50 text-amber-800 border border-amber-200 text-sm font-medium px-4 py-2 rounded-full"
                >
                  ✓ {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-beige-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-amber-700" />
                </div>
                <p className="font-serif text-3xl font-bold text-brown-800 mb-1">
                  {value}
                </p>
                <p className="text-gray-500 text-sm">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
                      }
