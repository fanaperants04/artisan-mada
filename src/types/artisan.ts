export interface Artisan {
  id?: string;
  name: string;
  category: string;
  location: string;
  phone?: string | null;
  rating?: number;
  image?: string | null;
}
