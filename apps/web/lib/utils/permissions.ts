import type { UserRole, TenantMember, RolePermissions } from '@specter/shared-types';
import { ADMIN_ROLES } from '@/lib/constants/roles';

export type ModuleName =
  | 'dashboard'
  | 'portfolio'
  | 'deals'
  | 'real_estate'
  | 'entities'
  | 'documents'
  | 'cash_flow'
  | 'bill_pay'
  | 'insurance'
  | 'contacts'
  | 'tax'
  | 'audit'
  | 'reports'
  | 'governance'
  | 'philanthropy'
  | 'messaging'
  | 'settings'
  | 'billing'
  | 'integrations'
  | 'ai_copilot';

export type ActionType = 'view' | 'edit' | 'create' | 'delete' | 'approve' | 'trade' | 'upload' | 'generate' | 'vote' | 'send' | 'query';

export function hasPermission(
  rolePermissions: RolePermissions | null,
  member: TenantMember | null,
  module: ModuleName,
  action: ActionType
): boolean {
  if (!rolePermissions || !member) return false;

  // Check permission override first
  const override = member.permissions_override as Record<string, Record<string, boolean>> | undefined;
  if (override?.[module]?.[action] !== undefined) {
    return override[module][action];
  }

  // Check role-based permissions
  const modulePerms = rolePermissions.permissions[module];
  if (!modulePerms) return false;

  return modulePerms[action] === true;
}

export function isAdmin(role: UserRole): boolean {
  return ADMIN_ROLES.includes(role);
}

export function canAccessModule(
  rolePermissions: RolePermissions | null,
  member: TenantMember | null,
  module: ModuleName
): boolean {
  return hasPermission(rolePermissions, member, module, 'view');
}

export function canEditModule(
  rolePermissions: RolePermissions | null,
  member: TenantMember | null,
  module: ModuleName
): boolean {
  return hasPermission(rolePermissions, member, module, 'edit');
}
