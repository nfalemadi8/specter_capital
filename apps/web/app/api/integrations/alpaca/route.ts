import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const ALPACA_BASE_URL = process.env.ALPACA_API_KEY?.startsWith('PK')
  ? 'https://paper-api.alpaca.markets'
  : 'https://api.alpaca.markets';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action, tenantId, connectionId } = await request.json();

  const apiKey = process.env.ALPACA_API_KEY;
  const secretKey = process.env.ALPACA_SECRET_KEY;

  if (!apiKey || !secretKey) {
    return NextResponse.json({ error: 'Alpaca not configured' }, { status: 503 });
  }

  const alpacaHeaders = {
    'APCA-API-KEY-ID': apiKey,
    'APCA-API-SECRET-KEY': secretKey,
    'Content-Type': 'application/json',
  };

  try {
    switch (action) {
      case 'connect': {
        // Verify API keys by fetching account
        const accountRes = await fetch(`${ALPACA_BASE_URL}/v2/account`, {
          headers: alpacaHeaders,
        });

        if (!accountRes.ok) {
          return NextResponse.json({ error: 'Invalid Alpaca credentials' }, { status: 400 });
        }

        const account = await accountRes.json();

        const { data: member } = await supabase
          .from('tenant_members')
          .select('id')
          .eq('user_id', user.id)
          .eq('tenant_id', tenantId)
          .single();

        await supabase.from('integration_connections').insert({
          tenant_id: tenantId,
          provider: 'alpaca',
          status: 'active',
          credentials_encrypted: {
            account_id: account.id,
            account_number: account.account_number,
          },
          config: {
            paper_trading: apiKey.startsWith('PK'),
            equity: account.equity,
            buying_power: account.buying_power,
          },
          last_sync_at: new Date().toISOString(),
          sync_frequency: 'realtime',
          created_by: member?.id,
        });

        return NextResponse.json({ success: true, account_number: account.account_number });
      }

      case 'positions': {
        const positionsRes = await fetch(`${ALPACA_BASE_URL}/v2/positions`, {
          headers: alpacaHeaders,
        });

        if (!positionsRes.ok) {
          return NextResponse.json({ error: 'Failed to fetch positions' }, { status: 502 });
        }

        const positions = await positionsRes.json();
        return NextResponse.json({ positions });
      }

      case 'sync': {
        if (!connectionId) {
          return NextResponse.json({ error: 'Missing connectionId' }, { status: 400 });
        }

        const positionsRes = await fetch(`${ALPACA_BASE_URL}/v2/positions`, {
          headers: alpacaHeaders,
        });

        const positions = positionsRes.ok ? await positionsRes.json() : [];

        await supabase
          .from('integration_connections')
          .update({
            last_sync_at: new Date().toISOString(),
            status: 'active',
            sync_error: null,
          })
          .eq('id', connectionId);

        return NextResponse.json({ success: true, positions_count: positions.length });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Alpaca error:', error);
    return NextResponse.json({ error: 'Alpaca operation failed' }, { status: 500 });
  }
}
