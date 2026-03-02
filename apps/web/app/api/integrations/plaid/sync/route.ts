import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { connectionId } = await request.json();
  if (!connectionId) {
    return NextResponse.json({ error: 'Missing connectionId' }, { status: 400 });
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
    const { data: connection } = await supabase
      .from('integration_connections')
      .select('*')
      .eq('id', connectionId)
      .single();

    if (!connection) {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 });
    }

    const credentials = connection.credentials_encrypted as { access_token: string };

    // Fetch accounts
    const accountsRes = await fetch(`${baseUrl}/accounts/get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        secret,
        access_token: credentials.access_token,
      }),
    });

    const accountsData = await accountsRes.json();

    // Fetch investment holdings
    const holdingsRes = await fetch(`${baseUrl}/investments/holdings/get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        secret,
        access_token: credentials.access_token,
      }),
    });

    const holdingsData = await holdingsRes.json();

    // Update sync timestamp
    await supabase
      .from('integration_connections')
      .update({
        last_sync_at: new Date().toISOString(),
        status: 'active',
        sync_error: null,
      })
      .eq('id', connectionId);

    return NextResponse.json({
      success: true,
      accounts: accountsData.accounts?.length ?? 0,
      holdings: holdingsData.holdings?.length ?? 0,
    });
  } catch (error) {
    console.error('Plaid sync error:', error);

    await supabase
      .from('integration_connections')
      .update({
        status: 'error',
        sync_error: error instanceof Error ? error.message : 'Sync failed',
      })
      .eq('id', connectionId);

    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
