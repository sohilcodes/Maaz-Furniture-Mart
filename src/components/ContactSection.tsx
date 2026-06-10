"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-brown-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            We're Here to Help
          </h2>
          <p className="text-beige-200 text-lg max-w-lg mx-auto">
            Have a question or ready to order? Reach us instantly on WhatsApp.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Phone,
              title: "Call / WhatsApp",
              value: "+91 85118 82726",
              sub: "Mon–Sun, 9am–8pm",
            },
            {
              icon: MapPin,
              title: "Visit Our Store",
              value: "India",
              sub: "PAN India Delivery Available",
            },
            {
              icon: Clock,
              title: "Working Hours",
              value: "9 AM – 8 PM",
              sub: "7 Days a Week",
            },
          ].map(({ icon: Icon, title, value, sub }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
            >
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-amber-400" />
              </div>
              <p className="text-beige-200 text-sm mb-1">{title}</p>
              <p className="text-white font-semibold text-lg">{value}</p>
              <p className="text-beige-200/60 text-sm mt-1">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://wa.me/918511882726?text=Hi, I'm interested in your furniture products"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl shadow-green-500/30 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
            </motion.button>
          </a>
          <p className="text-beige-200/50 text-sm mt-4">
            Average response time: under 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
