'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Activity,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface Dossier {
  id: string;
  name: string;
  city: string;
  region: string;
  phone: string;
  email: string;
  status: string;
  category_id: string;
  created_at: string;
}

interface Artisan {
  id: string;
  name: string;
  city: string;
  region: string;
  phone: string | null;
  email: string | null;
  status: string;
  category_id: string;
  created_at: string;
}

interface CategoryStat {
  category_id: string;
  category_name: string;
  artisan_count: number;
  percentage: number | null;
}

interface RegionStat {
  region: string;
  artisan_count: number;
  percentage: number | null;
}

const MONTH_LABELS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
const CHART_COLORS = ['bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-rose-500', 'bg-cyan-500'];

const initialCategories: Category[] = [
  { id: 'menuiserie', name: 'Menuiserie' },
  { id: 'plomberie', name: 'Plomberie' },
  { id: 'electricite', name: 'Électricité' },
  { id: 'peinture', name: 'Peinture' },
  { id: 'maçonnerie', name: 'Maçonnerie' },
  { id: 'jardinage', name: 'Jardinage' },
];

const initialArtisans: Artisan[] = [
  { id: 'a1', name: 'Rakoto Electric', city: 'Antananarivo', region: 'Analamanga', phone: '+261 34 12 345 67', email: 'rakoto@example.com', status: 'Vérifié', category_id: 'electricite', created_at: '2025-01-12T09:00:00.000Z' },
  { id: 'a2', name: 'Mina Carrelage', city: 'Toamasina', region: 'Atsinanana', phone: '+261 32 98 765 43', email: 'mina@example.com', status: 'Vérifié', category_id: 'maçonnerie', created_at: '2025-02-10T09:00:00.000Z' },
  { id: 'a3', name: 'Noro Plomberie', city: 'Fianarantsoa', region: 'Fianarantsoa', phone: '+261 33 45 678 91', email: 'noro@example.com', status: 'En attente', category_id: 'plomberie', created_at: '2025-03-03T09:00:00.000Z' },
  { id: 'a4', name: 'Lova Peinture', city: 'Antsirabe', region: 'Vakinankaratra', phone: '+261 34 67 890 12', email: 'lova@example.com', status: 'Vérifié', category_id: 'peinture', created_at: '2025-04-09T09:00:00.000Z' },
  { id: 'a5', name: 'Tiana Jardin', city: 'Mahajanga', region: 'Boeny', phone: '+261 32 76 543 21', email: 'tiana@example.com', status: 'En attente', category_id: 'jardinage', created_at: '2025-05-14T09:00:00.000Z' },
];

const initialPendingDossiers: Dossier[] = [
  { id: 'd1', name: 'Mamy Rénovation', city: 'Antananarivo', region: 'Analamanga', phone: '+261 34 00 111 11', email: 'mamy@example.com', status: 'En attente', category_id: 'peinture', created_at: '2025-06-20T09:00:00.000Z' },
  { id: 'd2', name: 'Jean Select', city: 'Toliara', region: 'Atsimo-Andrefana', phone: '+261 34 00 222 22', email: 'jean@example.com', status: 'En attente', category_id: 'electricite', created_at: '2025-06-24T09:00:00.000Z' },
];

const initialCategoryStats: CategoryStat[] = [
  { category_id: 'electricite', category_name: 'Électricité', artisan_count: 8, percentage: 28 },
  { category_id: 'plomberie', category_name: 'Plomberie', artisan_count: 6, percentage: 21 },
  { category_id: 'peinture', category_name: 'Peinture', artisan_count: 5, percentage: 17 },
  { category_id: 'maçonnerie', category_name: 'Maçonnerie', artisan_count: 7, percentage: 24 },
  { category_id: 'jardinage', category_name: 'Jardinage', artisan_count: 3, percentage: 10 },
];

const initialRegionStats: RegionStat[] = [
  { region: 'Analamanga', artisan_count: 12, percentage: 40 },
  { region: 'Atsinanana', artisan_count: 7, percentage: 24 },
  { region: 'Fianarantsoa', artisan_count: 5, percentage: 17 },
  { region: 'Vakinankaratra', artisan_count: 4, percentage: 13 },
  { region: 'Boeny', artisan_count: 2, percentage: 6 },
];

export default function AdminDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'analytics' | 'pending' | 'artisans'>('analytics');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [pendingDossiers, setPendingDossiers] = useState<Dossier[]>(initialPendingDossiers);
  const [artisans, setArtisans] = useState<Artisan[]>(initialArtisans);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>(initialCategoryStats);
  const [regionStats, setRegionStats] = useState<RegionStat[]>(initialRegionStats);
  const [totalArtisansEver, setTotalArtisansEver] = useState(initialArtisans.length + 3);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const categoryNameFor = useCallback(
    (categoryId: string) => categories.find((c) => c.id === categoryId)?.name ?? '—',
    [categories]
  );

  const loadData = useCallback(() => {
    setLoading(true);
    setCategories(initialCategories);
    setPendingDossiers(initialPendingDossiers);
    setArtisans(initialArtisans);
    setCategoryStats(initialCategoryStats);
    setRegionStats(initialRegionStats);
    setTotalArtisansEver(initialArtisans.length + 3);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => loadData(), 250);
    return () => clearTimeout(timer);
  }, [loadData]);

  const monthlyRegistrations = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of artisans) {
      const d = new Date(a.created_at);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([key, count]) => {
        const [, month] = key.split('-');
        return { month: MONTH_LABELS[Number(month)], count };
      });
  }, [artisans]);

  const maxRegCount = Math.max(1, ...monthlyRegistrations.map((d) => d.count));

  const handleValidateDossier = (dossier: Dossier) => {
    const newArtisan: Artisan = {
      id: `local-${dossier.id}`,
      name: dossier.name,
      city: dossier.city,
      region: dossier.region,
      phone: dossier.phone,
      email: dossier.email,
      status: 'Vérifié',
      category_id: dossier.category_id,
      created_at: new Date().toISOString(),
    };

    setArtisans((prev) => [newArtisan, ...prev]);
    setPendingDossiers((prev) => prev.filter((d) => d.id !== dossier.id));
    setTotalArtisansEver((prev) => prev + 1);
    showNotification(`Le dossier de ${dossier.name} a été validé avec succès.`);
  };

  const handleRejectDossier = (dossier: Dossier) => {
    setPendingDossiers((prev) => prev.filter((d) => d.id !== dossier.id));
    showNotification(`Le dossier de ${dossier.name} a été rejeté.`);
  };

  const handleToggleStatus = (artisan: Artisan) => {
    const newStatus = artisan.status === 'Vérifié' ? 'En attente' : 'Vérifié';
    setArtisans((prev) => prev.map((a) => (a.id === artisan.id ? { ...a, status: newStatus } : a)));
    showNotification(`Le statut de ${artisan.name} est maintenant : ${newStatus}`);
  };

  const handleDeleteArtisan = (artisan: Artisan) => {
    setArtisans((prev) => prev.filter((a) => a.id !== artisan.id));
    showNotification(`L'artisan ${artisan.name} a été supprimé.`);
  };

  const filteredArtisans = artisans.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoryNameFor(a.category_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verifiedCount = artisans.filter((a) => a.status === 'Vérifié').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <Activity className="animate-pulse" size={20} />
        <span className="ml-2 text-sm font-bold">Chargement du tableau de bord...</span>
      </div>
    );
  }

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
          <button
            onClick={() => {
              localStorage.removeItem('artisansmada-user');
              router.push('/login');
              router.refresh();
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-950/40 border border-red-900/30 transition"
          >
            <LogOut size={14} /> Déconnexion
          </button>
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
                <p className="text-3xl font-black text-white tracking-tight">{totalArtisansEver}</p>
                <p className="text-xs text-purple-400 font-medium flex items-center gap-1">
                  <TrendingUp size={12} /> Toutes périodes confondues
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
                      Nombre d&apos;artisans enregistrés sur ArtisansMada, par mois de création.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-purple-950/60 border-purple-800 text-purple-300 text-xs font-semibold">
                    Madagascar
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {monthlyRegistrations.length === 0 ? (
                  <p className="text-center text-slate-500 text-sm py-10">Aucune donnée d&apos;inscription pour le moment.</p>
                ) : (
                  <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2 border-b border-slate-800">
                    {monthlyRegistrations.map((item, idx) => {
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
                )}
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
                    Proportion des artisans certifiés selon leur secteur d&apos;activité.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryStats.length === 0 ? (
                    <p className="text-center text-slate-500 text-sm py-6">Aucun artisan certifié pour le moment.</p>
                  ) : (
                    categoryStats.map((cat, idx) => (
                      <div key={cat.category_id} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-200 flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${CHART_COLORS[idx % CHART_COLORS.length]}`}></span>
                            {cat.category_name}
                          </span>
                          <span className="text-slate-400 font-mono">
                            {cat.artisan_count} artisans ({cat.percentage ?? 0}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                          <div
                            style={{ width: `${cat.percentage ?? 0}%` }}
                            className={`h-full rounded-full ${CHART_COLORS[idx % CHART_COLORS.length]} transition-all duration-500`}
                          />
                        </div>
                      </div>
                    ))
                  )}
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
                  {regionStats.length === 0 ? (
                    <p className="text-center text-slate-500 text-sm py-6">Aucun artisan certifié pour le moment.</p>
                  ) : (
                    regionStats.map((reg, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-200">{reg.region}</span>
                          <span className="text-emerald-400 font-mono">
                            {reg.artisan_count} ({reg.percentage ?? 0}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                          <div
                            style={{ width: `${reg.percentage ?? 0}%` }}
                            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                          />
                        </div>
                      </div>
                    ))
                  )}
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
                  Examinez et validez les nouvelles demandes d&apos;inscription professionnelle des artisans.
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
                              {categoryNameFor(dossier.category_id)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium">
                            📍 {dossier.city} ({dossier.region}) • 📞 {dossier.phone} • ✉️ {dossier.email}
                          </p>
                          <span className="text-[11px] text-slate-500 block font-mono">
                            Dossier soumis le : {new Date(dossier.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <Button
                            onClick={() => handleValidateDossier(dossier)}
                            className="flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-9 rounded-xl gap-1.5 shadow-md"
                          >
                            <CheckCircle2 size={16} /> Valider
                          </Button>
                          <Button
                            onClick={() => handleRejectDossier(dossier)}
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
                            <span className="text-[11px] text-slate-500 font-mono">{artisan.id.slice(0, 8)}</span>
                          </td>
                          <td className="p-3 font-medium text-slate-300">{categoryNameFor(artisan.category_id)}</td>
                          <td className="p-3 text-xs text-slate-400">{artisan.city}</td>
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
                                onClick={() => handleToggleStatus(artisan)}
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
                                onClick={() => handleDeleteArtisan(artisan)}
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
