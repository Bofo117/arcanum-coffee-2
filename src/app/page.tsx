// src/app/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from('newsletter_subscribers').select('count', { count: 'exact', head: true })
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-amber-800 mb-4">
        ☕ Arcanum Coffee
      </h1>
      <p className="text-xl text-gray-600">
        Próximamente... La magia del café de especialidad
      </p>
      <div className="mt-8 p-4 bg-amber-100 rounded-lg">
        <p className="text-amber-900 font-semibold">¡Hola Mundo! 🌍</p>
        <p className="text-amber-700 text-sm mt-2">
          Conexión a Supabase: {error ? '❌ Error' : '✅ Exitosa'}
        </p>
      </div>
    </main>
  )
}