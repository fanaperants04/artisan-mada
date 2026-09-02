export type UserType = 'client' | 'artisan';
export type PhotoType = 'profil' | 'service' | 'work_sample';

// Users
export interface User {
  uid: string;
  email: string;
  password: string;
  phone?: string;
  type: UserType;
  created_at: Date;
}

// Craftspeople
export interface Craftsperson {
  id_craft: string;
  uid: string; // FK → Users
  nom_business: string;
  description?: string;
  category: string;
  experience_years?: number;
  location: string;
  created_at: Date;
}

// Services
export interface Service {
  id_serv: string;
  id_craft: string; // FK → Craftspeople
  nom: string;
  description?: string;
  prix: number;
  duree_estimee?: number;
  created_at: Date;
}

// Reviews
export interface Review {
  id_review: string;
  uid: string; // FK → Users
  id_craft: string; // FK → Craftspeople
  note: number; // 1-5
  date: Date;
}

// Photos
export interface Photo {
  id_photo: string;
  id_craft?: string; // FK → Craftspeople
  id_serv?: string; // FK → Services
  url: string;
  type: PhotoType;
  created_at: Date;
}

// View types (joined data)
export interface CraftspersonWithPhotos extends Craftsperson {
  photos: Photo[];
}

export interface ServiceWithPhotos extends Service {
  photos: Photo[];
}

export interface CraftspersonProfile extends Craftsperson {
  services: Service[];
  photos: Photo[];
  reviews: Review[];
  average_rating: number;
}