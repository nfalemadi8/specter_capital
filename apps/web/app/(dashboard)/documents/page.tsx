'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatDate } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import {
  FolderOpen, FileText, Lock, Upload, Search, Grid, List, ChevronRight,
} from 'lucide-react';
import { clsx } from 'clsx';
import type { Document } from '@specter/shared-types';

interface DocumentFolder {
  id: string;
  tenant_id: string;
  parent_id: string | null;
  name: string;
  folder_type: string | null;
  created_at: string;
}

const FILE_TYPE_ICONS: Record<string, string> = {
  pdf: '📄',
  docx: '📝',
  xlsx: '📊',
  image: '🖼️',
  other: '📎',
};

export default function DocumentsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [search, setSearch] = useState('');

  const { data: folders } = useQuery({
    queryKey: ['doc-folders', tenant?.id, currentFolder],
    queryFn: async () => {
      if (!tenant) return [];
      let query = supabase
        .from('document_folders')
        .select('*')
        .eq('tenant_id', tenant.id);
      if (currentFolder) {
        query = query.eq('parent_id', currentFolder);
      } else {
        query = query.is('parent_id', null);
      }
      const { data } = await query.order('name');
      return (data ?? []) as DocumentFolder[];
    },
    enabled: !!tenant?.id,
  });

  const { data: documents } = useQuery({
    queryKey: ['documents', tenant?.id, currentFolder, search],
    queryFn: async () => {
      if (!tenant) return [];
      let query = supabase
        .from('documents')
        .select('*')
        .eq('tenant_id', tenant.id);
      if (currentFolder) {
        query = query.eq('folder_id', currentFolder);
      } else if (!search) {
        query = query.is('folder_id', null);
      }
      if (search) {
        query = query.ilike('name', `%${search}%`);
      }
      const { data } = await query.order('updated_at', { ascending: false });
      return (data ?? []) as Document[];
    },
    enabled: !!tenant?.id,
  });

  const totalDocs = documents?.length ?? 0;
  const encryptedDocs = documents?.filter((d) => d.is_encrypted).length ?? 0;

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Lock size={24} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-white">Document Vault</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90">
          <Upload size={16} />
          Upload
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2 pl-9 pr-4 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-[var(--color-border)] p-0.5">
          <button
            onClick={() => setViewMode('list')}
            className={clsx('rounded p-1.5', viewMode === 'list' ? 'bg-[var(--color-surface-hover)]' : '')}
          >
            <List size={16} className="text-[var(--color-muted-foreground)]" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={clsx('rounded p-1.5', viewMode === 'grid' ? 'bg-[var(--color-surface-hover)]' : '')}
          >
            <Grid size={16} className="text-[var(--color-muted-foreground)]" />
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      {currentFolder && (
        <div className="flex items-center gap-1 text-sm">
          <button onClick={() => setCurrentFolder(null)} className="text-[var(--color-primary)] hover:underline">
            Root
          </button>
          <ChevronRight size={14} className="text-[var(--color-muted)]" />
          <span className="text-white">Current Folder</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Documents" value={String(totalDocs)} icon={<FileText size={20} />} />
        <StatCard title="Encrypted" value={String(encryptedDocs)} icon={<Lock size={20} />} />
        <StatCard title="Folders" value={String(folders?.length ?? 0)} icon={<FolderOpen size={20} />} />
      </div>

      {/* Folders */}
      {folders && folders.length > 0 && (
        <div className={clsx(viewMode === 'grid' ? 'grid grid-cols-2 gap-3 md:grid-cols-4' : 'space-y-1')}>
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setCurrentFolder(folder.id)}
              className={clsx(
                'flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-primary)]/30',
                viewMode === 'grid' ? 'flex-col p-4' : 'w-full px-4 py-3'
              )}
            >
              <FolderOpen size={viewMode === 'grid' ? 32 : 18} className="text-[var(--color-warning)]" />
              <span className="text-sm text-white">{folder.name}</span>
              {folder.folder_type && (
                <span className="text-xs capitalize text-[var(--color-muted-foreground)]">
                  {folder.folder_type}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Documents */}
      {viewMode === 'list' ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="divide-y divide-[var(--color-border)]">
            {documents && documents.length > 0 ? (
              documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{FILE_TYPE_ICONS[doc.file_type ?? 'other'] ?? '📎'}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">{doc.name}</p>
                        {doc.is_encrypted && <Lock size={12} className="text-[var(--color-success)]" />}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                        <span>{formatFileSize(doc.file_size)}</span>
                        {doc.document_category && (
                          <span className="capitalize">{doc.document_category.replace(/_/g, ' ')}</span>
                        )}
                        <span>v{doc.version}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-[var(--color-muted-foreground)]">
                    <p>{formatDate(doc.updated_at)}</p>
                    {doc.expiry_date && (
                      <p className={new Date(doc.expiry_date) < new Date() ? 'text-[var(--color-danger)]' : ''}>
                        Expires {formatDate(doc.expiry_date)}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-[var(--color-muted)]">No documents in this folder</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {documents?.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-primary)]/30"
            >
              <span className="text-3xl">{FILE_TYPE_ICONS[doc.file_type ?? 'other'] ?? '📎'}</span>
              <p className="mt-2 max-w-full truncate text-xs font-medium text-white">{doc.name}</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">{formatFileSize(doc.file_size)}</p>
              {doc.is_encrypted && <Lock size={10} className="mt-1 text-[var(--color-success)]" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
