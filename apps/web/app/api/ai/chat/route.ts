import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { messages, tenantId } = await request.json();

  if (!messages || !tenantId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { content: 'AI copilot is not configured. Please set the ANTHROPIC_API_KEY environment variable.' },
      { status: 200 }
    );
  }

  try {
    // Fetch context data for the AI
    const [
      { data: entities },
      { data: deals },
      { data: holdings },
    ] = await Promise.all([
      supabase.from('entities').select('name, entity_type, total_value, is_active').eq('tenant_id', tenantId).limit(20),
      supabase.from('deals').select('name, company_name, stage, target_amount, invested_amount').eq('tenant_id', tenantId).limit(20),
      supabase.from('holdings').select('symbol, name, quantity, current_price, market_value, unrealized_pnl').limit(20),
    ]);

    const systemPrompt = `You are Specter AI, an intelligent copilot for a family office management platform.
You help users understand their financial data and provide insights.

Current data context:
- Entities: ${JSON.stringify(entities ?? [])}
- Deals: ${JSON.stringify(deals ?? [])}
- Holdings: ${JSON.stringify(holdings ?? [])}

Provide concise, helpful answers about the user's financial data.
Format numbers as currency when appropriate.
Be professional but approachable.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return NextResponse.json(
        { content: 'I encountered an issue processing your request. Please try again.' },
        { status: 200 }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text ?? 'No response generated.';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { content: 'An unexpected error occurred. Please try again later.' },
      { status: 200 }
    );
  }
}
