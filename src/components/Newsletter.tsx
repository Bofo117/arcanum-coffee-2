// src/components/Newsletter.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase/client';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          toast.error('Este email ya está suscrito');
        } else {
          throw error;
        }
      } else {
        toast.success('¡Gracias por suscribirte! Recibirás nuestras novedades.');
        setEmail('');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al suscribirse. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-dark to-primary text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-xl text-cream mb-8">
            Recibe nuestras novedades, eventos especiales y secretos del café directamente en tu email.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-dark bg-white
                         focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={loading}
              />
              <motion.button
                type="submit"
                className="bg-[#B75D4D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#9A4E40] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Suscribirme'}
              </motion.button>
            </div>
          </form>

          <p className="text-sm text-cream/70 mt-4">
            No spam, solo contenido mágico. Puedes darte de baja cuando quieras.
          </p>
        </motion.div>
      </div>
    </section>
  );
}