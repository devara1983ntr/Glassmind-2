import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { Check, Info, AlertTriangle, XCircle, Bell } from 'lucide-react';
import { cn } from '@shared/lib/utils';
import { motion } from 'framer-motion';
import { useNotifications, useMarkAllNotificationsRead } from '@shared/hooks/api';
import { useNavigate } from 'react-router-dom';

const NotificationPanel = ({ onClose }: { onClose: () => void }) => {
  const { data: notifications, isLoading } = useNotifications();
  const markAllRead = useMarkAllNotificationsRead();
  const navigate = useNavigate();

  const handleViewAll = () => {
      onClose();
      navigate('/notifications');
  };

  const sortedNotifications = notifications?.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5) || [];

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
            <Button
                variant="ghost"
                size="sm"
                className="h-auto py-1 px-2 text-xs"
                onClick={() => markAllRead.mutate()}
                disabled={!notifications?.some(n => !n.read)}
            >
                Mark all read
            </Button>
        </div>
        <div className="max-h-[400px] overflow-y-auto min-h-[100px]">
            {isLoading ? (
                <div className="p-8 text-center text-zinc-500 text-sm">Loading...</div>
            ) : sortedNotifications.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                    <Icon icon={Bell} className="h-8 w-8 text-zinc-600 mx-auto" />
                    <Typography variant="small" className="text-zinc-500 block">No notifications</Typography>
                </div>
            ) : (
                sortedNotifications.map((n) => (
                    <div key={n.id} className={cn("p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer", !n.read && "bg-primary/5")}>
                        <div className="flex gap-3">
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                n.type === 'success' ? "bg-green-500/20 text-green-500" :
                                n.type === 'warning' ? "bg-yellow-500/20 text-yellow-500" :
                                n.type === 'error' ? "bg-red-500/20 text-red-500" :
                                "bg-blue-500/20 text-blue-500"
                            )}>
                                <Icon icon={
                                    n.type === 'success' ? Check :
                                    n.type === 'warning' ? AlertTriangle :
                                    n.type === 'error' ? XCircle : Info
                                } className="h-4 w-4" />
                            </div>
                            <div>
                                <Typography variant="body" className={cn("text-sm font-medium leading-none mb-1", !n.read && "text-white")}>{n.title}</Typography>
                                <Typography variant="muted" className="text-xs line-clamp-2 mb-1">{n.message}</Typography>
                                <span className="text-[10px] text-zinc-500">
                                    {/* Simple time ago since date-fns might not be there */}
                                    {new Date(n.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
        <div className="p-2 bg-white/5 border-t border-white/10 text-center">
            <Button variant="ghost" size="sm" className="w-full text-xs" onClick={handleViewAll}>View All Activity</Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export { NotificationPanel };
