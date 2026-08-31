'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Futur: rediriger vers page résultats
    console.log('Chercher:', search, category);
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-8 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
            Trouvez l'artisan qu'il vous faut
          </h1>
          <p className="text-lg text-gray-600">
            Plombiers, électriciens, menuisiers et plus à Antananarivo
          </p>
        </div>

        {/* Searchbar */}
        <form onSubmit={handleSearch} className="bg-white shadow-lg rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recherche texte */}
            <div className="md:col-span-1">
              <input
                type="text"
                placeholder="Nom artisan, service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Catégorie */}
            <div className="md:col-span-1">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              >
                <option value="">Toutes catégories</option>
                <option value="menuiserie">Menuiserie</option>
                <option value="electricite">Électricité</option>
                <option value="plomberie">Plomberie</option>
                <option value="maconnerie">Maçonnerie</option>
              </select>
            </div>

            {/* Bouton recherche */}
            <div className="md:col-span-1">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded flex items-center justify-center gap-2 font-semibold"
              >
                <Search size={20} />
                Chercher
              </button>
            </div>
          </div>
        </form>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">150+</p>
            <p className="text-gray-600 text-sm">Artisans</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">500+</p>
            <p className="text-gray-600 text-sm">Clients satisfaits</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-2xl md:text-3xl font-bold text-blue-600">4.8★</p>
            <p className="text-gray-600 text-sm">Note moyenne</p>
          </div>
        </div>
      </div>
    </section>
  );
}