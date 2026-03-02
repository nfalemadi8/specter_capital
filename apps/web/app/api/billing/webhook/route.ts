import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!sig || !webhookSecret || !stripeKey) {
    return NextResponse.json({ error: 'Missing configuration' }, { status: 400 });
  }

  // In production, verify the webhook signature using Stripe SDK
  // For now, we process the event directly
  let event: {
    type: string;
    data: {
      object: Record<string, unknown>;
    };
  };

  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const supabase = createAdminClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const tenantId = (session.metadata as Record<string, string>)?.tenant_id;
        const planId = (session.metadata as Record<string, string>)?.plan_id;
        const subscriptionId = session.subscription as string;

        if (tenantId && planId) {
          await supabase
            .from('tenants')
            .update({
              plan: planId,
              stripe_subscription_id: subscriptionId,
              updated_at: new Date().toISOString(),
            })
            .eq('id', tenantId);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        // Find tenant by stripe customer
        const { data: tenant } = await supabase
          .from('tenants')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (tenant) {
          const status = subscription.status as string;
          if (status === 'canceled' || status === 'unpaid') {
            await supabase
              .from('tenants')
              .update({ plan: 'starter', updated_at: new Date().toISOString() })
              .eq('id', tenant.id);
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        const { data: tenant } = await supabase
          .from('tenants')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (tenant) {
          // Create notification for payment failure
          const { data: members } = await supabase
            .from('tenant_members')
            .select('id')
            .eq('tenant_id', tenant.id)
            .in('role', ['principal', 'co_principal', 'cfo']);

          for (const member of members ?? []) {
            await supabase.from('notifications').insert({
              tenant_id: tenant.id,
              member_id: member.id,
              title: 'Payment Failed',
              body: 'Your subscription payment failed. Please update your payment method.',
              notification_type: 'alert',
              priority: 'high',
              action_url: '/settings/billing',
            });
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
