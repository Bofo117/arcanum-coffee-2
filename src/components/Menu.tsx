// src/components/Menu.tsx
'use client';

import { motion, useInView } from 'framer-motion'; // Quitamos useRef sin usar
import { useRef } from 'react';

const menuItems = [
  {
    name: "Espresso Arcanum",
    description: "Nuestro blend exclusivo. Notas a chocolate negro y caramelo.",
    price: "$3.50",
    category: "Clásicos",
    icon: "☕"
  },
  {
    name: "Latte Mágico",
    description: "Espresso con leche cremosa y un toque de vainilla artesanal.",
    price: "$4.50",
    category: "Especiales",
    icon: "✨"
  },
  {
    name: "Cold Brew Místico",
    description: "Extracción en frío por 18 horas. Suave y refrescante.",
    price: "$4.00",
    category: "Fríos",
    icon: "🧊"
  },
  {
    name: "Cappuccino Arcano",
    description: "Espresso con espuma de leche aterciopelada y cacao.",
    price: "$4.00",
    category: "Clásicos",
    icon: "🤎"
  },
  {
    name: "Mocha Encantado",
    description: "Chocolate belga con espresso y leche cremosa.",
    price: "$5.00",
    category: "Especiales",
    icon: "🍫"
  },
  {
    name: "Té Chai Secreto",
    description: "Mezcla de especias exóticas con leche y miel orgánica.",
    price: "$4.00",
    category: "Infusiones",
    icon: "🍵"
  }
];

export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Nuestro Menú
          </h2>
          <p className="section-subtitle">
            Cada bebida es preparada con dedicación y los mejores ingredientes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-serif font-bold text-primary">
                  {item.name}
                </h3>
                <span className="text-accent font-bold text-lg">
                  {item.price}
                </span>
              </div>
              <p className="text-dark-light text-sm mb-3">
                {item.description}
              </p>
              <span className="inline-block bg-cream text-primary text-xs px-3 py-1 rounded-full font-medium">
                {item.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}