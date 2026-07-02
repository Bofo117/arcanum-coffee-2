// src/components/About.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: "☕",
      title: "Granos Selectos",
      description: "Seleccionamos los mejores granos de fincas sostenibles en América Latina y África."
    },
    {
      icon: "🔥",
      title: "Tostado Artesanal",
      description: "Tostamos en pequeños lotes para resaltar las notas únicas de cada origen."
    },
    {
      icon: "👨‍🍳",
      title: "Baristas Expertos",
      description: "Nuestro equipo está certificado y apasionado por crear la taza perfecta."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Nuestra Historia
          </h2>
          <p className="section-subtitle">
            Arcanum nació de la pasión por el café de especialidad y el deseo de crear
            un espacio donde cada visita sea una experiencia memorable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center p-8 rounded-2xl bg-cream-light hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                {feature.title}
              </h3>
              <p className="text-dark-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}