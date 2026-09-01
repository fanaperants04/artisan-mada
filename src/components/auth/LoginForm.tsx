'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LogIn, UserCheck, Wrench, Shield, AlertCircle, ArrowRight } from 'lucide-react';
import { MOCK_USERS } from '@/lib/auth';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Erreur lors de la connexion.');
        setIsLoading(false);
        return;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      router.push(data.redirectTo);
    } catch {
      setError('Impossible de joindre le serveur.');
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (role: 'client' | 'artisan' | 'admin') => {
    const targetUser = MOCK_USERS.find((u) => u.role === role);
    if (targetUser) {
      setEmail(targetUser.email);
      setPassword(targetUser.password);
      setError('');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-gray-100/80 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <CardHeader className="text-center pb-2 pt-6 sm:pt-8 px-4 sm:px-6">
        <div className="mx-auto w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3 shadow-xs">
          <LogIn className="text-blue-600 shrink-0" size={22} />
        </div>
        <CardTitle className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Espace Connexion
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto mt-1">
          Connectez-vous pour accéder à votre tableau de bord dédié (Artisan ou Admin)
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 text-xs text-red-700 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Adresse Email
            </label>
            <Input
              type="email"
              placeholder="ex: jean.artisan@mada.mg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-xl text-sm border-gray-200 bg-gray-50/50 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Mot de passe
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 rounded-xl text-sm border-gray-200 bg-gray-50/50 focus:bg-white transition-all"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all gap-2 mt-2"
          >
            {isLoading ? 'Connexion en cours...' : (
              <>
                Se connecter <ArrowRight size={16} />
              </>
            )}
          </Button>
        </form>

        {/* Test Rapide */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Comptes de démo
            </span>
            <Badge variant="outline" className="text-[10px] text-gray-500 font-normal">
              1 clic pour remplir
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('artisan')}
              className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all text-gray-700 font-medium group"
            >
              <Wrench size={18} className="text-amber-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] sm:text-xs font-bold text-gray-900">Artisan</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all text-gray-700 font-medium group"
            >
              <Shield size={18} className="text-purple-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] sm:text-xs font-bold text-gray-900">Admin</span>
            </button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-center bg-gray-50/80 border-t border-gray-100 py-3 sm:py-3.5 text-xs text-gray-400 font-medium">
        ArtisansMada &copy; 2026 - Connexion Sécurisée
      </CardFooter>
    </Card>
  );
}
