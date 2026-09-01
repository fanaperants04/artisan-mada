'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { getRedirectPath } from '@/lib/auth';
import { createClient } from '@/lib/supabase/client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (mounted) setCurrentUser(null);
        return;
      }

      const { data: profile } = await supabase
        .from('users')
        .select('id, email, name, role, phone')
        .eq('id', user.id)
        .single();

      if (mounted) setCurrentUser(profile as User | null);
    };

    loadUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setCurrentUser(null);
    router.push('/');
    router.refresh();
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'artisan':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-black text-blue-600 tracking-tight">
          <span className="bg-blue-600 text-white rounded-lg px-2 py-0.5 text-base sm:text-lg">AM</span>
          <span>ArtisansMada</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center font-medium text-sm">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Accueil
          </Link>
          <Link href="/#categories" className="text-gray-700 hover:text-blue-600 transition-colors">
            Catégories
          </Link>
          <Link href="/#artisans" className="text-gray-700 hover:text-blue-600 transition-colors">
            Artisans à la une
          </Link>

          {currentUser ? (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <Link
                href={getRedirectPath(currentUser.role)}
                className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition"
              >
                <UserIcon size={16} className="text-blue-600 shrink-0" />
                <span className="truncate max-w-[120px]">{currentUser.name}</span>
                <Badge variant={getRoleVariant(currentUser.role)} className="capitalize text-[10px] px-2 py-0">
                  {currentUser.role}
                </Badge>
              </Link>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleLogout}
                title="Déconnexion"
                className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
              </Button>
            </div>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants(),
                'bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm'
              )}
            >
              Connexion
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Menu principal"
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b p-4 sm:p-6 flex flex-col gap-4 font-medium text-sm animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <Link href="/" className="text-gray-800 hover:text-blue-600 py-1 text-base font-semibold" onClick={() => setIsOpen(false)}>
            Accueil
          </Link>
          <Link href="/#categories" className="text-gray-800 hover:text-blue-600 py-1 text-base font-semibold" onClick={() => setIsOpen(false)}>
            Catégories
          </Link>

          {currentUser ? (
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserIcon size={18} className="text-blue-600" />
                  <span className="font-bold text-gray-900 text-base">{currentUser.name}</span>
                </div>
                <Badge variant={getRoleVariant(currentUser.role)} className="capitalize text-xs">
                  {currentUser.role}
                </Badge>
              </div>
              <Link
                href={getRedirectPath(currentUser.role)}
                className="w-full text-center bg-blue-50 text-blue-700 font-semibold py-2.5 rounded-xl text-sm"
                onClick={() => setIsOpen(false)}
              >
                Accéder à mon espace
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-center text-red-600 font-semibold py-2 text-sm flex items-center justify-center gap-1.5"
              >
                <LogOut size={16} /> Déconnexion
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className={cn(
                buttonVariants(),
                'w-full bg-blue-600 text-white font-semibold py-3 rounded-xl justify-center text-base mt-1'
              )}
            >
              Connexion
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
