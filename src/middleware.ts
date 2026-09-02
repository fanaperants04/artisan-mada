import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_ROLES: Record<string, 'admin' | 'artisan'> = {
  '/dashboard/admin': 'admin',
  '/dashboard/artisan': 'artisan',
};

export async function middleware(request: NextRequest) {
  const matchedPrefix = Object.keys(PROTECTED_ROLES).find((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (!matchedPrefix) {
    return NextResponse.next();
  }

  const cookieRole = request.cookies.get('session-role')?.value as 'admin' | 'artisan' | undefined;
  const requiredRole = PROTECTED_ROLES[matchedPrefix];

  if (!cookieRole) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (cookieRole !== requiredRole) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
