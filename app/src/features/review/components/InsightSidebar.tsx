import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { AlertTriangle, BookOpen, BarChart } from 'lucide-react';
import { Icon } from '@shared/ui/Icon';

export const InsightSidebar = () => {
  return (
    <div className="space-y-6">
      <GlassCard variant="flat">
        <Typography variant="h4" className="mb-4 flex items-center gap-2">
            <Icon icon={BarChart} className="text-primary" />
            Quality Metrics
        </Typography>
        <div className="space-y-4">
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm text-zinc-400">Readability Score</span>
                    <span className="text-sm font-bold text-green-500">92/100</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full">
                    <div className="h-full bg-green-500 rounded-full w-[92%]" />
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm text-zinc-400">Citation Density</span>
                    <span className="text-sm font-bold text-blue-500">High</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full w-[80%]" />
                </div>
            </div>
             <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm text-zinc-400">Marking Alignment</span>
                    <span className="text-sm font-bold text-yellow-500">Good</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full">
                    <div className="h-full bg-yellow-500 rounded-full w-[70%]" />
                </div>
            </div>
        </div>
      </GlassCard>

      <GlassCard variant="flat">
        <Typography variant="h4" className="mb-4 flex items-center gap-2">
            <Icon icon={BookOpen} className="text-secondary" />
            Sources Used
        </Typography>
        <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
                <li key={i} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs font-mono">
                        {i}
                    </span>
                    <span className="text-zinc-300">
                        Einstein, A., Podolsky, B., & Rosen, N. (1935). Can Quantum-Mechanical Description...
                    </span>
                </li>
            ))}
        </ul>
      </GlassCard>

       <GlassCard variant="flat">
        <Typography variant="h4" className="mb-4 flex items-center gap-2">
            <Icon icon={AlertTriangle} className="text-yellow-500" />
            AI Suggestions
        </Typography>
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-200">
                Consider expanding the explanation of &quot;Wave Function Collapse&quot; to include the Copenhagen Interpretation for better academic depth.
            </p>
        </div>
      </GlassCard>
    </div>
  );
};
