// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Arcanum Coffee | Café de Especialidad",
  description: "Descubre la magia del café de especialidad en Arcanum Coffee. Granos seleccionados, tostado artesanal y experiencias únicas.",
  keywords: "café, especialidad, arcanum, coffee, café artesanal, barista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Toaster position="top-center" />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}