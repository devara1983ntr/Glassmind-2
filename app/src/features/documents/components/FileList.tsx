import { FileText, X, Check } from 'lucide-react';
import { useDocumentStore } from '../stores/useDocumentStore';
import { GlassCard } from '@shared/ui/GlassCard';
import { Icon } from '@shared/ui/Icon';
import { Typography } from '@shared/ui/Typography';

export const FileList = () => {
  const { files, removeFile } = useDocumentStore();

  if (files.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => (
        <GlassCard key={file.id} variant="flat" className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
            <Icon icon={FileText} className="h-6 w-6 text-blue-500" />
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <Typography variant="small" className="truncate font-medium">
                {file.file.name}
              </Typography>
              <button onClick={() => removeFile(file.id)} className="text-zinc-500 hover:text-error">
                <Icon icon={X} className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
               <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-300 ${file.status === 'completed' ? 'bg-green-500' : 'bg-primary'}`}
                    style={{ width: `${file.progress}%` }}
                />
               </div>
               {file.status === 'uploading' && <span className="text-xs text-zinc-400">{Math.round(file.progress)}%</span>}
               {file.status === 'completed' && <Icon icon={Check} className="h-4 w-4 text-green-500" />}
            </div>
            <Typography variant="muted" className="text-xs mt-1">
                {(file.file.size / 1024 / 1024).toFixed(2)} MB
            </Typography>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};
