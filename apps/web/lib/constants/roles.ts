import type { UserRole } from '@specter/shared-types';

export const ROLE_LABELS: Record<UserRole, string> = {
  principal: 'Principal',
  co_principal: 'Co-Principal',
  cfo: 'Chief Financial Officer',
  accountant: 'Accountant',
  advisor: 'Advisor',
  family_member: 'Family Member',
  family_junior: 'Family Junior',
  auditor: 'Auditor',
  property_manager: 'Property Manager',
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  principal: 'Full access to all modules and settings. Owner of the family office.',
  co_principal: 'Full access to all modules and settings. Co-owner of the family office.',
  cfo: 'Financial operations access. Cannot access governance modules.',
  accountant: 'Accounting, tax, and bill pay access. Limited to financial operations.',
  advisor: 'Read-only access to portfolio and shared documents.',
  family_member: 'Dashboard, governance, messaging, and limited portfolio view.',
  family_junior: 'Minimal access. Dashboard, governance participation, and messaging.',
  auditor: 'Read-only access to all modules for compliance purposes.',
  property_manager: 'Real estate module access only, plus documents and contacts.',
};

export const ALL_ROLES: UserRole[] = [
  'principal',
  'co_principal',
  'cfo',
  'accountant',
  'advisor',
  'family_member',
  'family_junior',
  'auditor',
  'property_manager',
];

export const ADMIN_ROLES: UserRole[] = ['principal', 'co_principal'];
export const FINANCIAL_ROLES: UserRole[] = ['principal', 'co_principal', 'cfo', 'accountant'];
