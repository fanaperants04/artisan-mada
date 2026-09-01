import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
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

    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { success: false, error: 'Identifiants incorrects.' },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, email, name, role, phone')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { success: false, error: "Profil introuvable pour ce compte." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: profile,
        redirectTo: getRedirectPath(profile.role),
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Une erreur serveur s\'est produite.' },
      { status: 500 }
    );
  }
}
