'use client';

import React, { useCallback, useRef, useState } from 'react';
import { clsx } from 'clsx';

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  className?: string;
}

export function FileUploader({
  onUpload,
  accept,
  multiple = false,
  maxSizeMB = 50,
  className,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const files = Array.from(fileList).filter(
        (f) => f.size <= maxSizeMB * 1024 * 1024
      );
      if (files.length > 0) onUpload(files);
    },
    [onUpload, maxSizeMB]
  );

  return (
    <div
      className={clsx(
        'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors',
        isDragging
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
          : 'border-[var(--color-border)] hover:border-[var(--color-muted)]',
        className
      )}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
      <p className="text-sm text-[var(--color-muted-foreground)]">
        Drop files here or click to upload
      </p>
      <p className="mt-1 text-xs text-[var(--color-muted)]">Max {maxSizeMB}MB per file</p>
    </div>
  );
}
