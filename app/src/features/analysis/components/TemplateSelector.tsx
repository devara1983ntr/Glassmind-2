import { type TemplateId, useAnalysisStore } from '../stores/useAnalysisStore';
import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { cn } from '@shared/lib/utils';
import { Check } from 'lucide-react';
import { Icon } from '@shared/ui/Icon';

const templates: { id: TemplateId; title: string; desc: string }[] = [
  { id: 'academic', title: 'Standard Academic', desc: 'Traditional formatting with rigorous citation' },
  { id: 'minimal', title: 'Modern Minimalist', desc: 'Clean lines and ample whitespace' },
  { id: 'detailed', title: 'Detailed Explanatory', desc: 'Extensive annotations and deep dives' },
  { id: 'summary', title: 'Concise Summary', desc: 'Brief overviews for quick review' },
];

export const TemplateSelector = () => {
  const { template, setTemplate } = useAnalysisStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((t) => (
        <button key={t.id} onClick={() => setTemplate(t.id)} className="text-left w-full">
          <GlassCard
            variant={template === t.id ? 'elevated' : 'flat'}
            className={cn(
              'relative transition-all duration-200 hover:bg-white/10 group h-full',
              template === t.id ? 'border-primary/50 ring-2 ring-primary/20 bg-primary/5' : ''
            )}
          >
            {template === t.id && (
              <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Icon icon={Check} className="h-4 w-4 text-white" />
              </div>
            )}
            <Typography variant="h4" className={template === t.id ? 'text-primary' : ''}>
              {t.title}
            </Typography>
            <Typography variant="muted" className="mt-2 group-hover:text-zinc-300">
              {t.desc}
            </Typography>
          </GlassCard>
        </button>
      ))}
    </div>
  );
};
