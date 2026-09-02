import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { users } from '@/db/schema';
import { getRedirectPath } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email et mot de passe requis.' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const userRow = (
      await db.select().from(users).where(eq(users.email, normalizedEmail)).limit(1)
    )[0];

    if (!userRow) {
      return NextResponse.json(
        { success: false, error: 'Identifiants incorrects.' },
        { status: 401 }
      );
    }

    const isValidPassword = String(userRow.password) === String(password);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Identifiants incorrects.' },
        { status: 401 }
      );
    }

    const userType = (userRow.type as 'client' | 'artisan' | 'admin') || 'client';
    const redirectTo = getRedirectPath(userType);

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: userRow.uid,
          email: userRow.email,
          name: userRow.email.split('@')[0],
          role: userType,
          phone: userRow.phone ?? null,
        },
        redirectTo,
      },
      { status: 200 }
    );

    response.cookies.set('session-role', userType, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}