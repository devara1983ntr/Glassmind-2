import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { Check, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@shared/lib/utils';
import { motion } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Analysis Completed', message: 'Physics_Exam_2024.pdf has been processed.', type: 'success', time: '2m ago', read: false },
  { id: '2', title: 'System Update', message: 'New features are available in the editor.', type: 'info', time: '1h ago', read: false },
  { id: '3', title: 'Storage Warning', message: 'You have used 85% of your storage quota.', type: 'warning', time: '2h ago', read: true },
];

export const NotificationPanel = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 top-16 w-80 sm:w-96 z-50"
    >
      <GlassCard variant="elevated" className="p-0 overflow-hidden shadow-2xl ring-1 ring-white/10">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <Typography variant="h4" className="text-base">Notifications</Typography>
            <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs">Mark all read</Button>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
            {mockNotifications.map((n) => (
                <div key={n.id} className={cn("p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer", !n.read && "bg-primary/5")}>
                    <div className="flex gap-3">
                        <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                            n.type === 'success' ? "bg-green-500/20 text-green-500" :
                            n.type === 'warning' ? "bg-yellow-500/20 text-yellow-500" :
                            "bg-blue-500/20 text-blue-500"
                        )}>
                            <Icon icon={n.type === 'success' ? Check : n.type === 'warning' ? AlertTriangle : Info} className="h-4 w-4" />
                        </div>
                        <div>
                            <Typography variant="body" className={cn("text-sm font-medium leading-none mb-1", !n.read && "text-white")}>{n.title}</Typography>
                            <Typography variant="muted" className="text-xs line-clamp-2 mb-1">{n.message}</Typography>
                            <span className="text-[10px] text-zinc-500">{n.time}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="p-2 bg-white/5 border-t border-white/10 text-center">
            <Button variant="ghost" size="sm" className="w-full text-xs" onClick={onClose}>View All Activity</Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};
