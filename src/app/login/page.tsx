import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte ArtisansMada',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,_#eff6ff_0%,_#f8fafc_35%,_#f1f5f9_100%)] text-slate-900">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-5xl">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}