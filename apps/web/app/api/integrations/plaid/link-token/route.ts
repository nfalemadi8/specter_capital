import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const clientId = process.env.PLAID_CLIENT_ID;
  const secret = process.env.PLAID_SECRET;
  const plaidEnv = process.env.PLAID_ENV ?? 'sandbox';

  if (!clientId || !secret) {
    return NextResponse.json({ error: 'Plaid not configured' }, { status: 503 });
  }

  const baseUrl =
    plaidEnv === 'production'
      ? 'https://production.plaid.com'
      : plaidEnv === 'development'
        ? 'https://development.plaid.com'
        : 'https://sandbox.plaid.com';

  try {
    const response = await fetch(`${baseUrl}/link/token/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        secret,
        client_name: 'Specter Family Office',
        user: { client_user_id: user.id },
        products: ['transactions', 'investments'],
        country_codes: ['US'],
        language: 'en',
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.error_message ?? 'Plaid error' }, { status: 400 });
    }

    return NextResponse.json({ link_token: data.link_token });
  } catch (error) {
    console.error('Plaid link token error:', error);
    return NextResponse.json({ error: 'Failed to create link token' }, { status: 500 });
  }
}
