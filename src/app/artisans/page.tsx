import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ArtisanCard from '@/components/artisan/ArtisanCard';
import { Sparkles, Search } from 'lucide-react';

const artisanSeed = [
  { id: 'a1', name: 'Rakoto Electric', category: 'Électricité', location: 'Antananarivo', phone: '+261 34 12 345 67', rating: 4.9 },
  { id: 'a2', name: 'Mina Carrelage', category: 'Maçonnerie', location: 'Toamasina', phone: '+261 32 98 765 43', rating: 4.8 },
  { id: 'a3', name: 'Noro Plomberie', category: 'Plomberie', location: 'Fianarantsoa', phone: '+261 33 45 678 91', rating: 5.0 },
  { id: 'a4', name: 'Lova Peinture', category: 'Peinture', location: 'Antsirabe', phone: '+261 34 67 890 12', rating: 4.7 },
  { id: 'a5', name: 'Tiana Jardin', category: 'Jardinage', location: 'Mahajanga', phone: '+261 32 76 543 21', rating: 4.6 },
  { id: 'a6', name: 'Andry Menuiserie', category: 'Menuiserie', location: 'Antananarivo', phone: '+261 34 12 777 21', rating: 4.8 },
];

export default async function ArtisansPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};

  const selectedCategory = typeof params.category === 'string' ? params.category : '';
  const selectedRegion = typeof params.region === 'string' ? params.region : '';
  const selectedStatus = typeof params.status === 'string' ? params.status : '';
  const selectedCity = typeof params.city === 'string' ? params.city : '';
  const search = typeof params.q === 'string' ? params.q : '';

  const artisans = artisanSeed.map((artisan) => ({
    ...artisan,
    image: undefined,
  }));

  const categories = [...new Set(artisans.map((artisan) => artisan.category).filter(Boolean))].sort();
  const regions = [...new Set(artisans.map((artisan) => artisan.location).filter(Boolean))].sort();

  const filteredArtisans = artisans.filter((artisan) => {
    const matchesCategory = selectedCategory ? artisan.category === selectedCategory : true;
    const matchesRegion = selectedRegion ? artisan.location === selectedRegion : true;
    const matchesCity = selectedCity ? artisan.location.toLowerCase().includes(selectedCity.toLowerCase()) : true;
    const matchesSearch = search ? artisan.name.toLowerCase().includes(search.toLowerCase()) : true;
    const matchesStatus = selectedStatus && selectedStatus !== 'Tous' ? artisan.rating >= 4.5 : true;
    return matchesCategory && matchesRegion && matchesCity && matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              <Sparkles size={14} className="text-amber-500" />
              Tous nos artisans
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              Trouvez le bon professionnel pour votre projet
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
              Toutes les fiches artisans de la base de données, filtrables selon les colonnes du tableau craftspeople.
            </p>
          </div>

          <form method="GET" action="/artisans" className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Recherche
                </label>
                <div className="relative">
                  <Search size={16} className="pointer-events-none absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="q"
                    defaultValue={search}
                    placeholder="Nom de l'artisan"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Catégorie
                </label>
                <select
                  name="category"
                  defaultValue={selectedCategory}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Toutes</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Région
                </label>
                <select
                  name="region"
                  defaultValue={selectedRegion}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Toutes</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Statut
                </label>
                <select
                  name="status"
                  defaultValue={selectedStatus}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Tous</option>
                  <option value="Vérifié">Vérifié</option>
                  <option value="En attente">En attente</option>
                  <option value="Suspendu">Suspendu</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:max-w-xs">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Ville
                </label>
                <input
                  type="text"
                  name="city"
                  defaultValue={selectedCity}
                  placeholder="Antananarivo..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="h-11 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Filtrer
                </button>
                <a
                  href="/artisans"
                  className="flex h-11 items-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Réinitialiser
                </a>
              </div>
            </div>
          </form>

          <div className="mb-4 text-sm text-gray-600">
            {filteredArtisans.length} artisan(s) trouvé(s)
          </div>

          {filteredArtisans.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
              Aucun artisan ne correspond à ces filtres.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredArtisans.map((artisan) => (
                <ArtisanCard
                  key={artisan.id}
                  artisan={artisan}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
