// src/components/Contact.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase/client';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([data]);

      if (error) throw error;

      toast.success('¡Mensaje enviado! Te contactaremos pronto.');
      reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: "📍", text: "Calle Principal #123, Ciudad Mágica" },
    { icon: "📞", text: "+1 (555) 123-4567" },
    { icon: "✉️", text: "info@arcanumcoffee.com" },
    { icon: "🕐", text: "Lun-Vie: 7am-8pm | Sáb-Dom: 8am-9pm" }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Contáctanos
          </h2>
          <p className="section-subtitle">
            ¿Tienes preguntas? ¿Quieres reservar? Estamos aquí para ti.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-bold text-primary mb-6">
              Visítanos
            </h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3 text-dark">
                  <span className="text-2xl">{info.icon}</span>
                  <span className="text-lg">{info.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-cream rounded-xl p-6">
              <h4 className="font-serif font-bold text-primary mb-2 text-lg">
                Horario Especial
              </h4>
              <p className="text-dark-light">
                Todos los viernes tenemos música en vivo de 6pm a 9pm.
                ¡Ven a disfrutar de una velada mágica!
              </p>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-dark font-medium mb-2">
                  Nombre
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="input-field"
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-dark font-medium mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="input-field"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-dark font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}