-- 020_rls_policies.sql
-- Every table gets tenant isolation

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_signatories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inter_entity_loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE rebalance_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE capital_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dd_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants_property ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE renovation_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_flow_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions_tracked ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_loss_harvesting ENABLE ROW LEVEL SECURITY;
ALTER TABLE charitable_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_channel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_vote_ballots ENABLE ROW LEVEL SECURITY;
ALTER TABLE philanthropy_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE succession_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_branding ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's tenant IDs
CREATE OR REPLACE FUNCTION get_user_tenant_ids()
RETURNS SETOF UUID
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT tenant_id FROM tenant_members
  WHERE user_id = auth.uid() AND is_active = true;
$$;

-- Tenant isolation policies for tables with tenant_id
CREATE POLICY "tenant_isolation" ON tenants
  FOR ALL USING (id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON tenant_members
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON entities
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON inter_entity_loans
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON accounts
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON holdings
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON transactions
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON watchlist
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON benchmarks
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON rebalance_rules
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON deals
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON capital_calls
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON distributions
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON properties
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON cash_flow_entries
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON bill_payments
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON subscriptions_tracked
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON tax_estimates
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON tax_loss_harvesting
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON charitable_donations
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON gift_tracking
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON compliance_deadlines
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON document_folders
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON documents
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON message_channels
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON family_meetings
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON family_votes
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON philanthropy_grants
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON succession_plans
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON education_programs
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON insurance_policies
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON advisor_contacts
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON integration_connections
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON audit_log
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON notifications
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON ai_conversations
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

CREATE POLICY "tenant_isolation" ON tenant_branding
  FOR ALL USING (tenant_id IN (SELECT get_user_tenant_ids()));

-- Policies for child tables (linked through parent with tenant_id)
CREATE POLICY "entity_beneficiaries_access" ON entity_beneficiaries
  FOR ALL USING (
    entity_id IN (SELECT id FROM entities WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "entity_signatories_access" ON entity_signatories
  FOR ALL USING (
    entity_id IN (SELECT id FROM entities WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "tax_lots_access" ON tax_lots
  FOR ALL USING (
    holding_id IN (SELECT id FROM holdings WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "deal_documents_access" ON deal_documents
  FOR ALL USING (
    deal_id IN (SELECT id FROM deals WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "deal_notes_access" ON deal_notes
  FOR ALL USING (
    deal_id IN (SELECT id FROM deals WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "dd_checklists_access" ON dd_checklists
  FOR ALL USING (
    deal_id IN (SELECT id FROM deals WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "tenants_property_access" ON tenants_property
  FOR ALL USING (
    property_id IN (SELECT id FROM properties WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "maintenance_requests_access" ON maintenance_requests
  FOR ALL USING (
    property_id IN (SELECT id FROM properties WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "renovation_budgets_access" ON renovation_budgets
  FOR ALL USING (
    property_id IN (SELECT id FROM properties WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "message_channel_members_access" ON message_channel_members
  FOR ALL USING (
    channel_id IN (SELECT id FROM message_channels WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "messages_access" ON messages
  FOR ALL USING (
    channel_id IN (SELECT id FROM message_channels WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "family_vote_ballots_access" ON family_vote_ballots
  FOR ALL USING (
    vote_id IN (SELECT id FROM family_votes WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

CREATE POLICY "advisor_engagements_access" ON advisor_engagements
  FOR ALL USING (
    contact_id IN (SELECT id FROM advisor_contacts WHERE tenant_id IN (SELECT get_user_tenant_ids()))
  );

-- Read-only policy for auditors
CREATE POLICY "auditor_readonly" ON audit_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tenant_members
      WHERE user_id = auth.uid()
      AND tenant_id = audit_log.tenant_id
      AND role = 'auditor'
      AND is_active = true
    )
  );

-- Price history is public (no tenant isolation needed)
-- subscription_plans is public (no tenant isolation needed)
