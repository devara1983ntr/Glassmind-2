import { useState } from 'react';
import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Tabs } from '@shared/ui/Tabs';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Switch } from '@shared/ui/Switch';
import { Select } from '@shared/ui/Select';
import { Avatar } from '@shared/ui/Avatar';
import { Badge } from '@shared/ui/Badge';
import { Icon } from '@shared/ui/Icon';
import { User, Bell, Palette, CreditCard, Users, Shield, Save } from 'lucide-react';
import { useToastStore } from '@shared/ui/Toast';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { addToast } = useToastStore();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          addToast('success', 'Settings saved successfully');
      }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'templates', label: 'Templates' },
    { id: 'billing', label: 'Billing' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
            <Typography variant="h2">Settings</Typography>
            <Typography variant="muted">Manage your account and preferences</Typography>
        </div>
        <Button onClick={handleSave} isLoading={loading} className="gap-2">
            <Icon icon={Save} />
            Save Changes
        </Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'profile' && (
        <div className="space-y-6">
            <GlassCard variant="flat" className="space-y-6">
                <Typography variant="h4" className="flex items-center gap-2">
                    <Icon icon={User} className="text-primary" />
                    Personal Information
                </Typography>
                <div className="flex items-center gap-6">
                    <Avatar size="lg" src="" fallback="DU" />
                    <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Full Name" defaultValue="Demo User" />
                    <Input label="Email Address" defaultValue="demo@glassmind.ai" type="email" />
                    <Select
                        label="Language"
                        value="en"
                        onChange={() => {}}
                        options={[
                            { label: 'English', value: 'en' },
                            { label: 'Spanish', value: 'es' },
                            { label: 'French', value: 'fr' }
                        ]}
                    />
                    <Select
                        label="Timezone"
                        value="utc"
                        onChange={() => {}}
                        options={[
                            { label: 'UTC (GMT+0)', value: 'utc' },
                            { label: 'EST (GMT-5)', value: 'est' },
                            { label: 'PST (GMT-8)', value: 'pst' }
                        ]}
                    />
                </div>
            </GlassCard>

            <GlassCard variant="flat" className="space-y-6">
                 <Typography variant="h4" className="flex items-center gap-2">
                    <Icon icon={Shield} className="text-green-500" />
                    Security
                </Typography>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                        <div>
                            <Typography variant="body" className="font-medium text-white">Two-Factor Authentication</Typography>
                            <Typography variant="small" className="text-zinc-500">Add an extra layer of security to your account</Typography>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                    </div>
                     <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                        <div>
                            <Typography variant="body" className="font-medium text-white">Password</Typography>
                            <Typography variant="small" className="text-zinc-500">Last changed 3 months ago</Typography>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                    </div>
                </div>
            </GlassCard>
        </div>
      )}

       {activeTab === 'preferences' && (
        <GlassCard variant="flat" className="space-y-8">
             <div>
                <Typography variant="h4" className="mb-4 flex items-center gap-2">
                    <Icon icon={Bell} className="text-yellow-500" />
                    Notifications
                </Typography>
                <div className="space-y-4">
                    {[
                        'Email me when analysis is complete',
                        'Email me about product updates',
                        'Show desktop notifications'
                    ].map((label, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="text-sm text-zinc-300">{label}</span>
                            <Switch checked={true} onCheckedChange={() => {}} />
                        </div>
                    ))}
                </div>
             </div>

             <div className="border-t border-white/10 pt-8">
                 <Typography variant="h4" className="mb-4 flex items-center gap-2">
                    <Icon icon={Palette} className="text-purple-500" />
                    Appearance
                </Typography>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Select
                        label="Theme"
                        value="dark"
                        onChange={() => {}}
                        options={[{ label: 'Liquid Glass (Dark)', value: 'dark' }]}
                    />
                 </div>
             </div>
        </GlassCard>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-6">
            <GlassCard variant="elevated" className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-primary/20">
                <div className="flex justify-between items-start">
                    <div>
                        <Badge variant="default" className="mb-2">Pro Plan</Badge>
                        <Typography variant="h3">$29.00 / month</Typography>
                        <Typography variant="muted">Next billing date: March 1, 2026</Typography>
                    </div>
                    <Button>Manage Subscription</Button>
                </div>
                <div className="mt-8 space-y-2">
                    <div className="flex justify-between text-sm">
                         <span>Documents Processed</span>
                         <span>850 / 1000</span>
                    </div>
                    <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%]" />
                    </div>
                </div>
            </GlassCard>

            <GlassCard variant="flat">
                <Typography variant="h4" className="mb-4 flex items-center gap-2">
                    <Icon icon={CreditCard} className="text-zinc-400" />
                    Payment Method
                </Typography>
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
                            <span className="text-black font-bold text-xs">VISA</span>
                        </div>
                        <div>
                             <Typography variant="body" className="font-medium text-white">•••• 4242</Typography>
                             <Typography variant="small" className="text-zinc-500">Expires 12/28</Typography>
                        </div>
                    </div>
                     <Button variant="ghost" size="sm">Edit</Button>
                </div>
            </GlassCard>
        </div>
      )}

      {activeTab === 'team' && (
         <GlassCard variant="flat">
             <div className="flex justify-between items-center mb-6">
                <Typography variant="h4" className="flex items-center gap-2">
                    <Icon icon={Users} className="text-blue-400" />
                    Team Members
                </Typography>
                <Button size="sm" variant="outline">Invite Member</Button>
             </div>

             <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                     <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                         <div className="flex items-center gap-3">
                             <Avatar fallback={`U${i}`} />
                             <div>
                                 <Typography variant="body" className="font-medium text-white">Team Member {i}</Typography>
                                 <Typography variant="small" className="text-zinc-500">member{i}@glassmind.ai</Typography>
                             </div>
                         </div>
                         <div className="flex items-center gap-4">
                             <Badge variant="secondary">Editor</Badge>
                             <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-error">
                                 <Icon icon={Users} className="h-4 w-4" />
                                 {/* Using Users icon as a placeholder for trash/remove since X was commonly used */}
                             </Button>
                         </div>
                     </div>
                 ))}
             </div>
         </GlassCard>
      )}
    </div>
  );
};

export default SettingsPage;
