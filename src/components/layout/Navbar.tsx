'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ArtisansMada
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="#" className="text-gray-700 hover:text-blue-600">
            Accueil
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600">
            Catégories
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600">
            À propos
          </Link>
          <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded">
            Connexion
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4">
          <Link href="#" className="text-gray-700">Accueil</Link>
          <Link href="#" className="text-gray-700">Catégories</Link>
          <Link href="#" className="text-gray-700">À propos</Link>
          <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded text-center">
            Connexion
          </Link>
        </div>
      )}
    </nav>
  );
}
