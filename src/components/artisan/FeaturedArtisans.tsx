import { mockArtisans } from '@/lib/mockData';
import ArtisanCard from './ArtisanCard';
import { Sparkles } from 'lucide-react';

export default function FeaturedArtisans() {
  return (
    <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Title Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold mb-3 border border-amber-200/60">
            <Sparkles size={14} className="text-amber-500 shrink-0" />
            <span>Recommandés à Antananarivo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Artisans à la une
          </h2>
          <p className="text-gray-600 max-w-xl text-xs sm:text-sm md:text-base px-2">
            Découvrez nos professionnels certifiés les mieux notés par les clients de la capitale.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {mockArtisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </div>
    </section>
  );
}
