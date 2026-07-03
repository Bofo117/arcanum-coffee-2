// src/app/page.tsx
import Hero from '@/components/Hero';
import About from '@/components/About';
import ImageCarousel from '@/components/ImageCarousel';
import Menu from '@/components/Menu';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
//para ver si se carga
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ImageCarousel />
      <Menu />
      <Newsletter />
      <Contact />
    </>
  );
}