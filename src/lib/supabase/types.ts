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
      categories: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          slug: string;
          icon: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          slug: string;
          icon: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          slug?: string;
          icon?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          email: string;
          name: string;
          role: 'client' | 'artisan' | 'admin';
          phone: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          email: string;
          name: string;
          role?: 'client' | 'artisan' | 'admin';
          phone?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          email?: string;
          name?: string;
          role?: 'client' | 'artisan' | 'admin';
          phone?: string | null;
        };
        Relationships: [];
      };
      artisans: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string | null;
          category_id: string;
          name: string;
          city: string;
          region: string;
          phone: string | null;
          email: string | null;
          image: string | null;
          bio: string | null;
          status: 'Vérifié' | 'En attente' | 'Suspendu';
          is_available: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
          category_id: string;
          name: string;
          city: string;
          region: string;
          phone?: string | null;
          email?: string | null;
          image?: string | null;
          bio?: string | null;
          status?: 'Vérifié' | 'En attente' | 'Suspendu';
          is_available?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
          category_id?: string;
          name?: string;
          city?: string;
          region?: string;
          phone?: string | null;
          email?: string | null;
          image?: string | null;
          bio?: string | null;
          status?: 'Vérifié' | 'En attente' | 'Suspendu';
          is_available?: boolean;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          created_at: string;
          artisan_id: string;
          client_id: string | null;
          rating: number;
          recommended: boolean;
          punctual: boolean;
          comment: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          artisan_id: string;
          client_id?: string | null;
          rating: number;
          recommended?: boolean;
          punctual?: boolean;
          comment?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          artisan_id?: string;
          client_id?: string | null;
          rating?: number;
          recommended?: boolean;
          punctual?: boolean;
          comment?: string | null;
        };
        Relationships: [];
      };
      pending_dossiers: {
        Row: {
          id: string;
          created_at: string;
          category_id: string;
          name: string;
          city: string;
          region: string;
          phone: string;
          email: string;
          status: 'En attente' | 'Validé' | 'Refusé';
          reviewed_by: string | null;
          reviewed_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          category_id: string;
          name: string;
          city: string;
          region: string;
          phone: string;
          email: string;
          status?: 'En attente' | 'Validé' | 'Refusé';
          reviewed_by?: string | null;
          reviewed_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          category_id?: string;
          name?: string;
          city?: string;
          region?: string;
          phone?: string;
          email?: string;
          status?: 'En attente' | 'Validé' | 'Refusé';
          reviewed_by?: string | null;
          reviewed_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      category_stats: {
        Row: {
          category_id: string;
          category_name: string;
          artisan_count: number;
          percentage: number | null;
        };
        Relationships: [];
      };
      region_stats: {
        Row: {
          region: string;
          artisan_count: number;
          percentage: number | null;
        };
        Relationships: [];
      };
      artisan_reputation: {
        Row: {
          artisan_id: string;
          avg_rating: number;
          recommendation_rate: number;
          punctuality_rate: number;
          review_count: number;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
