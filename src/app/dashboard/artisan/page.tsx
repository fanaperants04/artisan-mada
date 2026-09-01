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
  FileText
} from 'lucide-react';

// Mock initial profile
const INITIAL_PROFILE = {
  name: 'Jean Carpentier',
  category: 'Menuiserie & Agencement',
  phone: '+261 34 12 345 67',
  email: 'artisan@mada.mg',
  location: 'Antananarivo, Ankorondrano',
  bio: 'Artisan menuisier passionné avec plus de 10 ans d\'expérience dans la fabrication de meubles sur mesure, parquets et travaux de rénovation en bois noble à Madagascar.',
  isAvailable: true,
};

export default function ArtisanDashboard() {
  const [activeTab, setActiveTab] = useState<'reputation' | 'profile'>('reputation');
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [isSaved, setIsSaved] = useState(false);

  const handleProfileChange = (field: keyof typeof INITIAL_PROFILE, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:py-8 space-y-6">
        {/* Banner */}
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
                {profile.isAvailable ? 'Disponible pour chantiers' : 'Indisponible'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-gray-100 shadow-xs rounded-2xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Star size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Note de Réputation</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight">4.8 / 5</p>
                <p className="text-xs text-purple-600 font-medium">Évaluation globale</p>
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
                <p className="text-xs text-blue-600 font-medium">Profil vérifié à 100%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
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

        {/* Tab Content 1: Reputation & Rating */}
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
                    <p className="text-5xl font-black text-purple-700 tracking-tight">4.8 <span className="text-2xl text-purple-400 font-normal">/ 5</span></p>
                    <div className="flex items-center justify-center md:justify-start gap-1 my-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={18} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-purple-900">Excellente réputation globale</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <div className="bg-white p-3.5 rounded-xl border border-purple-100 text-center">
                      <p className="text-2xl font-bold text-gray-900">98%</p>
                      <p className="text-[11px] text-gray-500 font-medium">Recommandation</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-purple-100 text-center">
                      <p className="text-2xl font-bold text-gray-900">100%</p>
                      <p className="text-[11px] text-gray-500 font-medium">Ponctualité</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab Content 3: Profile Modification */}
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
                      <Input
                        type="text"
                        value={profile.category}
                        onChange={(e) => handleProfileChange('category', e.target.value)}
                        required
                        className="h-10 rounded-xl text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <Phone size={14} className="text-gray-400" /> Numéro de téléphone
                      </label>
                      <Input
                        type="text"
                        value={profile.phone}
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
                        value={profile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        required
                        className="h-10 rounded-xl text-sm"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <MapPin size={14} className="text-gray-400" /> Localisation / Ville
                      </label>
                      <Input
                        type="text"
                        value={profile.location}
                        onChange={(e) => handleProfileChange('location', e.target.value)}
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
                      value={profile.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      className="w-full p-3 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
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
