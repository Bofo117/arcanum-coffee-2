// src/components/Footer.tsx
'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: "📸", label: "Instagram", href: "#" },
    { icon: "📘", label: "Facebook", href: "#" },
    { icon: "🐦", label: "Twitter", href: "#" },
    { icon: "📌", label: "Pinterest", href: "#" }
  ];

  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">☕</span>
              <span className="text-2xl font-serif font-bold text-cream">
                Arcanum
              </span>
            </div>
            <p className="text-cream/70">
              Donde cada taza cuenta una historia y cada visita es una experiencia única.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-serif font-bold text-lg text-cream mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-cream/70 hover:text-accent transition-colors">Inicio</a></li>
              <li><a href="#about" className="text-cream/70 hover:text-accent transition-colors">Nosotros</a></li>
              <li><a href="#menu" className="text-cream/70 hover:text-accent transition-colors">Menú</a></li>
              <li><a href="#contact" className="text-cream/70 hover:text-accent transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif font-bold text-lg text-cream mb-4">
              Síguenos
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-2xl hover:scale-125 transition-transform"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cream/20 pt-8 text-center">
          <p className="text-cream/50 text-sm">
            © {currentYear} Arcanum Coffee. Todos los derechos reservados.
          </p>
          <p className="text-cream/30 text-xs mt-2">
            Hecho con ❤️ y mucho ☕
          </p>
        </div>
      </div>
    </footer>
  );
}