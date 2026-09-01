import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserCheck, Search, Clock, Star, Heart } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Espace Client | ArtisansMada',
};

export default function ClientDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:py-8 space-y-6">
        {/* Banner */}
        <Card className="bg-white border-gray-100 shadow-sm overflow-hidden rounded-2xl">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <Badge variant="info" className="gap-1 px-3 py-1 text-xs">
                <UserCheck size={14} /> Espace Particulier
              </Badge>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Tableau de bord Client
              </h1>
              <p className="text-gray-600 text-sm max-w-xl">
                Retrouvez vos demandes d'intervention, vos artisans favoris et suivez l'avancement de vos projets.
              </p>
            </div>
            <Link
              href="/#categories"
              className={cn(
                buttonVariants(),
                'bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 rounded-xl shadow-md'
              )}
            >
              <Search size={16} /> Trouver un artisan
            </Link>
          </CardContent>
        </Card>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Demandes en cours</h3>
              <p className="text-4xl font-black text-blue-600 tracking-tight">2</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Plomberie & Électricité</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Star size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Avis rédigés</h3>
              <p className="text-4xl font-black text-amber-600 tracking-tight">5</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Note moyenne attribuée : 4.9★</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Artisans favoris</h3>
              <p className="text-4xl font-black text-rose-600 tracking-tight">3</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Enregistrés dans votre carnet</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
