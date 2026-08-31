'use client';

import Link from 'next/link';
import { Globe, Mail, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Logo */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">ArtisansMada</h3>
            <p className="text-sm">Trouvez les meilleurs artisans à Madagascar</p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Accueil</Link></li>
              <li><Link href="#" className="hover:text-white transition">Catégories</Link></li>
              <li><Link href="#" className="hover:text-white transition">À propos</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Aide</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition">Support</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Réseaux</h4>
            <div className="flex gap-3">
              <Link href="#" className="hover:text-white transition" aria-label="Facebook"><Globe size={20} /></Link>
              <Link href="#" className="hover:text-white transition" aria-label="Instagram"><Mail size={20} /></Link>
              <Link href="#" className="hover:text-white transition" aria-label="Twitter"><Send size={20} /></Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; 2026 ArtisansMada. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}