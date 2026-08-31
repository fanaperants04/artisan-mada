import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';

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

    const result = authenticateUser(email, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 401 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Une erreur serveur s\'est produite.' },
      { status: 500 }
    );
  }
}
