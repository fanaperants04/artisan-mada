import { db } from '@/db/client';
import { craftspeople, users } from '@/db/schema';

export async function getAllUsers() {
  return db.select().from(users);
}

export async function getUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  const rows = await getAllUsers();
  return rows.find((user) => user.email.toLowerCase() === normalized) ?? null;
}

export async function getAllCraftspeople() {
  return db.select().from(craftspeople);
}

export async function getCraftspeopleWithFilters(filters: {
  category?: string;
  region?: string;
  city?: string;
  q?: string;
} = {}) {
  const rows = await getAllCraftspeople();

  return rows.filter((craft) => {
    const matchesCategory = !filters.category || craft.category === filters.category;
    const matchesRegion = !filters.region || (craft.location ?? '').toLowerCase().includes(filters.region.toLowerCase());
    const matchesCity = !filters.city || (craft.location ?? '').toLowerCase().includes(filters.city.toLowerCase());
    const matchesQuery = !filters.q || (craft.nom_business ?? '').toLowerCase().includes(filters.q.toLowerCase());
    return matchesCategory && matchesRegion && matchesCity && matchesQuery;
  });
}

export async function getCategories() {
  const rows = await getAllCraftspeople();
  return [...new Set(rows.map((item) => item.category).filter(Boolean))].sort();
}

export async function getRegions() {
  const rows = await getAllCraftspeople();
  return [...new Set(rows.map((item) => item.location).filter(Boolean))].sort();
}
