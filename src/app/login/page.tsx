import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte ArtisansMada',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 md:py-12">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
