import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, UserCheck, Activity } from 'lucide-react';

export const metadata = {
  title: 'Espace Administration | ArtisansMada',
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:py-8 space-y-6">
        {/* Banner */}
        <Card className="bg-white border-gray-100 shadow-sm overflow-hidden rounded-2xl">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <Badge variant="destructive" className="gap-1 px-3 py-1 text-xs">
                <Shield size={14} /> Espace Administration
              </Badge>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Supervision de la Plateforme
              </h1>
              <p className="text-gray-600 text-sm max-w-xl">
                Contrôlez les validations d'artisans, supervisez l'activité générale et validez les comptes professionnels.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Total Utilisateurs</h3>
              <p className="text-4xl font-black text-purple-600 tracking-tight">650+</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Clients & Artisans inscrits</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <UserCheck size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Artisans Vérifiés</h3>
              <p className="text-4xl font-black text-blue-600 tracking-tight">150</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Badges de vérification actifs</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Dossiers en attente</h3>
              <p className="text-4xl font-black text-amber-600 tracking-tight">8</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">À contrôler sous 48h</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Activity size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Mises en relation</h3>
              <p className="text-4xl font-black text-emerald-600 tracking-tight">1,240</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Interventions générées</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
