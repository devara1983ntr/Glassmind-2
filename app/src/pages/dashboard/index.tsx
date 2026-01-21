import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Button } from '@shared/ui/Button';
import { Upload, FileText, Clock, CheckCircle, ArrowRight, BrainCircuit } from 'lucide-react';
import { Icon } from '@shared/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { useDocuments, useAnalysisHistory } from '@shared/hooks/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: documents } = useDocuments();
  const { data: analyses } = useAnalysisHistory();

  const totalDocs = documents?.length || 0;
  const totalAnalyses = analyses?.length || 0;
  const recentAnalyses = analyses?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5) || [];

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
          { label: 'Total Documents', value: totalDocs.toString(), icon: FileText, color: 'text-blue-500', trend: 'In library' },
          { label: 'Analyses Run', value: totalAnalyses.toString(), icon: BrainCircuit, color: 'text-purple-500', trend: 'Total generated' },
          { label: 'Processing', value: '0', icon: Clock, color: 'text-yellow-500', trend: 'Active now' },
          { label: 'Success Rate', value: '100%', icon: CheckCircle, color: 'text-green-500', trend: 'Last 24h' },
        ].map((stat, i) => (
          <GlassCard key={i} variant="flat" className="flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
               <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <Icon icon={stat.icon} className="h-6 w-6" />
                </div>
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
                <Typography variant="h4">Recent Analysis History</Typography>
                <Button variant="ghost" size="sm" onClick={() => navigate('/analysis')}>New Analysis</Button>
            </div>

            <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8 py-2">
                {recentAnalyses.length === 0 ? (
                    <div className="text-zinc-500 italic">No analysis history found. Start a new analysis to see it here.</div>
                ) : (
                    recentAnalyses.map((item) => (
                        <div key={item.id} className="relative">
                            <div className={`absolute -left-[39px] h-5 w-5 rounded-full border-4 border-black ${item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Icon icon={BrainCircuit} className="text-zinc-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <Typography variant="body" className="font-medium text-white line-clamp-1">{item.question}</Typography>
                                        <Typography variant="small" className="text-zinc-500">
                                            {new Date(item.createdAt).toLocaleDateString()} • {item.status}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[120px]">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Icon icon={ArrowRight} className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
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
                            <span className="text-white font-medium">{(totalDocs * 0.5).toFixed(1)} MB</span>
                        </div>
                         <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[15%]" />
                        </div>
                    </div>
                    <div className="text-right">
                         <span className="text-xs text-zinc-500 block">Total</span>
                         <span className="text-sm font-medium">Unlimited</span>
                    </div>
                </div>
            </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
