-- =======================================================
-- SCHEMA SQL POUR ARTISANSMADA ON SUPABASE
-- À exécuter dans le SQL Editor de Supabase (https://supabase.com)
-- =======================================================

-- 0. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- recherche rapide (ILIKE) pour l'annuaire admin

-- =======================================================
-- 1. TABLE CATEGORIES
-- Liste fixe affichée sur la page d'accueil (Categories.tsx) et utilisée
-- pour la répartition par métier du dashboard admin.
-- =======================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT NOT NULL -- nom d'icône lucide-react (ex: 'Hammer')
);

-- =======================================================
-- 2. TABLE UTILISATEURS / PROFILS
-- role inclut désormais 'client' (voir src/types/user.ts)
-- =======================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'artisan', 'admin')),
    phone TEXT
);

-- =======================================================
-- 3. TABLE ARTISANS
-- Liée à users (profil édité depuis /dashboard/artisan) et à categories.
-- Ville/région séparées pour permettre la répartition régionale (admin).
-- =======================================================
CREATE TABLE IF NOT EXISTS public.artisans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE SET NULL,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    image TEXT,
    bio TEXT,
    status TEXT NOT NULL DEFAULT 'Vérifié' CHECK (status IN ('Vérifié', 'En attente', 'Suspendu')),
    is_available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_artisans_category ON public.artisans (category_id);
CREATE INDEX IF NOT EXISTS idx_artisans_region ON public.artisans (region);
CREATE INDEX IF NOT EXISTS idx_artisans_status ON public.artisans (status);
CREATE INDEX IF NOT EXISTS idx_artisans_name_trgm ON public.artisans USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_artisans_city_trgm ON public.artisans USING gin (city gin_trgm_ops);

-- =======================================================
-- 4. TABLE AVIS (REVIEWS)
-- Alimente l'onglet "Note de Réputation" du dashboard artisan
-- (note moyenne, % recommandation, % ponctualité) au lieu de valeurs figées.
-- =======================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    artisan_id UUID NOT NULL REFERENCES public.artisans(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    recommended BOOLEAN NOT NULL DEFAULT TRUE,
    punctual BOOLEAN NOT NULL DEFAULT TRUE,
    comment TEXT
);

CREATE INDEX IF NOT EXISTS idx_reviews_artisan ON public.reviews (artisan_id);

-- =======================================================
-- 5. TABLE DOSSIERS EN ATTENTE
-- =======================================================
CREATE TABLE IF NOT EXISTS public.pending_dossiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'En attente' CHECK (status IN ('En attente', 'Validé', 'Refusé')),
    reviewed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_pending_dossiers_status ON public.pending_dossiers (status);

-- =======================================================
-- 6. VUES POUR LES GRAPHIQUES ADMIN
-- Remplacent les données codées en dur (CATEGORY_BREAKDOWN, REGIONAL_BREAKDOWN)
-- =======================================================
CREATE OR REPLACE VIEW public.category_stats AS
SELECT
    c.id AS category_id,
    c.name AS category_name,
    COUNT(a.id) AS artisan_count,
    ROUND(100.0 * COUNT(a.id) / NULLIF(SUM(COUNT(a.id)) OVER (), 0), 1) AS percentage
FROM public.categories c
LEFT JOIN public.artisans a ON a.category_id = c.id AND a.status = 'Vérifié'
GROUP BY c.id, c.name;

CREATE OR REPLACE VIEW public.region_stats AS
SELECT
    a.region,
    COUNT(*) AS artisan_count,
    ROUND(100.0 * COUNT(*) / NULLIF(SUM(COUNT(*)) OVER (), 0), 1) AS percentage
FROM public.artisans a
WHERE a.status = 'Vérifié'
GROUP BY a.region;

CREATE OR REPLACE VIEW public.artisan_reputation AS
SELECT
    a.id AS artisan_id,
    COALESCE(ROUND(AVG(r.rating)::numeric, 1), 4.5) AS avg_rating,
    COALESCE(ROUND(100.0 * AVG(r.recommended::int), 0), 0) AS recommendation_rate,
    COALESCE(ROUND(100.0 * AVG(r.punctual::int), 0), 0) AS punctuality_rate,
    COUNT(r.id) AS review_count
FROM public.artisans a
LEFT JOIN public.reviews r ON r.artisan_id = a.id
GROUP BY a.id;

-- =======================================================
-- 7. TRIGGER updated_at
-- =======================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_artisans_updated_at ON public.artisans;
CREATE TRIGGER trg_artisans_updated_at BEFORE UPDATE ON public.artisans
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =======================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- =======================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Fonction utilitaire : l'utilisateur connecté est-il admin ?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Categories : lecture publique, écriture admin uniquement
CREATE POLICY "Lecture publique des categories" ON public.categories
    FOR SELECT USING (true);
CREATE POLICY "Ecriture des categories par admin" ON public.categories
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Artisans : lecture publique ; modification par le propriétaire ou l'admin
CREATE POLICY "Lecture publique des artisans" ON public.artisans
    FOR SELECT USING (true);
CREATE POLICY "Modification par le proprietaire ou admin" ON public.artisans
    FOR UPDATE USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Creation et suppression par admin" ON public.artisans
    FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Suppression par admin" ON public.artisans
    FOR DELETE USING (public.is_admin());

-- Reviews : lecture publique, création par client authentifié, immuable sinon admin
CREATE POLICY "Lecture publique des avis" ON public.reviews
    FOR SELECT USING (true);
CREATE POLICY "Creation d'avis par utilisateur connecte" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Suppression des avis par admin" ON public.reviews
    FOR DELETE USING (public.is_admin());

-- Dossiers en attente : inscription publique, gestion admin
CREATE POLICY "Insertion publique des dossiers" ON public.pending_dossiers
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Lecture des dossiers par admin" ON public.pending_dossiers
    FOR SELECT USING (public.is_admin());
CREATE POLICY "Modification des dossiers par admin" ON public.pending_dossiers
    FOR UPDATE USING (public.is_admin());
CREATE POLICY "Suppression des dossiers par admin" ON public.pending_dossiers
    FOR DELETE USING (public.is_admin());

-- Users : chacun voit/modifie son propre profil, l'admin voit tout
CREATE POLICY "Lecture de son propre profil" ON public.users
    FOR SELECT USING (id = auth.uid() OR public.is_admin());
CREATE POLICY "Modification de son propre profil" ON public.users
    FOR UPDATE USING (id = auth.uid() OR public.is_admin());
CREATE POLICY "Creation de son propre profil" ON public.users
    FOR INSERT WITH CHECK (id = auth.uid());

-- =======================================================
-- 9. DONNÉES INITIALES (SEED DATA)
-- =======================================================
INSERT INTO public.categories (name, slug, icon) VALUES
    ('Menuiserie', 'menuiserie', 'Hammer'),
    ('Électricité', 'electricite', 'Zap'),
    ('Plomberie', 'plomberie', 'Wrench'),
    ('Maçonnerie', 'maconnerie', 'Building2'),
    ('Peinture', 'peinture', 'Paintbrush'),
    ('Rénovation', 'renovation', 'Home')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.artisans (name, category_id, city, region, phone, email, status, is_available)
SELECT v.name, c.id, v.city, v.region, v.phone, v.email, v.status, v.is_available
FROM (VALUES
    ('Jean Carpentier', 'Menuiserie', 'Antananarivo, Ankorondrano', 'Analamanga', '+261341234567', 'artisan@mada.mg', 'Vérifié', true),
    ('Marie Électricienne', 'Électricité', 'Antananarivo, Analakely', 'Analamanga', '+261321234567', 'marie.elec@mada.mg', 'Vérifié', true),
    ('Ahmed Plombier', 'Plomberie', 'Antananarivo, Isoraka', 'Analamanga', '+261301234567', 'ahmed.plombier@mada.mg', 'Vérifié', true),
    ('Luc BTP', 'Maçonnerie', 'Tamatave', 'Atsinanana', '+261349988877', 'luc.btp@gmail.com', 'En attente', false)
) AS v(name, category_name, city, region, phone, email, status, is_available)
JOIN public.categories c ON c.name = v.category_name
ON CONFLICT DO NOTHING;

INSERT INTO public.pending_dossiers (name, category_id, city, region, phone, email)
SELECT v.name, c.id, v.city, v.region, v.phone, v.email
FROM (VALUES
    ('Ravao Ébéniste', 'Menuiserie', 'Antananarivo, Ankorondrano', 'Analamanga', '+261345566677', 'ravao.ebeniste@gmail.com'),
    ('Bako Peinture', 'Peinture', 'Majunga', 'Boeny', '+261328899900', 'bako.peinture@mada.mg'),
    ('Tojo Plomberie', 'Plomberie', 'Antsirabe', 'Vakinankaratra', '+261331122233', 'tojo.plomberie@gmail.com')
) AS v(name, category_name, city, region, phone, email)
JOIN public.categories c ON c.name = v.category_name
ON CONFLICT DO NOTHING;

-- Avis d'exemple pour Jean Carpentier (réputation affichée sur son dashboard)
INSERT INTO public.reviews (artisan_id, rating, recommended, punctual)
SELECT a.id, r.rating, r.recommended, r.punctual
FROM public.artisans a
JOIN (VALUES
    (5, true, true), (5, true, true), (5, true, false), (4, true, true), (5, false, true)
) AS r(rating, recommended, punctual) ON true
WHERE a.name = 'Jean Carpentier';
