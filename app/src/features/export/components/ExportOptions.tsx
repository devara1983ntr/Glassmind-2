import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { FileText, FileCode, File, Check } from 'lucide-react';
import { Icon } from '@shared/ui/Icon';
import { useState } from 'react';
import { cn } from '@shared/lib/utils';

export type ExportFormat = 'pdf' | 'docx' | 'html' | 'txt';

interface ExportOption {
  id: ExportFormat;
  label: string;
  icon: any;
  desc: string;
}

const options: ExportOption[] = [
  { id: 'pdf', label: 'PDF Document', icon: File, desc: 'Professional layout with fixed formatting.' },
  { id: 'docx', label: 'Microsoft Word', icon: FileText, desc: 'Editable document with preserved styles.' },
  { id: 'html', label: 'HTML Web Page', icon: FileCode, desc: 'Responsive web format for publishing.' },
  { id: 'txt', label: 'Plain Text', icon: FileText, desc: 'Raw content without formatting.' },
];

export const ExportOptions = () => {
  const [selected, setSelected] = useState<ExportFormat>('pdf');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((opt) => (
        <button key={opt.id} onClick={() => setSelected(opt.id)} className="text-left">
          <GlassCard
            variant={selected === opt.id ? 'elevated' : 'flat'}
            className={cn(
              'group transition-all duration-200 hover:bg-white/10 relative',
              selected === opt.id ? 'border-primary/50 ring-2 ring-primary/20 bg-primary/5' : ''
            )}
          >
             {selected === opt.id && (
              <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Icon icon={Check} className="h-4 w-4 text-white" />
              </div>
            )}
            <div className="flex items-center gap-4 mb-3">
                <div className={cn(
                    "p-3 rounded-lg transition-colors",
                    selected === opt.id ? "bg-primary text-white" : "bg-white/10 text-zinc-400 group-hover:text-white"
                )}>
                    <Icon icon={opt.icon} className="h-6 w-6" />
                </div>
                <Typography variant="h4">{opt.label}</Typography>
            </div>
            <Typography variant="muted" className="pl-[4.25rem] group-hover:text-zinc-300">
                {opt.desc}
            </Typography>
          </GlassCard>
        </button>
      ))}
    </div>
  );
};
