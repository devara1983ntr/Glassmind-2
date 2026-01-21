import { useState } from 'react';
import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { Check, Info, AlertTriangle, XCircle, Trash, Bell, CheckCheck } from 'lucide-react';
import { cn } from '@shared/lib/utils';
import { Tabs } from '@shared/ui/Tabs';
import { useNotifications, useMarkNotificationRead, useDeleteNotification, useMarkAllNotificationsRead } from '@shared/hooks/api';
import type { Notification } from '@shared/api/storage/types';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { data: notifications, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();
  const deleteNotif = useDeleteNotification();
  const markAll = useMarkAllNotificationsRead();

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'system', label: 'System' }
  ];

  const filteredNotifications = notifications?.filter(n => {
      if (activeTab === 'unread') return !n.read;
      if (activeTab === 'system') return n.type === 'info' || n.type === 'warning';
      return true;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  const handleMarkRead = (id: string) => {
      markRead.mutate(id);
  };

  const handleDelete = (id: string) => {
      deleteNotif.mutate(id);
  };

  const getTypeIcon = (type: string) => {
      switch (type) {
          case 'success': return Check;
          case 'warning': return AlertTriangle;
          case 'error': return XCircle;
          default: return Info;
      }
  };

  const getTypeColor = (type: string) => {
      switch (type) {
          case 'success': return "text-green-500 bg-green-500/10 border-green-500/20";
          case 'warning': return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
          case 'error': return "text-error bg-error/10 border-error/20";
          default: return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
            <Typography variant="h2">Notifications</Typography>
            <Typography variant="muted">Stay updated with system alerts and analysis progress</Typography>
        </div>
        <Button onClick={() => markAll.mutate()} variant="outline" className="gap-2">
            <Icon icon={CheckCheck} />
            Mark all as read
        </Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {isLoading ? (
          <div className="py-20 text-center text-zinc-500">Loading notifications...</div>
      ) : filteredNotifications.length === 0 ? (
          <GlassCard variant="flat" className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center">
                  <Icon icon={Bell} className="h-8 w-8 text-zinc-600" />
              </div>
              <div>
                  <Typography variant="h4">All caught up!</Typography>
                  <Typography variant="muted">No notifications to display at the moment.</Typography>
              </div>
          </GlassCard>
      ) : (
          <div className="space-y-4">
              {filteredNotifications.map((notification: Notification) => (
                  <GlassCard
                    key={notification.id}
                    variant={notification.read ? "flat" : "elevated"}
                    className={cn(
                        "transition-all duration-300",
                        !notification.read && "border-primary/30 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                    )}
                  >
                      <div className="flex items-start gap-4">
                          <div className={cn(
                              "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border",
                              getTypeColor(notification.type)
                          )}>
                              <Icon icon={getTypeIcon(notification.type)} className="h-5 w-5" />
                          </div>

                          <div className="flex-1 space-y-1">
                              <div className="flex items-start justify-between gap-4">
                                  <Typography variant="body" className={cn("font-medium", !notification.read && "text-white")}>
                                      {notification.title}
                                  </Typography>
                                  <span className="text-xs text-zinc-500 whitespace-nowrap">
                                      {new Date(notification.date).toLocaleString()}
                                  </span>
                              </div>
                              <Typography variant="muted" className="text-sm">
                                  {notification.message}
                              </Typography>
                          </div>

                          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100">
                               {!notification.read && (
                                   <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-primary hover:bg-primary/10"
                                    onClick={() => handleMarkRead(notification.id)}
                                    title="Mark as read"
                                   >
                                       <div className="h-2 w-2 rounded-full bg-primary" />
                                   </Button>
                               )}
                               <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-zinc-500 hover:text-error hover:bg-error/10"
                                onClick={() => handleDelete(notification.id)}
                                title="Delete"
                               >
                                   <Icon icon={Trash} className="h-4 w-4" />
                               </Button>
                          </div>
                      </div>
                  </GlassCard>
              ))}
          </div>
      )}
    </div>
  );
};

export default NotificationsPage;
