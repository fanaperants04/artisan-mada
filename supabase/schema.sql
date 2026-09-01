-- =======================================================
-- SCHEMA SQL POUR ARTISANSMADA ON SUPABASE
-- À exécuter dans le SQL Editor de Supabase (https://supabase.com)
-- =======================================================

-- 1. Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE ARTISANS
CREATE TABLE IF NOT EXISTS public.artisans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    image TEXT,
    rating NUMERIC(2, 1) DEFAULT 4.5,
    bio TEXT,
    status TEXT NOT NULL DEFAULT 'Vérifié' CHECK (status IN ('Vérifié', 'En attente', 'Suspendu')),
    is_available BOOLEAN DEFAULT TRUE
);

-- 3. TABLE DOSSIERS EN ATTENTE
CREATE TABLE IF NOT EXISTS public.pending_dossiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'En attente' CHECK (status IN ('En attente', 'Validé', 'Refusé'))
);

-- 4. TABLE UTILISATEURS / PROFILS
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'artisan' CHECK (role IN ('artisan', 'admin')),
    phone TEXT
);

-- 5. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Polices de lecture publique pour les artisans
CREATE POLICY "Lecture publique des artisans" ON public.artisans
    FOR SELECT USING (true);

-- Polices pour dossiers en attente (admin seulement ou insertion publique pour inscription)
CREATE POLICY "Insertion publique des dossiers" ON public.pending_dossiers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Lecture des dossiers par tout le monde" ON public.pending_dossiers
    FOR SELECT USING (true);

CREATE POLICY "Modification des dossiers par admin" ON public.pending_dossiers
    FOR ALL USING (true);

-- 6. DONNÉES INITIALES (SEED DATA)
INSERT INTO public.artisans (name, category, location, phone, email, rating, status, is_available)
VALUES
    ('Jean Carpentier', 'Menuiserie', 'Antananarivo, Ankorondrano', '+261341234567', 'artisan@mada.mg', 4.8, 'Vérifié', true),
    ('Marie Électricienne', 'Électricité', 'Antananarivo, Analakely', '+261321234567', 'marie.elec@mada.mg', 4.9, 'Vérifié', true),
    ('Ahmed Plombier', 'Plomberie', 'Antananarivo, Isoraka', '+261301234567', 'ahmed.plombier@mada.mg', 4.5, 'Vérifié', true),
    ('Luc BTP', 'Maçonnerie', 'Tamatave', '+261349988877', 'luc.btp@gmail.com', 4.2, 'En attente', false)
ON CONFLICT DO NOTHING;

INSERT INTO public.pending_dossiers (name, category, location, phone, email)
VALUES
    ('Ravao Ébéniste', 'Menuiserie', 'Antananarivo, Ankorondrano', '+261345566677', 'ravao.ebeniste@gmail.com'),
    ('Bako Peinture', 'Peinture & Décoration', 'Majunga', '+261328899900', 'bako.peinture@mada.mg'),
    ('Tojo Plomberie', 'Plomberie & Sanitaire', 'Antsirabe', '+261331122233', 'tojo.plomberie@gmail.com')
ON CONFLICT DO NOTHING;
