import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wrench, Calendar, CheckCircle2, Star, Eye } from 'lucide-react';

export const metadata = {
  title: 'Espace Artisan | ArtisansMada',
};

export default function ArtisanDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:py-8 space-y-6">
        {/* Banner */}
        <Card className="bg-white border-gray-100 shadow-sm overflow-hidden rounded-2xl">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <Badge variant="warning" className="gap-1 px-3 py-1 text-xs">
                <Wrench size={14} /> Espace Professionnel Artisan
              </Badge>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Tableau de bord Artisan
              </h1>
              <p className="text-gray-600 text-sm max-w-xl">
                Gérez vos demandes de devis, suivez l'avancement de vos chantiers et mettez à jour votre vitrine.
              </p>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold gap-2 rounded-xl shadow-md">
              <Eye size={16} /> Aperçu de mon profil public
            </Button>
          </CardContent>
        </Card>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Nouvelles demandes</h3>
              <p className="text-4xl font-black text-amber-600 tracking-tight">4</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">À traiter cette semaine</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Wrench size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Chantiers actifs</h3>
              <p className="text-4xl font-black text-blue-600 tracking-tight">3</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">En cours à Antananarivo</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Services complétés</h3>
              <p className="text-4xl font-black text-emerald-600 tracking-tight">48</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Réalisés avec succès</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Star size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Note de réputation</h3>
              <p className="text-4xl font-black text-purple-600 tracking-tight">4.8★</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Basé sur 32 avis clients</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
