import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedArtisans from '@/components/artisan/FeaturedArtisans';
import Stats from '@/components/Stats';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <div id="artisans">
          <FeaturedArtisans />
        </div>
        <Stats />
      </main>
      <Footer />
    </div>
  );
}