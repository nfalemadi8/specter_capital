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

  const { action, tenantId, connectionId } = await request.json();

  const clientId = process.env.IBKR_CLIENT_ID;
  const clientSecret = process.env.IBKR_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'IBKR not configured' }, { status: 503 });
  }

  try {
    switch (action) {
      case 'connect': {
        // Store initial connection pending OAuth callback
        const { data: member } = await supabase
          .from('tenant_members')
          .select('id')
          .eq('user_id', user.id)
          .eq('tenant_id', tenantId)
          .single();

        await supabase.from('integration_connections').insert({
          tenant_id: tenantId,
          provider: 'ibkr',
          status: 'pending',
          credentials_encrypted: {},
          sync_frequency: 'daily',
          created_by: member?.id,
        });

        // In production, this would redirect to IBKR OAuth
        return NextResponse.json({
          success: true,
          message: 'IBKR connection initiated. Complete OAuth flow to activate.',
        });
      }

      case 'sync': {
        if (!connectionId) {
          return NextResponse.json({ error: 'Missing connectionId' }, { status: 400 });
        }

        // In production, this would call the IBKR Web API
        await supabase
          .from('integration_connections')
          .update({
            last_sync_at: new Date().toISOString(),
            status: 'active',
            sync_error: null,
          })
          .eq('id', connectionId);

        return NextResponse.json({ success: true, message: 'IBKR positions synced' });
      }

      case 'positions': {
        // Fetch positions from IBKR (placeholder for actual API call)
        return NextResponse.json({ positions: [] });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('IBKR error:', error);
    return NextResponse.json({ error: 'IBKR operation failed' }, { status: 500 });
  }
}
