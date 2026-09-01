'use client';

import { Hammer, Zap, Wrench, Building2, Paintbrush, Home, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = [
  { id: 1, name: 'Menuiserie', count: '45 artisans', icon: Hammer, color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { id: 2, name: 'Électricité', count: '38 artisans', icon: Zap, color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  { id: 3, name: 'Plomberie', count: '42 artisans', icon: Wrench, color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 4, name: 'Maçonnerie', count: '29 artisans', icon: Building2, color: 'bg-rose-50 text-rose-600 border-rose-200' },
  { id: 5, name: 'Peinture', count: '31 artisans', icon: Paintbrush, color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { id: 6, name: 'Rénovation', count: '24 artisans', icon: Home, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
];

export default function Categories() {
  return (
    <section id="categories" className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <Badge variant="outline" className="mb-2 text-blue-600 border-blue-200 bg-blue-50 text-xs">
              Explorer par métier
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Catégories d'artisans
            </h2>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm max-w-md">
            Trouvez les meilleurs spécialistes qualifiés pour vos travaux de rénovation, construction et entretien.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card
                key={cat.id}
                className="group relative cursor-pointer border border-gray-100 bg-white hover:bg-gradient-to-b hover:from-blue-50/50 hover:to-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg rounded-2xl"
              >
                <CardContent className="p-4 sm:p-5 flex flex-col items-center text-center">
                  <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl border ${cat.color} flex items-center justify-center mb-2.5 sm:mb-3 shadow-xs transition-transform group-hover:scale-110 shrink-0`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] sm:text-xs text-gray-400 mt-0.5 font-medium">
                    {cat.count}
                  </span>
                  <div className="mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hidden sm:block">
                    <ArrowRight size={14} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}