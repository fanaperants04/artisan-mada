'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn, AlertCircle, ArrowRight } from 'lucide-react';

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

      if (!res.ok || !data.success) {
        setError(data.error || 'Erreur lors de la connexion.');
        return;
      }

      const redirectTo = data.redirectTo || '/';
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError('Impossible de joindre le serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border-0 bg-white/80 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.35)] backdrop-blur-xl rounded-[28px] ring-1 ring-slate-200/70 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="h-1.5 w-full bg-[linear-gradient(90deg,#0f172a_0%,#2563eb_50%,#38bdf8_100%)]" />

      <CardHeader className="text-center pb-2 pt-6 sm:pt-8 px-4 sm:px-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25">
          <LogIn className="text-white shrink-0" size={22} />
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-black tracking-[-0.04em] text-slate-900">
          Espace Connexion
        </CardTitle>
        <CardDescription className="mx-auto mt-2 max-w-xs text-xs sm:text-sm text-slate-500">
          Connectez-vous pour accéder à votre tableau de bord dédié.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle size={16} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
              Adresse Email
            </label>
            <Input
              type="email"
              placeholder="ex: jean.artisan@mada.mg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-2xl border-slate-200 bg-slate-50/80 text-sm text-slate-800 shadow-inner shadow-slate-100 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
              Mot de passe
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-2xl border-slate-200 bg-slate-50/80 text-sm text-slate-800 shadow-inner shadow-slate-100 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-12 w-full rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Connexion en cours...' : (
              <span className="flex items-center justify-center gap-2">
                Se connecter <ArrowRight size={16} />
              </span>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-slate-100 bg-slate-50/70 px-4 py-3 text-[11px] font-medium tracking-wide text-slate-400 sm:py-3.5">
        ArtisansMada &copy; 2026 — Connexion sécurisée
      </CardFooter>
    </Card>
  );
}
