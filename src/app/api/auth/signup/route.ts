import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { users } from '@/db/schema';
import { getRedirectPath } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, phone, type, name } = body;

    if (!email || !password || !type) {
      return NextResponse.json(
        { success: false, error: 'Email, mot de passe et type requis.' },
        { status: 400 }
      );
    }

    const normalizedType = type === 'admin' ? 'admin' : type === 'artisan' ? 'artisan' : 'client';
    const normalizedEmail = String(email).trim().toLowerCase();
    const profileName = String(name || normalizedEmail.split('@')[0]).trim() || 'Utilisateur';

    const existingUsers = await db.select().from(users);
    const existingUser = existingUsers.find((user) => user.email.toLowerCase() === normalizedEmail);

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Un compte avec cet email existe déjà.' },
        { status: 409 }
      );
    }

    const [createdUser] = await db
      .insert(users)
      .values({
        email: normalizedEmail,
        password: String(password),
        phone: phone ? String(phone) : null,
        type: normalizedType,
      })
      .returning();

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: createdUser.uid,
          email: createdUser.email,
          name: profileName,
          role: normalizedType,
          phone: createdUser.phone ?? null,
        },
        redirectTo: getRedirectPath(normalizedType),
      },
      { status: 201 }
    );

    response.cookies.set('session-role', normalizedType, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inscription.',
      },
      { status: 500 }
    );
  }
}