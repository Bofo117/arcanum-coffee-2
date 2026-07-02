// src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'newsletter' | 'contacts'>('newsletter');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'ArcanumAdmin2024!') {
      setIsAuthenticated(true);
      setError('');
      loadData();
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const loadData = async () => {
    const supabase = createClient();
    setLoading(true);

    try {
      const { data: subscribersData, error: subscribersError } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (subscribersError) throw subscribersError;

      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) throw contactsError;

      setSubscribers(subscribersData || []);
      setContacts(contactsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
        >
          <div className="text-center mb-6">
            <span className="text-4xl">☕</span>
            <h1 className="text-2xl font-serif font-bold text-primary mt-2">
              Admin Dashboard
            </h1>
            <p className="text-dark-light mt-1">Arcanum Coffee</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-dark font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Ingresa la contraseña"
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <motion.button
              type="submit"
              className="btn-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ingresar
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary">
                Dashboard Admin
              </h1>
              <p className="text-dark-light">Arcanum Coffee</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={loadData}
                className="btn-primary text-sm"
                disabled={loading}
              >
                {loading ? 'Cargando...' : '🔄 Actualizar'}
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="btn-accent text-sm"
              >
                🚪 Salir
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-cream-dark mb-6">
            <button
              onClick={() => setActiveTab('newsletter')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'newsletter'
                  ? 'border-b-2 border-accent text-accent'
                  : 'text-dark-light hover:text-dark'
              }`}
            >
              Newsletter ({subscribers.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'contacts'
                  ? 'border-b-2 border-accent text-accent'
                  : 'text-dark-light hover:text-dark'
              }`}
            >
              Contactos ({contacts.length})
            </button>
          </div>

          {/* Tablas */}
          {activeTab === 'newsletter' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-cream">
                    <th className="px-6 py-3 text-left text-dark font-medium">ID</th>
                    <th className="px-6 py-3 text-left text-dark font-medium">Email</th>
                    <th className="px-6 py-3 text-left text-dark font-medium">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="border-b border-cream-dark hover:bg-cream-light">
                      <td className="px-6 py-4 text-dark">{sub.id}</td>
                      <td className="px-6 py-4 text-dark">{sub.email}</td>
                      <td className="px-6 py-4 text-dark-light">
                        {new Date(sub.subscribed_at).toLocaleString('es-MX')}
                      </td>
                    </tr>
                  ))}
                  {subscribers.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-dark-light">
                        No hay suscriptores aún
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-cream">
                    <th className="px-6 py-3 text-left text-dark font-medium">ID</th>
                    <th className="px-6 py-3 text-left text-dark font-medium">Nombre</th>
                    <th className="px-6 py-3 text-left text-dark font-medium">Email</th>
                    <th className="px-6 py-3 text-left text-dark font-medium">Mensaje</th>
                    <th className="px-6 py-3 text-left text-dark font-medium">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-cream-dark hover:bg-cream-light">
                      <td className="px-6 py-4 text-dark">{contact.id}</td>
                      <td className="px-6 py-4 text-dark font-medium">{contact.name}</td>
                      <td className="px-6 py-4 text-dark">{contact.email}</td>
                      <td className="px-6 py-4 text-dark max-w-xs truncate">
                        {contact.message}
                      </td>
                      <td className="px-6 py-4 text-dark-light">
                        {new Date(contact.created_at).toLocaleString('es-MX')}
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-dark-light">
                        No hay mensajes de contacto aún
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}