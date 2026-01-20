import { GlassCard } from './GlassCard';
import { Typography } from './Typography';
import { Loader2 } from 'lucide-react';
import { Icon } from './Icon';

export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <GlassCard className="flex flex-col items-center p-8 space-y-4 shadow-2xl border-primary/20">
        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon icon={Loader2} className="h-8 w-8 text-primary animate-spin" />
        </div>
        <div className="text-center">
            <Typography variant="h4">Loading...</Typography>
            <Typography variant="muted">Please wait while we process your request.</Typography>
        </div>
      </GlassCard>
    </div>
  );
};
