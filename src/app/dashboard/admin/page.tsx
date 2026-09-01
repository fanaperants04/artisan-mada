'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Shield,
  Users,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Check,
  Trash2,
  FileCheck,
  UserX,
  LogOut,
  ArrowLeft,
  BarChart3,
  PieChart,
  TrendingUp,
  MapPin,
  Activity
} from 'lucide-react';

// Mock initial pending artisan verification dossiers
const INITIAL_PENDING_DOSSIERS = [
  {
    id: 'DOS-101',
    name: 'Ravao Ébéniste',
    category: 'Menuiserie',
    location: 'Antananarivo, Ankorondrano',
    date: '01 Sept 2026',
    phone: '+261 34 55 666 77',
    email: 'ravao.ebeniste@gmail.com',
    status: 'En attente',
  },
  {
    id: 'DOS-102',
    name: 'Bako Peinture',
    category: 'Peinture & Décoration',
    location: 'Majunga',
    date: '31 Août 2026',
    phone: '+261 32 88 999 00',
    email: 'bako.peinture@mada.mg',
    status: 'En attente',
  },
  {
    id: 'DOS-103',
    name: 'Tojo Plomberie',
    category: 'Plomberie & Sanitaire',
    location: 'Antsirabe',
    date: '30 Août 2026',
    phone: '+261 33 11 222 33',
    email: 'tojo.plomberie@gmail.com',
    status: 'En attente',
  },
];

// Mock registered artisans
const INITIAL_ARTISANS = [
  {
    id: 'ART-001',
    name: 'Jean Carpentier',
    category: 'Menuiserie & Agencement',
    location: 'Antananarivo',
    phone: '+261 34 12 345 67',
    email: 'artisan@mada.mg',
    status: 'Vérifié',
  },
  {
    id: 'ART-002',
    name: 'Marie Électricienne',
    category: 'Électricité',
    location: 'Antananarivo',
    phone: '+261 32 12 345 67',
    email: 'marie.elec@mada.mg',
    status: 'Vérifié',
  },
  {
    id: 'ART-003',
    name: 'Ahmed Plombier',
    category: 'Plomberie',
    location: 'Antananarivo',
    phone: '+261 30 12 345 67',
    email: 'ahmed.plombier@mada.mg',
    status: 'Vérifié',
  },
  {
    id: 'ART-004',
    name: 'Luc BTP',
    category: 'Maçonnerie & Rénovation',
    location: 'Tamatave',
    phone: '+261 34 99 888 77',
    email: 'luc.btp@gmail.com',
    status: 'En attente',
  },
];

// Mock Monthly Registration Growth data for Chart
const MONTHLY_REGISTRATIONS = [
  { month: 'Jan', count: 45 },
  { month: 'Fév', count: 62 },
  { month: 'Mar', count: 85 },
  { month: 'Avr', count: 110 },
  { month: 'Mai', count: 140 },
  { month: 'Juin', count: 175 },
  { month: 'Juil', count: 210 },
  { month: 'Août', count: 260 },
  { month: 'Sept', count: 310 },
];

// Mock Category Breakdown data for Chart
const CATEGORY_BREAKDOWN = [
  { name: 'Menuiserie & Bois', percentage: 35, count: 52, colorClass: 'bg-amber-500', borderClass: 'border-amber-500' },
  { name: 'Électricité & Énergie', percentage: 25, count: 38, colorClass: 'bg-blue-500', borderClass: 'border-blue-500' },
  { name: 'Plomberie & Sanitaire', percentage: 20, count: 30, colorClass: 'bg-emerald-500', borderClass: 'border-emerald-500' },
  { name: 'Peinture & Déco', percentage: 12, count: 18, colorClass: 'bg-purple-500', borderClass: 'border-purple-500' },
  { name: 'Maçonnerie & BTP', percentage: 8, count: 12, colorClass: 'bg-rose-500', borderClass: 'border-rose-500' },
];

// Mock Regional Breakdown data for Chart
const REGIONAL_BREAKDOWN = [
  { region: 'Antananarivo (Analamanga)', percentage: 56, count: 84 },
  { region: 'Tamatave (Atsinanana)', percentage: 18, count: 27 },
  { region: 'Majunga (Boeny)', percentage: 12, count: 18 },
  { region: 'Antsirabe (Vakinankaratra)', percentage: 9, count: 14 },
  { region: 'Fianarantsoa (Matsiatra)', percentage: 5, count: 7 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'pending' | 'artisans'>('analytics');
  const [pendingDossiers, setPendingDossiers] = useState(INITIAL_PENDING_DOSSIERS);
  const [artisans, setArtisans] = useState(INITIAL_ARTISANS);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleValidateDossier = (dossierId: string) => {
    const dossier = pendingDossiers.find((d) => d.id === dossierId);
    if (!dossier) return;

    setPendingDossiers((prev) => prev.filter((d) => d.id !== dossierId));
    setArtisans((prev) => [
      ...prev,
      {
        id: `ART-${Date.now().toString().slice(-3)}`,
        name: dossier.name,
        category: dossier.category,
        location: dossier.location,
        phone: dossier.phone,
        email: dossier.email,
        status: 'Vérifié',
      },
    ]);

    showNotification(`Le dossier de ${dossier.name} a été validé avec succès.`);
  };

  const handleRejectDossier = (dossierId: string) => {
    const dossier = pendingDossiers.find((d) => d.id === dossierId);
    if (!dossier) return;

    setPendingDossiers((prev) => prev.filter((d) => d.id !== dossierId));
    showNotification(`Le dossier de ${dossier.name} a été rejeté.`);
  };

  const handleToggleStatus = (artisanId: string) => {
    setArtisans((prev) =>
      prev.map((a) => {
        if (a.id === artisanId) {
          const newStatus = a.status === 'Vérifié' ? 'En attente' : 'Vérifié';
          showNotification(`Le statut de ${a.name} est maintenant: ${newStatus}`);
          return { ...a, status: newStatus };
        }
        return a;
      })
    );
  };

  const handleDeleteArtisan = (artisanId: string) => {
    const target = artisans.find((a) => a.id === artisanId);
    setArtisans((prev) => prev.filter((a) => a.id !== artisanId));
    if (target) {
      showNotification(`L'artisan ${target.name} a été supprimé.`);
    }
  };

  const filteredArtisans = artisans.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verifiedCount = artisans.filter((a) => a.status === 'Vérifié').length;
  const maxRegCount = Math.max(...MONTHLY_REGISTRATIONS.map((d) => d.count));

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 dark">
      {/* Dark Header Controls Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 py-3.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Shield size={20} />
          </div>
          <div>
            <span className="font-black text-lg tracking-tight text-white flex items-center gap-2">
              ArtisansMada <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/50">ADMIN</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <ArrowLeft size={14} /> Retour au site
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-950/40 border border-red-900/30 transition"
          >
            <LogOut size={14} /> Déconnexion
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:py-8 space-y-6">
        {/* Dark Banner */}
        <Card className="bg-slate-900 border-slate-800/80 shadow-2xl overflow-hidden rounded-2xl">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-purple-950/80 text-purple-300 border border-purple-800/60">
                <Shield size={14} /> Supervision & Graphiques Analytiques
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                Tableau de Bord Administration
              </h1>
              <p className="text-slate-400 text-sm max-w-xl">
                Suivez la croissance des inscriptions, analysez la répartition par métier et validez les nouveaux dossiers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Global Notification */}
        {notification && (
          <div className="p-3.5 text-xs font-bold text-emerald-300 bg-emerald-950/80 rounded-xl border border-emerald-800/60 flex items-center gap-2 animate-in fade-in duration-200 shadow-lg">
            <Check size={16} className="shrink-0 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900 border-slate-800/80 shadow-xl rounded-2xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/60 text-purple-400 flex items-center justify-center shrink-0">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Inscriptions</p>
                <p className="text-3xl font-black text-white tracking-tight">{artisans.length + 500}</p>
                <p className="text-xs text-purple-400 font-medium flex items-center gap-1">
                  <TrendingUp size={12} /> +24% ce mois-ci
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800/80 shadow-xl rounded-2xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0">
                <UserCheck size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Artisans Certifiés</p>
                <p className="text-3xl font-black text-blue-400 tracking-tight">{verifiedCount}</p>
                <p className="text-xs text-blue-400 font-medium">Badges de vérification actifs</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800/80 shadow-xl rounded-2xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800/60 text-amber-400 flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Dossiers en Attente</p>
                <p className="text-3xl font-black text-amber-400 tracking-tight">{pendingDossiers.length}</p>
                <p className="text-xs text-amber-400 font-medium">Demandes à valider</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-2 sm:gap-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 pb-3 px-2 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 size={16} /> Chartes & Analytique
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 pb-3 px-2 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'pending'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock size={16} /> Validation des Dossiers ({pendingDossiers.length})
          </button>
          <button
            onClick={() => setActiveTab('artisans')}
            className={`flex items-center gap-2 pb-3 px-2 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'artisans'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users size={16} /> Gestion des Artisans ({artisans.length})
          </button>
        </div>

        {/* Tab 1: Chartes Graphiques & Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Chart 1: Histogramme d'Évolution des Inscriptions */}
            <Card className="bg-slate-900 border-slate-800/80 shadow-2xl rounded-2xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                      <BarChart3 className="text-purple-400" size={20} /> Évolution des Inscriptions Mensuelles
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Croissance cumulée du nombre de comptes enregistrés sur ArtisansMada en 2026.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-purple-950/60 border-purple-800 text-purple-300 text-xs font-semibold">
                    2026 • Madagascar
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {/* SVG Visual Bar Chart */}
                <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2 border-b border-slate-800">
                  {MONTHLY_REGISTRATIONS.map((item, idx) => {
                    const heightPercent = Math.round((item.count / maxRegCount) * 100);
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                        <span className="text-[10px] font-mono font-bold text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-950/90 px-1.5 py-0.5 rounded border border-purple-800/60">
                          {item.count}
                        </span>
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-gradient-to-t from-purple-700 to-purple-500 rounded-t-lg group-hover:from-purple-600 group-hover:to-purple-400 transition-all duration-300 shadow-md shadow-purple-950/50"
                        />
                        <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Charts Row: Split 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chart 2: Répartition par Métier */}
              <Card className="bg-slate-900 border-slate-800/80 shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
                    <PieChart className="text-blue-400" size={18} /> Répartition par Spécialité
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Proportion des artisans certifiés selon leur secteur d'activité.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {CATEGORY_BREAKDOWN.map((cat, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-200 flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${cat.colorClass}`}></span>
                          {cat.name}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {cat.count} artisans ({cat.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          style={{ width: `${cat.percentage}%` }}
                          className={`h-full rounded-full ${cat.colorClass} transition-all duration-500`}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Chart 3: Répartition Régionale à Madagascar */}
              <Card className="bg-slate-900 border-slate-800/80 shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
                    <MapPin className="text-emerald-400" size={18} /> Concentration par Région
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Distribution des comptes professionnels enregistrés dans les villes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {REGIONAL_BREAKDOWN.map((reg, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-200">{reg.region}</span>
                        <span className="text-emerald-400 font-mono">
                          {reg.count} ({reg.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          style={{ width: `${reg.percentage}%` }}
                          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 2: Validation des Dossiers */}
        {activeTab === 'pending' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <Card className="bg-slate-900 border-slate-800/80 shadow-2xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                  <FileCheck className="text-amber-400" size={20} /> Dossiers en attente de vérification
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Examinez et validez les nouvelles demandes d'inscription professionnelle des artisans.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingDossiers.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <CheckCircle2 size={40} className="mx-auto text-emerald-400" />
                    <p className="font-bold text-slate-200 text-base">Aucun dossier en attente</p>
                    <p className="text-xs text-slate-400">Toutes les demandes de validation ont été traitées.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingDossiers.map((dossier) => (
                      <div
                        key={dossier.id}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-500/40 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-white text-base">{dossier.name}</span>
                            <span className="text-[10px] px-2 py-0.5 font-bold rounded-md bg-amber-950/80 text-amber-300 border border-amber-800/60">
                              {dossier.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium">
                            📍 {dossier.location} • 📞 {dossier.phone} • ✉️ {dossier.email}
                          </p>
                          <span className="text-[11px] text-slate-500 block font-mono">
                            Dossier soumis le : {dossier.date} ({dossier.id})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <Button
                            onClick={() => handleValidateDossier(dossier.id)}
                            className="flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-9 rounded-xl gap-1.5 shadow-md"
                          >
                            <CheckCircle2 size={16} /> Valider
                          </Button>
                          <Button
                            onClick={() => handleRejectDossier(dossier.id)}
                            variant="outline"
                            className="flex-1 md:flex-initial bg-slate-900 text-red-400 border-red-950 hover:bg-red-950/40 font-bold text-xs h-9 rounded-xl gap-1.5"
                          >
                            <XCircle size={16} /> Refuser
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 3: Gestion des Artisans Inscrits */}
        {activeTab === 'artisans' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <Card className="bg-slate-900 border-slate-800/80 shadow-2xl rounded-2xl">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                    <Users className="text-blue-400" size={20} /> Annuaire des Artisans Inscrits
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Supervisez les professionnels enregistrés et contrôlez leur statut de vérification.
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="text"
                    placeholder="Rechercher nom, ville..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-9 rounded-xl text-xs bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-blue-500"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/60">
                        <th className="p-3 rounded-l-xl">Artisan</th>
                        <th className="p-3">Métier</th>
                        <th className="p-3">Ville</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Statut</th>
                        <th className="p-3 text-right rounded-r-xl">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredArtisans.map((artisan) => (
                        <tr key={artisan.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3">
                            <span className="font-bold text-white block">{artisan.name}</span>
                            <span className="text-[11px] text-slate-500 font-mono">{artisan.id}</span>
                          </td>
                          <td className="p-3 font-medium text-slate-300">{artisan.category}</td>
                          <td className="p-3 text-xs text-slate-400">{artisan.location}</td>
                          <td className="p-3 text-xs text-slate-400">{artisan.phone}</td>
                          <td className="p-3">
                            <span
                              className={`text-[10px] px-2.5 py-0.5 font-bold rounded-full border ${
                                artisan.status === 'Vérifié'
                                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60'
                                  : 'bg-amber-950/80 text-amber-400 border-amber-800/60'
                              }`}
                            >
                              {artisan.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleToggleStatus(artisan.id)}
                                title="Changer le statut"
                                className="h-8 px-2.5 text-xs font-bold text-blue-400 hover:bg-blue-950/50 hover:text-blue-300"
                              >
                                {artisan.status === 'Vérifié' ? (
                                  <UserX size={15} className="text-amber-400" />
                                ) : (
                                  <UserCheck size={15} className="text-emerald-400" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteArtisan(artisan.id)}
                                title="Supprimer"
                                className="h-8 px-2 text-xs font-bold text-red-400 hover:bg-red-950/50 hover:text-red-300"
                              >
                                <Trash2 size={15} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
