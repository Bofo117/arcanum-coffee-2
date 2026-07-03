// src/components/ImageCarousel.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
}

const carouselImages: CarouselImage[] = [
  {
    src: '/images/expreso.jpg',
    alt: 'Espresso Arcanum',
    title: 'Espresso Perfecto'
  },
  {
    src: '/images/latte.jpg',
    alt: 'Latte Artesanal',
    title: 'Latte Art'
  },
  {
    src: '/images/granos.jpg',
    alt: 'Granos Seleccionados',
    title: 'Granos Premium'
  },
  {
    src: '/images/moka.jpg',
    alt: 'Moka-Caramelo',
    title: 'Moka-Caramelo'
  },
  {
    src: '/images/pan.jpg',
    alt: 'Pan',
    title: 'Esponjoso Pan'
  }
];

const POSITIONS = ['center', 'left-close', 'right-close', 'left-far', 'right-far'] as const;

export default function ImageCarousel() {
  const [centerIndex, setCenterIndex] = useState(0);

  const totalSlides = carouselImages.length;

  const getSlideIndex = useCallback((position: number) => {
    const offsets = [0, -1, 1, -2, 2];
    const index = (centerIndex + offsets[position] + totalSlides) % totalSlides;
    return index;
  }, [centerIndex, totalSlides]);

  const goTo = useCallback((index: number) => {
  setCenterIndex(index);
}, []);

const next = useCallback(() => {
  setCenterIndex((prev) => (prev + 1) % totalSlides);
}, [totalSlides]);

const prev = useCallback(() => {
  setCenterIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
}, [totalSlides]);

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const getSlideStyles = (position: number) => {
    const styles = {
      0: {
        width: '29%',
        height: '110%',
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        scale: 1,
        zIndex: 5,
        opacity: 1,
        border: '3px solid #FDF0E8',
        filter: 'brightness(1)',
      },
      1: {
        width: '25%',
        height: '100%',
        left: '25%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        scale: 0.85,
        zIndex: 4,
        opacity: 0.85,
        border: '2px solid #F8E2D1',
        filter: 'brightness(0.8)',
      },
      2: {
        width: '25%',
        height: '100%',
        left: '75%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        scale: 0.85,
        zIndex: 4,
        opacity: 0.85,
        border: '2px solid #F8E2D1',
        filter: 'brightness(0.8)',
      },
      3: {
        width: '23%',
        height: '90%',
        left: '6%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        scale: 0.7,
        zIndex: 3,
        opacity: 0.6,
        border: '1px solid #F0D4BB',
        filter: 'brightness(0.6)',
      },
      4: {
        width: '23%',
        height: '90%',
        left: '94%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        scale: 0.7,
        zIndex: 3,
        opacity: 0.6,
        border: '1px solid #F0D4BB',
        filter: 'brightness(0.6)',
      }
    };
    return styles[position as keyof typeof styles];
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#FDF0E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#7A4A2A] mb-4">
            Nuestra Galería
          </h2>
          <p className="text-lg text-[#6B5454] max-w-2xl mx-auto">
            Descubre los momentos mágicos que creamos cada día en Arcanum Coffee
          </p>
        </motion.div>

        {/* CARRUSEL */}
        <div 
          className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[450px]"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {POSITIONS.map((position, posIndex) => {
              const slideIndex = getSlideIndex(posIndex);
              const image = carouselImages[slideIndex];
              const styles = getSlideStyles(posIndex);

              return (
                <motion.div
                  key={posIndex}
                  className="absolute rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    width: styles.width,
                    height: styles.height,
                    zIndex: styles.zIndex,
                  }}
                  animate={{
                    left: styles.left,
                    top: styles.top,
                    x: styles.x,
                    y: styles.y,
                    scale: styles.scale,
                    opacity: styles.opacity,
                    border: styles.border,
                    filter: styles.filter,
                    boxShadow: posIndex === 0 
                      ? '0 20px 40px rgba(0, 0, 0, 0.25)' 
                      : '0 12px 30px rgba(0, 0, 0, 0.15)',
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1], // ease-in-out suave
                  }}
                  onClick={() => goTo(slideIndex)}
                  whileHover={{ 
                    scale: posIndex === 0 ? 1.05 : styles.scale * 1.1,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes={styles.width}
                    priority={posIndex === 0 || posIndex === 1 || posIndex === 2}
                  />
                  
                  {/* Overlay con título - solo imagen central */}
                  {posIndex === 0 && image.title && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4"
                    >
                      <p className="text-white font-serif text-lg md:text-xl font-bold drop-shadow-lg">
                        {image.title}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CONTROLES */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {/* Botón Anterior */}
          <motion.button
            onClick={prev}
            className="bg-[#684F36] text-white w-12 h-12 rounded-full flex items-center justify-center
                     shadow-lg hover:bg-[#4D3A27] transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Dots */}
          <div className="flex gap-3">
            {carouselImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-500 ${
                  index === centerIndex 
                    ? 'bg-[#684F36] w-8 h-3' 
                    : 'bg-[#C4AD8F] w-3 h-3 hover:bg-[#684F36]/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          {/* Botón Siguiente */}
          <motion.button
            onClick={next}
            className="bg-[#684F36] text-white w-12 h-12 rounded-full flex items-center justify-center
                     shadow-lg hover:bg-[#4D3A27] transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}