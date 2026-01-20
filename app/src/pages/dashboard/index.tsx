import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Button } from '@shared/ui/Button';
import { Upload, FileText, Clock, CheckCircle } from 'lucide-react';
import { Icon } from '@shared/ui/Icon';

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h2">Dashboard</Typography>
          <Typography variant="muted">Welcome back, Demo User</Typography>
        </div>
        <Button>
          <Icon icon={Upload} className="mr-2" />
          New Upload
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Documents', value: '124', icon: FileText, color: 'text-blue-500' },
          { label: 'Processing', value: '3', icon: Clock, color: 'text-yellow-500' },
          { label: 'Completed', value: '118', icon: CheckCircle, color: 'text-green-500' },
          { label: 'Failed', value: '3', icon: FileText, color: 'text-red-500' },
        ].map((stat, i) => (
          <GlassCard key={i} variant="flat" className="flex items-center justify-between">
            <div>
              <Typography variant="small" className="text-zinc-400">{stat.label}</Typography>
              <Typography variant="h3" className="mt-1">{stat.value}</Typography>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <Icon icon={stat.icon} className="h-6 w-6" />
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="md:col-span-2">
            <Typography variant="h4" className="mb-4">Recent Activity</Typography>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                            <Icon icon={FileText} />
                        </div>
                        <div className="flex-1">
                            <Typography variant="body" className="mt-0 font-medium text-white">Physics_Exam_2024.pdf</Typography>
                            <Typography variant="small" className="text-zinc-500">Processed 2 hours ago</Typography>
                        </div>
                         <div className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-500 border border-green-500/20">
                            Completed
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>

        <GlassCard>
            <Typography variant="h4" className="mb-4">Quick Actions</Typography>
            <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                    <Icon icon={Upload} className="mr-2" /> Upload Files
                </Button>
                <Button variant="outline" className="w-full justify-start">
                    <Icon icon={FileText} className="mr-2" /> View Reports
                </Button>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default DashboardPage;
