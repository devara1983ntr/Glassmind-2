import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Button } from '@shared/ui/Button';
import { Upload, FileText, Clock, CheckCircle, ArrowRight, Activity } from 'lucide-react';
import { Icon } from '@shared/ui/Icon';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Typography variant="h2">Dashboard</Typography>
          <Typography variant="muted">Overview of your academic content generation</Typography>
        </div>
        <div className="flex gap-3">
             <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-xs font-medium text-green-500">System Healthy</span>
             </div>
             <Button onClick={() => navigate('/upload')}>
                <Icon icon={Upload} className="mr-2" />
                New Upload
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Documents', value: '124', icon: FileText, color: 'text-blue-500', trend: '+12% this week' },
          { label: 'Processing', value: '3', icon: Clock, color: 'text-yellow-500', trend: 'Active now' },
          { label: 'Completed', value: '118', icon: CheckCircle, color: 'text-green-500', trend: '98% success rate' },
          { label: 'Avg. Time', value: '1.2m', icon: Activity, color: 'text-purple-500', trend: '-15s vs last week' },
        ].map((stat, i) => (
          <GlassCard key={i} variant="flat" className="flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
               <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <Icon icon={stat.icon} className="h-6 w-6" />
                </div>
                 {i === 1 && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span></span>}
            </div>
            <div>
              <Typography variant="h3" className="mt-1 font-bold">{stat.value}</Typography>
              <Typography variant="small" className="text-zinc-400 font-medium">{stat.label}</Typography>
              <Typography variant="muted" className="text-xs mt-2">{stat.trend}</Typography>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <Typography variant="h4">Recent Activity</Typography>
                <Button variant="ghost" size="sm" onClick={() => navigate('/documents')}>View All</Button>
            </div>

            <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8 py-2">
                {[
                    { title: 'Physics_Exam_2024.pdf', action: 'Analysis Completed', time: '2 hours ago', user: 'Demo User', status: 'success' },
                    { title: 'Chemistry_Notes.jpg', action: 'Upload Started', time: '4 hours ago', user: 'System', status: 'warning' },
                    { title: 'History_Essay.docx', action: 'Exported to PDF', time: 'Yesterday', user: 'Demo User', status: 'info' }
                ].map((item, i) => (
                    <div key={i} className="relative">
                        <div className={`absolute -left-[39px] h-5 w-5 rounded-full border-4 border-black ${item.status === 'success' ? 'bg-green-500' : item.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Icon icon={FileText} className="text-zinc-400 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <Typography variant="body" className="font-medium text-white">{item.title}</Typography>
                                    <Typography variant="small" className="text-zinc-500">{item.action} • {item.user}</Typography>
                                </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[120px]">
                                <span className="text-xs text-zinc-500">{item.time}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Icon icon={ArrowRight} className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>

        <div className="space-y-6">
             <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <Typography variant="h4" className="mb-2">Quick Actions</Typography>
                <Typography variant="muted" className="mb-4 text-sm">Common tasks to get you started faster.</Typography>
                <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/20" onClick={() => navigate('/upload')}>
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-500">
                             <Icon icon={Upload} className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-white text-sm">Upload Files</div>
                            <div className="text-xs text-zinc-500">Start new analysis</div>
                        </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/20" onClick={() => navigate('/documents')}>
                         <div className="p-2 rounded-lg bg-purple-500/20 text-purple-500">
                             <Icon icon={FileText} className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-white text-sm">View Library</div>
                            <div className="text-xs text-zinc-500">Access all documents</div>
                        </div>
                    </Button>
                </div>
            </GlassCard>

            <GlassCard variant="flat">
                <Typography variant="h4" className="mb-4">Storage Usage</Typography>
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-zinc-400">Used</span>
                            <span className="text-white font-medium">8.5 GB</span>
                        </div>
                         <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[85%]" />
                        </div>
                    </div>
                    <div className="text-right">
                         <span className="text-xs text-zinc-500 block">Total</span>
                         <span className="text-sm font-medium">10 GB</span>
                    </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary-hover">Upgrade Plan</Button>
            </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
