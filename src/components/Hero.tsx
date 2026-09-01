'use client';

import { Search, MapPin, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche:', search, category);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-white py-10 sm:py-16 md:py-24 px-4 sm:px-6">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Badge Intro */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-blue-100/80 text-blue-700 rounded-full text-xs sm:text-sm font-semibold border border-blue-200/50 shadow-xs text-center">
            <Sparkles size={14} className="text-blue-600 shrink-0" />
            <span>N°1 des artisans qualifiés à Madagascar</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Trouvez l'artisan idéal <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              en toute confiance
            </span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-normal px-2">
            Plombiers, électriciens, menuisiers et professionnels vérifiés à Antananarivo et ses environs.
          </p>
        </div>

        {/* Searchbar Card */}
        <form
          onSubmit={handleSearch}
          className="bg-white/90 backdrop-blur-lg shadow-xl sm:shadow-2xl rounded-2xl p-3 sm:p-4 border border-gray-100/80 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Input recherche */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <Input
                type="text"
                placeholder="Quel métier ou service cherchez-vous ?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 sm:h-12 text-sm border-gray-200 focus:border-blue-500 rounded-xl bg-gray-50/50"
              />
            </div>

            {/* Select catégorie */}
            <div className="md:col-span-4 relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-4 h-11 sm:h-12 text-sm border border-gray-200 rounded-xl bg-gray-50/50 text-gray-700 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="">Toutes les catégories</option>
                <option value="menuiserie">Menuiserie & Bois</option>
                <option value="electricite">Électricité & Dépannage</option>
                <option value="plomberie">Plomberie & Sanitaire</option>
                <option value="maconnerie">Maçonnerie & Gros œuvre</option>
                <option value="peinture">Peinture & Décoration</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3">
              <Button
                type="submit"
                className="w-full h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all gap-2 text-sm"
              >
                <Search size={18} />
                Rechercher
              </Button>
            </div>
          </div>
        </form>

        {/* Quick Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-10 text-xs sm:text-sm font-semibold text-gray-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
            <span>100% Vérifiés</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-amber-500 fill-amber-500 shrink-0" />
            <span>Note moyenne 4.8 / 5</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles size={16} className="text-blue-500 shrink-0" />
            <span>Devis & Contact Rapide</span>
          </div>
        </div>
      </div>
    </section>
  );
}