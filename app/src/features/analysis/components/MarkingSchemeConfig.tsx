import { useAnalysisStore } from '../stores/useAnalysisStore';
import { Slider } from '@shared/ui/Slider';
import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';

export const MarkingSchemeConfig = () => {
  const { markingScheme, updateMarkingScheme } = useAnalysisStore();
  const total = Object.values(markingScheme).reduce((a, b) => a + b, 0);

  return (
    <GlassCard variant="flat" className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h4">Marking Scheme Alignment</Typography>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${total === 100 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
            Total: {total}%
        </span>
      </div>

      <div className="space-y-6">
        <Slider
          label="Introduction"
          value={markingScheme.introduction}
          onChange={(v) => updateMarkingScheme('introduction', v)}
        />
        <Slider
          label="Main Body"
          value={markingScheme.body}
          onChange={(v) => updateMarkingScheme('body', v)}
        />
        <Slider
          label="Conclusion"
          value={markingScheme.conclusion}
          onChange={(v) => updateMarkingScheme('conclusion', v)}
        />
        <Slider
          label="Presentation & Formatting"
          value={markingScheme.presentation}
          onChange={(v) => updateMarkingScheme('presentation', v)}
        />
      </div>
    </GlassCard>
  );
};
