import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import type { TenantMember, Tenant } from '@specter/shared-types';

interface AuthState {
  user: User | null;
  member: TenantMember | null;
  tenant: Tenant | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setMember: (member: TenantMember | null) => void;
  setTenant: (tenant: Tenant | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  member: null,
  tenant: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setMember: (member) => set({ member }),
  setTenant: (tenant) => set({ tenant }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ user: null, member: null, tenant: null, isLoading: false }),
}));
