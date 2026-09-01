import { UserRole } from '@/types/user';

export function getRedirectPath(role: UserRole): string {
  switch (role) {
    case 'artisan':
      return '/dashboard/artisan';
    case 'admin':
      return '/dashboard/admin';
    default:
      return '/';
  }
}
