import { User, UserRole } from '@/types/user';

export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    email: 'client@mada.mg',
    password: 'password123',
    name: 'Rasoa Noro',
    role: 'client',
    phone: '+261340000001',
  },
  {
    id: '2',
    email: 'artisan@mada.mg',
    password: 'password123',
    name: 'Jean Carpentier',
    role: 'artisan',
    phone: '+261341234567',
  },
  {
    id: '3',
    email: 'admin@mada.mg',
    password: 'password123',
    name: 'Rakoto Admin',
    role: 'admin',
    phone: '+261320000000',
  },
];

export function getRedirectPath(role: UserRole): string {
  switch (role) {
    case 'client':
      return '/dashboard/client';
    case 'artisan':
      return '/dashboard/artisan';
    case 'admin':
      return '/dashboard/admin';
    default:
      return '/';
  }
}

export function authenticateUser(email: string, password: string) {
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, error: 'Identifiants incorrects.' };
  }

  const { password: _, ...userWithoutPassword } = user;
  const redirectUrl = getRedirectPath(user.role);

  return {
    success: true,
    user: userWithoutPassword,
    redirectTo: redirectUrl,
  };
}
