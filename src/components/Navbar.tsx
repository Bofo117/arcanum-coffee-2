// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Inicio' },
    { href: '#about', label: 'Nosotros' },
    { href: '#menu', label: 'Menú' },
    { href: '#contact', label: 'Contacto' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-[#EDE6D9]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + Nombre */}
          <motion.a
            href="#home"
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/logo.png"
              alt="Arcanum Coffee Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
            <span className="text-2xl font-serif font-bold text-[#342519]">
              Arcanum
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#342519] hover:text-[#684F36] transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
                href="/admin"
                className="bg-[#684F36] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4D3A27] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
                >
                Admin
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#342519]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white rounded-b-lg shadow-lg pb-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-[#342519] hover:bg-[#EDE6D9] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
                <a
                href="/admin"
                className="bg-[#684F36] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4D3A27] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
                >
                Admin
                </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}