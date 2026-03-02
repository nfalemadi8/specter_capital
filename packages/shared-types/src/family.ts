export interface FamilyMeeting {
  id: string;
  tenant_id: string;
  title: string;
  description: string | null;
  meeting_date: string;
  location: string | null;
  meeting_type: string | null;
  agenda_items: Array<{
    title: string;
    presenter: string;
    duration_minutes: number;
    notes: string;
  }>;
  minutes: string | null;
  minutes_approved: boolean;
  approved_by: string | null;
  attendees: string[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
}

export interface FamilyVote {
  id: string;
  tenant_id: string;
  meeting_id: string | null;
  title: string;
  description: string | null;
  vote_type: 'majority' | 'supermajority' | 'unanimous';
  options: string[];
  voting_opens_at: string | null;
  voting_closes_at: string | null;
  status: 'draft' | 'open' | 'closed';
  result: string | null;
  created_at: string;
}

export interface FamilyVoteBallot {
  id: string;
  vote_id: string;
  member_id: string | null;
  choice: string;
  voted_at: string;
}

export interface PhilanthropyGrant {
  id: string;
  tenant_id: string;
  entity_id: string | null;
  recipient_name: string;
  recipient_ein: string | null;
  amount: number;
  currency: string;
  purpose: string | null;
  grant_type: 'general_operating' | 'project' | 'scholarship' | 'endowment' | null;
  grant_date: string | null;
  reporting_due_date: string | null;
  status: 'pending' | 'approved' | 'disbursed' | 'completed' | 'rejected';
  approved_by: string | null;
  expenditure_responsibility: boolean;
  report_received: boolean;
  notes: string | null;
  created_at: string;
}

export interface SuccessionPlan {
  id: string;
  tenant_id: string;
  title: string;
  description: string | null;
  effective_trigger: string | null;
  assignments: Array<{
    role: string;
    current: string;
    successor: string;
    ready: boolean;
  }>;
  last_reviewed_date: string | null;
  next_review_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EducationProgram {
  id: string;
  tenant_id: string;
  member_id: string | null;
  title: string;
  category: string | null;
  description: string | null;
  modules: Array<{
    title: string;
    completed: boolean;
    completed_date: string | null;
    notes: string;
  }>;
  progress_pct: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}
