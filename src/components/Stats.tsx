'use client';

import { Users, Star, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  {
    id: 1,
    icon: Users,
    value: '150+',
    label: 'Artisans qualifiés',
    description: 'Vérifiés sur le terrain à Antananarivo',
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    id: 2,
    icon: Star,
    value: '4.8 / 5',
    label: 'Satisfaction globale',
    description: 'Calculée d’après +500 avis vérifiés',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 3,
    icon: CheckCircle2,
    value: '500+',
    label: 'Missions réussies',
    description: 'Dépannages et chantiers livrés',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 4,
    icon: TrendingUp,
    value: '99.2%',
    label: 'Réactivité garantie',
    description: 'Prise de contact sous 24h',
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
];

export default function Stats() {
  return (
    <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 space-y-2">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            La référence des artisans à Madagascar
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm md:text-base px-2">
            Des chiffres qui témoignent de notre engagement pour la qualité et la confiance.
          </p>
        </div>

        {/* Responsive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.id}
                className="bg-gray-800/80 backdrop-blur-sm border-gray-700/60 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 rounded-2xl"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className={`w-11 sm:w-12 h-11 sm:h-12 rounded-xl border ${stat.color} flex items-center justify-center mb-3 sm:mb-4 shrink-0`}>
                    <Icon size={22} />
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-200">
                    {stat.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-normal">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}