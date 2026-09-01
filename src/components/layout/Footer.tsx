'use client';

import Link from 'next/link';
import { Globe, Mail, Send, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 md:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 text-xl font-black text-white tracking-tight">
              <span className="bg-blue-600 text-white rounded-lg px-2 py-0.5 text-base">AM</span>
              ArtisansMada
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Plateforme n°1 de mise en relation avec des artisans et professionnels qualifiés à Madagascar.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link href="/#artisans" className="hover:text-white transition-colors">
                  Artisans recommandés
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Espace Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Assistance & Aide</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Foire Aux Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Comment ça marche ?
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Support & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Suivez-nous</h4>
            <p className="text-xs text-gray-400 mb-4">
              Restez informé de nos actualités et nouveaux artisans partenaires.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-blue-600 hover:text-white text-gray-400 flex items-center justify-center transition-colors"
                aria-label="Site Web"
              >
                <Globe size={18} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-blue-600 hover:text-white text-gray-400 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-blue-600 hover:text-white text-gray-400 flex items-center justify-center transition-colors"
                aria-label="Télégramme"
              >
                <Send size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; 2026 ArtisansMada. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Conçu avec <Heart size={14} className="text-red-500 fill-red-500" /> pour Madagascar
          </p>
        </div>
      </div>
    </footer>
  );
}