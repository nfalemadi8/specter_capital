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

  const { public_token, tenantId } = await request.json();
  if (!public_token || !tenantId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
    const response = await fetch(`${baseUrl}/item/public_token/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        secret,
        public_token,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.error_message ?? 'Exchange failed' }, { status: 400 });
    }

    // Get member_id from tenant_members
    const { data: member } = await supabase
      .from('tenant_members')
      .select('id')
      .eq('user_id', user.id)
      .eq('tenant_id', tenantId)
      .single();

    // Store connection (access_token should be encrypted in production)
    await supabase.from('integration_connections').insert({
      tenant_id: tenantId,
      provider: 'plaid',
      status: 'active',
      credentials_encrypted: {
        access_token: data.access_token,
        item_id: data.item_id,
      },
      last_sync_at: new Date().toISOString(),
      sync_frequency: 'daily',
      created_by: member?.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Plaid exchange error:', error);
    return NextResponse.json({ error: 'Exchange failed' }, { status: 500 });
  }
}
