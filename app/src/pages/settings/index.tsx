import { useState, useEffect } from 'react';
import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Tabs } from '@shared/ui/Tabs';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Switch } from '@shared/ui/Switch';
import { Select } from '@shared/ui/Select';
import { Avatar } from '@shared/ui/Avatar';
import { Icon } from '@shared/ui/Icon';
import { User, Bell, Palette, Users, Shield, Save } from 'lucide-react';
import { useToastStore } from '@shared/ui/Toast';
import { useUser, useUpdateProfile } from '@shared/hooks/api';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { addToast } = useToastStore();
  const { data: user, isLoading: userLoading } = useUser();
  const updateProfile = useUpdateProfile();

  // Local state for form fields
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      language: 'en',
      timezone: 'utc',
      notifications: {
          emailAnalysis: true,
          emailUpdates: true,
          desktop: true
      }
  });

  // Sync user data to local state when loaded
  useEffect(() => {
      if (user) {
          setFormData({
              name: user.name,
              email: user.email,
              language: user.preferences?.language || 'en',
              timezone: user.preferences?.timezone || 'utc',
              notifications: {
                  emailAnalysis: user.preferences?.notifications?.emailAnalysis ?? true,
                  emailUpdates: user.preferences?.notifications?.emailUpdates ?? true,
                  desktop: user.preferences?.notifications?.desktop ?? true
              }
          });
      }
  }, [user]);

  const handleSave = async () => {
      if (!user) return;

      try {
          await updateProfile.mutateAsync({
              name: formData.name,
              email: formData.email,
              preferences: {
                  ...user.preferences,
                  language: formData.language,
                  timezone: formData.timezone,
                  notifications: formData.notifications
              }
          });
          addToast('success', 'Settings saved successfully');
      } catch (error) {
          addToast('error', 'Failed to save settings');
      }
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'templates', label: 'Templates' },
    { id: 'team', label: 'Team' },
  ];

  if (userLoading) return <div className="p-20 text-center">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
            <Typography variant="h2">Settings</Typography>
            <Typography variant="muted">Manage your account and preferences</Typography>
        </div>
        <Button onClick={handleSave} isLoading={updateProfile.isPending} className="gap-2">
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
                    <Avatar size="lg" src={user?.avatar} fallback={user?.name?.[0] || 'U'} />
                    <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <Input
                        label="Email Address"
                        value={formData.email}
                        type="email"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <Select
                        label="Language"
                        value={formData.language}
                        onChange={(val) => setFormData({...formData, language: val})}
                        options={[
                            { label: 'English', value: 'en' },
                            { label: 'Spanish', value: 'es' },
                            { label: 'French', value: 'fr' }
                        ]}
                    />
                    <Select
                        label="Timezone"
                        value={formData.timezone}
                        onChange={(val) => setFormData({...formData, timezone: val})}
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
                     <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-300">Email me when analysis is complete</span>
                        <Switch
                            checked={formData.notifications.emailAnalysis}
                            onCheckedChange={(c) => setFormData({
                                ...formData,
                                notifications: { ...formData.notifications, emailAnalysis: c }
                            })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-300">Email me about product updates</span>
                         <Switch
                            checked={formData.notifications.emailUpdates}
                            onCheckedChange={(c) => setFormData({
                                ...formData,
                                notifications: { ...formData.notifications, emailUpdates: c }
                            })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-300">Show desktop notifications</span>
                         <Switch
                            checked={formData.notifications.desktop}
                            onCheckedChange={(c) => setFormData({
                                ...formData,
                                notifications: { ...formData.notifications, desktop: c }
                            })}
                        />
                    </div>
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
                             <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-error">
                                 <Icon icon={Users} className="h-4 w-4" />
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
