'use client';

import { Users, Star, CheckCircle, TrendingUp } from 'lucide-react';

const stats = [
  {
    id: 1,
    icon: Users,
    value: '150+',
    label: 'Artisans vérifiés',
    color: 'text-blue-600',
  },
  {
    id: 2,
    icon: Star,
    value: '4.8★',
    label: 'Note moyenne',
    color: 'text-yellow-600',
  },
  {
    id: 3,
    icon: CheckCircle,
    value: '500+',
    label: 'Clients satisfaits',
    color: 'text-green-600',
  },
  {
    id: 4,
    icon: TrendingUp,
    value: '1000+',
    label: 'Services complétés',
    color: 'text-purple-600',
  },
];

export default function Stats() {
  return (
    <section className="py-12 md:py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Nos chiffres
          </h2>
          <p className="text-gray-600">
            Une plateforme de confiance pour les artisans et clients
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`${stat.color} mx-auto mb-3 flex justify-center`}>
                  <Icon size={32} />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}