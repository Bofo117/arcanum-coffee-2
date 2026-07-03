// src/app/admin/page.tsx
'use client';

import { useState } from 'react';
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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState<'newsletter' | 'contacts'>('newsletter');

  const ADMIN_PASSWORD = 'hola';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      loadData();
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const loadData = async () => {
    setLoading(true);
    const supabase = createClient();
    try {
      const { data: subscribersData, error: subscribersError } = await supabase
        .from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false });
      if (subscribersError) throw subscribersError;
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts').select('*').order('created_at', { ascending: false });
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
      <div className="min-h-screen bg-gradient-to-br from-[#342519] via-[#684F36] to-[#B39977] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">☕</div>
            <h1 className="text-3xl font-serif font-bold text-[#342519]">Arcanum Admin</h1>
            <p className="text-[#B39977] mt-2">Panel de Administración</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#342519] font-medium mb-2">Contraseña de Administrador</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-[#684F36]">🔒</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#B39977]/20 focus:outline-none focus:ring-2 focus:ring-[#684F36] focus:border-transparent bg-white text-[#342519] placeholder-[#B39977]/50"
                  placeholder="Ingresa la contraseña" autoFocus />
              </div>
            </div>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">⚠️ {error}</motion.div>
            )}
            <motion.button type="submit"
              className="w-full bg-[#342519] text-white py-3 rounded-lg font-semibold hover:bg-[#1F160E] transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Ingresar al Panel</motion.button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-xs text-[#B39977]">Solo personal autorizado</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1EA] to-[#EDE6D9]">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-3xl">☕</span>
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#342519]">Panel de Administración</h1>
                <p className="text-sm text-[#B39977]">Arcanum Coffee</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button onClick={loadData}
                className="bg-[#342519] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1F160E] transition-colors duration-300"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={loading}>
                {loading ? '⏳ Cargando...' : '🔄 Actualizar'}
              </motion.button>
              <motion.button onClick={() => setIsAuthenticated(false)}
                className="bg-[#684F36] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4D3A27] transition-colors duration-300"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>🚪 Cerrar Sesión</motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-[#B39977] mb-1">Suscriptores Newsletter</p><p className="text-3xl font-bold text-[#342519]">{subscribers.length}</p></div>
              <span className="text-4xl">📧</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-[#B39977] mb-1">Mensajes de Contacto</p><p className="text-3xl font-bold text-[#684F36]">{contacts.length}</p></div>
              <span className="text-4xl">💬</span>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button onClick={() => setActiveTab('newsletter')}
                className={`px-6 py-4 font-medium text-sm transition-colors duration-300 ${activeTab === 'newsletter' ? 'border-b-2 border-[#684F36] text-[#684F36] bg-[#F5F1EA]' : 'text-[#B39977] hover:text-[#342519] hover:bg-gray-50'}`}>
                📧 Newsletter ({subscribers.length})
              </button>
              <button onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 font-medium text-sm transition-colors duration-300 ${activeTab === 'contacts' ? 'border-b-2 border-[#684F36] text-[#684F36] bg-[#F5F1EA]' : 'text-[#B39977] hover:text-[#342519] hover:bg-gray-50'}`}>
                💬 Contactos ({contacts.length})
              </button>
            </div>
          </div>
          <div className="p-6">
            {activeTab === 'newsletter' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F5F1EA]">
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#342519] uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#342519] uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#342519] uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#342519]">#{sub.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#342519]">{sub.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B39977]">{new Date(sub.subscribed_at).toLocaleString('es-MX')}</td>
                      </tr>
                    ))}
                    {subscribers.length === 0 && (
                      <tr><td colSpan={3} className="px-6 py-12 text-center text-[#B39977]"><span className="text-4xl block mb-2">📭</span>No hay suscriptores aún</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F5F1EA]">
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#342519] uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#342519] uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#342519] uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#342519] uppercase tracking-wider">Mensaje</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#342519] uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#342519]">#{contact.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#342519]">{contact.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#342519]">{contact.email}</td>
                        <td className="px-6 py-4 text-sm text-[#342519] max-w-xs"><p className="truncate">{contact.message}</p></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B39977]">{new Date(contact.created_at).toLocaleString('es-MX')}</td>
                      </tr>
                    ))}
                    {contacts.length === 0 && (
                      <tr><td colSpan={5} className="px-6 py-12 text-center text-[#B39977]"><span className="text-4xl block mb-2">💬</span>No hay mensajes de contacto aún</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}