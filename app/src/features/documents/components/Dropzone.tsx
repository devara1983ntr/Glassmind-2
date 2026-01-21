import { cn } from '@shared/lib/utils';
import { Upload } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDocumentStore } from '../stores/useDocumentStore';
import { Icon } from '@shared/ui/Icon';
import { Typography } from '@shared/ui/Typography';
import { useToastStore } from '@shared/ui/Toast';

export const Dropzone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const addFiles = useDocumentStore((state) => state.addFiles);
  const { addToast } = useToastStore();

  const handleFiles = useCallback(async (files: File[]) => {
      const { valid, invalid } = await addFiles(files);

      if (valid.length > 0) {
          addToast('success', `Started uploading ${valid.length} file(s)`);
      }

      if (invalid.length > 0) {
          invalid.forEach((err: string) => addToast('error', err));
      }
  }, [addFiles, addToast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all',
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-white/10 bg-white/5 hover:bg-white/10'
      )}
    >
      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.tiff"
        onChange={handleFileInput}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 shadow-inner mb-4">
        <Icon icon={Upload} className="h-8 w-8 text-primary" />
      </div>
      <Typography variant="h4" className="mb-2">
        Click to upload or drag and drop
      </Typography>
      <Typography variant="muted">
        PDF, PNG, JPG up to 200MB
      </Typography>
    </div>
  );
};
