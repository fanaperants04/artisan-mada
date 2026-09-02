'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Wrench,
  Star,
  User,
  Phone,
  MapPin,
  Save,
  Check,
  Briefcase,
  Sliders,
  Award,
  Mail,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface ArtisanProfile {
  id: string;
  name: string;
  category_id: string;
  phone: string | null;
  email: string | null;
  city: string;
  region: string;
  bio: string | null;
  is_available: boolean;
}

interface Reputation {
  avg_rating: number;
  recommendation_rate: number;
  punctuality_rate: number;
  review_count: number;
}

const initialCategories: Category[] = [
  { id: 'menuiserie', name: 'Menuiserie' },
  { id: 'plomberie', name: 'Plomberie' },
  { id: 'electricite', name: 'Électricité' },
  { id: 'maçonnerie', name: 'Maçonnerie' },
  { id: 'peinture', name: 'Peinture' },
];

const initialProfile: ArtisanProfile = {
  id: 'artisan-demo-1',
  name: 'Business artisan 1',
  category_id: 'menuiserie',
  phone: '+261 34 00 000 00',
  email: 'artisan1@mada.mg',
  city: 'Antananarivo',
  region: 'Analamanga',
  bio: 'Artisan qualifié spécialisé dans la menuiserie intérieure et la rénovation.',
  is_available: true,
};

const initialReputation: Reputation = {
  avg_rating: 4.8,
  recommendation_rate: 92,
  punctuality_rate: 95,
  review_count: 18,
};

export default function ArtisanDashboard() {
  const [activeTab, setActiveTab] = useState<'reputation' | 'profile'>('reputation');
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [profile, setProfile] = useState<ArtisanProfile>(initialProfile);
  const [reputation, setReputation] = useState<Reputation>(initialReputation);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleProfileChange = <K extends keyof ArtisanProfile>(field: K, value: ArtisanProfile[K]) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');

    if (!profile.name || !profile.phone || !profile.email || !profile.city || !profile.region) {
      setSaveError('Veuillez remplir tous les champs requis.');
      return;
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:py-8 space-y-6">
        <Card className="bg-white border-gray-100 shadow-sm overflow-hidden rounded-2xl">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <Badge variant="warning" className="gap-1 px-3 py-1 text-xs font-semibold">
                <Wrench size={14} /> Espace Professionnel Artisan
              </Badge>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Tableau de bord Artisan
              </h1>
              <p className="text-gray-600 text-sm max-w-xl">
                Consultez votre note de réputation et modifiez vos informations de profil.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Disponible
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-gray-100 shadow-xs rounded-2xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Star size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Note de Réputation</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight">{reputation.avg_rating} / 5</p>
                <p className="text-xs text-purple-600 font-medium">{reputation.review_count} avis reçus</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-xs rounded-2xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <User size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Statut du Profil</p>
                <p className="text-xl font-bold text-gray-900 truncate max-w-[160px]">{profile.name}</p>
                <p className="text-xs text-blue-600 font-medium">Profil actif sur l&apos;annuaire</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex border-b border-gray-200 gap-2 sm:gap-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('reputation')}
            className={`flex items-center gap-2 pb-3 px-2 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'reputation'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Star size={16} /> Note
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 pb-3 px-2 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Sliders size={16} /> Modification du Profil
          </button>
        </div>

        {activeTab === 'reputation' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <Card className="bg-white border-gray-100 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-gray-900">
                  <Award className="text-purple-600" size={20} /> Aperçu de votre Réputation
                </CardTitle>
                <CardDescription>
                  Évaluation globale de vos prestations et niveau de satisfaction.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-purple-50/60 rounded-2xl border border-purple-100 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-5xl font-black text-purple-700 tracking-tight">
                      {reputation.avg_rating} <span className="text-2xl text-purple-400 font-normal">/ 5</span>
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-1 my-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={
                            star <= Math.round(reputation.avg_rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-200'
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-purple-900">
                      Basé sur {reputation.review_count} avis clients
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <div className="bg-white p-3.5 rounded-xl border border-purple-100 text-center">
                      <p className="text-2xl font-bold text-gray-900">{reputation.recommendation_rate}%</p>
                      <p className="text-[11px] text-gray-500 font-medium">Recommandation</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-purple-100 text-center">
                      <p className="text-2xl font-bold text-gray-900">{reputation.punctuality_rate}%</p>
                      <p className="text-[11px] text-gray-500 font-medium">Ponctualité</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <Card className="bg-white border-gray-100 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-gray-900">
                  <Sliders className="text-blue-600" size={20} /> Modifier mes informations de profil
                </CardTitle>
                <CardDescription>
                  Mettez à jour vos coordonnées publiques et vos informations professionnelles pour les clients.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {isSaved && (
                    <div className="p-3.5 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2 animate-in fade-in duration-200">
                      <Check size={16} className="shrink-0 text-emerald-600" />
                      <span>Vos informations de profil ont été enregistrées avec succès !</span>
                    </div>
                  )}
                  {saveError && (
                    <div className="p-3.5 text-xs font-bold text-red-700 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0 text-red-600" />
                      <span>{saveError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <User size={14} className="text-gray-400" /> Nom Complet / Raison Sociale
                      </label>
                      <Input
                        type="text"
                        value={profile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        required
                        className="h-10 rounded-xl text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <Briefcase size={14} className="text-gray-400" /> Spécialité / Métier
                      </label>
                      <select
                        value={profile.category_id}
                        onChange={(e) => handleProfileChange('category_id', e.target.value)}
                        required
                        className="w-full h-10 rounded-xl text-sm border border-gray-200 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <Phone size={14} className="text-gray-400" /> Numéro de téléphone
                      </label>
                      <Input
                        type="text"
                        value={profile.phone ?? ''}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        required
                        className="h-10 rounded-xl text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <Mail size={14} className="text-gray-400" /> Adresse Email
                      </label>
                      <Input
                        type="email"
                        value={profile.email ?? ''}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        required
                        className="h-10 rounded-xl text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <MapPin size={14} className="text-gray-400" /> Ville / Quartier
                      </label>
                      <Input
                        type="text"
                        value={profile.city}
                        onChange={(e) => handleProfileChange('city', e.target.value)}
                        required
                        className="h-10 rounded-xl text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <MapPin size={14} className="text-gray-400" /> Région
                      </label>
                      <Input
                        type="text"
                        value={profile.region}
                        onChange={(e) => handleProfileChange('region', e.target.value)}
                        required
                        className="h-10 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <FileText size={14} className="text-gray-400" /> Présentation & Biographie
                    </label>
                    <textarea
                      rows={4}
                      value={profile.bio ?? ''}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      className="w-full p-3 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_available"
                      checked={profile.is_available}
                      onChange={(e) => handleProfileChange('is_available', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="is_available" className="text-xs font-bold text-gray-700">
                      Disponible pour de nouveaux chantiers
                    </label>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 h-11 rounded-xl shadow-md gap-2"
                    >
                      <Save size={16} /> Enregistrer les modifications
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
