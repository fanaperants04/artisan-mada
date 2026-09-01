export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      artisans: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          category: string;
          location: string;
          phone: string | null;
          email: string | null;
          image: string | null;
          rating: number | null;
          bio: string | null;
          status: 'Vérifié' | 'En attente' | 'Suspendu';
          is_available: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          category: string;
          location: string;
          phone?: string | null;
          email?: string | null;
          image?: string | null;
          rating?: number | null;
          bio?: string | null;
          status?: 'Vérifié' | 'En attente' | 'Suspendu';
          is_available?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          category?: string;
          location?: string;
          phone?: string | null;
          email?: string | null;
          image?: string | null;
          rating?: number | null;
          bio?: string | null;
          status?: 'Vérifié' | 'En attente' | 'Suspendu';
          is_available?: boolean;
        };
      };
      pending_dossiers: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          category: string;
          location: string;
          phone: string;
          email: string;
          status: 'En attente' | 'Validé' | 'Refusé';
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          category: string;
          location: string;
          phone: string;
          email: string;
          status?: 'En attente' | 'Validé' | 'Refusé';
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          category?: string;
          location?: string;
          phone?: string;
          email?: string;
          status?: 'En attente' | 'Validé' | 'Refusé';
        };
      };
      users: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          name: string;
          role: 'artisan' | 'admin';
          phone: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          email: string;
          name: string;
          role: 'artisan' | 'admin';
          phone?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          name?: string;
          role?: 'artisan' | 'admin';
          phone?: string | null;
        };
      };
    };
  };
}
