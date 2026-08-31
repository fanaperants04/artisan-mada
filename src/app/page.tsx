import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Stats from '@/components/Stats';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Stats />

      </main>
      <Footer />
    </>
  );
}