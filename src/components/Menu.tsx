// src/components/Menu.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const menuItems = [
  {
    name: "Espresso Arcanum",
    description: "Nuestro blend exclusivo. Notas a chocolate negro y caramelo.",
    price: "$3.50",
    category: "Clásicos",
    image: "/menu/expreso.jpg"
  },
  {
    name: "Latte Mágico",
    description: "Espresso con leche cremosa y un toque de vainilla artesanal.",
    price: "$4.50",
    category: "Especiales",
    image: "/menu/latte.jpg"
  },
  {
    name: "Cold Brew Místico",
    description: "Extracción en frío por 18 horas. Suave y refrescante.",
    price: "$4.00",
    category: "Fríos",
    image: "/menu/Cold Brew.jpg"
  },
  {
    name: "Cappuccino Arcano",
    description: "Espresso con espuma de leche aterciopelada y cacao.",
    price: "$4.00",
    category: "Clásicos",
    image: "/menu/moka.jpg"
  },
  {
    name: "Mocha Encantado",
    description: "Chocolate belga con espresso y leche cremosa.",
    price: "$5.00",
    category: "Especiales",
    image: "/menu/moka.jpg"
  },
  {
    name: "Té Chai Secreto",
    description: "Mezcla de especias exóticas con leche y miel orgánica.",
    price: "$4.00",
    category: "Infusiones",
    image: "/menu/chai.jpg"
  }
];

export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" className="py-20 bg-[#EDE6D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#342519] mb-4">
            Nuestro Menú
          </h2>
          <p className="text-lg md:text-xl text-[#B39977] max-w-2xl mx-auto">
            Cada bebida es preparada con dedicación y los mejores ingredientes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              {/* Tarjeta */}
              <div className="bg-[#342519] rounded-3xl p-6 pt-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                
                {/* Contenedor de imagen irregular */}
                <div className="relative flex justify-center -mt-2 mb-6">
                  <div className="paint-splash-wrapper">
                    {/* Mancha de fondo */}
                    <div className="paint-splash-bg" />
                    {/* Imagen */}
                    <div className="paint-splash-image">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="180px"
                      />
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex-1 flex flex-col text-center">
                  <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-[#EDE6D9] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-[#B39977] text-sm mb-4 leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#684F36]/30">
                    <span className="inline-block bg-[#684F36]/30 text-[#EDE6D9] text-xs px-3 py-1 rounded-full font-medium">
                      {item.category}
                    </span>
                    <span className="text-[#EDE6D9] font-bold text-xl font-serif">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Estilos CSS para la mancha irregular */}
      <style jsx>{`
        .paint-splash-wrapper {
          position: relative;
          width: 180px;
          height: 150px;
        }

        /* Mancha de fondo decorativa */
        .paint-splash-bg {
          position: absolute;
          width: 160px;
          height: 130px;
          background: #684F36;
          top: 10px;
          left: 10px;
          border-radius: 48% 52% 43% 57% / 53% 47% 58% 42%;
          transform: rotate(-6deg);
          z-index: 0;
        }

        .paint-splash-bg::before {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          background: #684F36;
          border-radius: 50%;
          top: -10px;
          left: 55px;
          box-shadow: 
            85px 30px 0 #684F36,
            75px 85px 0 14px #684F36,
            -12px 90px 0 -4px #684F36,
            110px 85px 0 -6px #684F36;
        }

        .paint-splash-bg::after {
          content: "";
          position: absolute;
          width: 45px;
          height: 42px;
          background: #684F36;
          border-radius: 50%;
          bottom: -14px;
          left: 42px;
          box-shadow: 
            40px 0 0 #684F36,
            -25px -6px 0 -8px #684F36,
            70px -6px 0 -9px #684F36;
        }

        /* Imagen con forma irregular */
        .paint-splash-image {
          position: absolute;
          width: 140px;
          height: 115px;
          top: 18px;
          left: 20px;
          border-radius: 46% 54% 41% 59% / 55% 44% 56% 45%;
          transform: rotate(-4deg);
          overflow: hidden;
          z-index: 1;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          border: 3px solid #B39977;
        }
      `}</style>
    </section>
  );
}