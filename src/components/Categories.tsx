'use client';

import { Hammer, Zap, Wrench, Building2, Paintbrush, Home } from 'lucide-react';

const categories = [
  { id: 1, name: 'Menuiserie', icon: Hammer, color: 'bg-orange-100 text-orange-600' },
  { id: 2, name: 'Électricité', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
  { id: 3, name: 'Plomberie', icon: Wrench, color: 'bg-blue-100 text-blue-600' },
  { id: 4, name: 'Maçonnerie', icon: Building2, color: 'bg-red-100 text-red-600' },
  { id: 5, name: 'Peinture', icon: Paintbrush, color: 'bg-purple-100 text-purple-600' },
  { id: 6, name: 'Rénovation', icon: Home, color: 'bg-green-100 text-green-600' },
];

export default function Categories() {
  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Catégories d'artisans
          </h2>
          <p className="text-gray-600">
            Trouvez le type de service que vous recherchez
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 text-center transition-all duration-200 hover:shadow-md active:scale-95"
              >
                <div className={`${cat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  {cat.name}
                </h3>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}