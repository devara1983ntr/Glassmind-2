import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { User, Settings, LogOut, CreditCard, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@features/auth';

export const UserMenu = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-4 top-16 w-64 z-50"
    >
      <GlassCard variant="elevated" className="p-2 shadow-2xl ring-1 ring-white/10">
        <div className="p-3 mb-2 border-b border-white/10">
            <Typography variant="body" className="font-medium text-white">Demo User</Typography>
            <Typography variant="muted" className="text-xs">demo@glassmind.ai</Typography>
        </div>
        <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2 h-9 px-3 text-sm" onClick={() => handleNavigate('/settings')}>
                <Icon icon={User} className="h-4 w-4" /> Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 h-9 px-3 text-sm" onClick={() => handleNavigate('/settings')}>
                <Icon icon={Settings} className="h-4 w-4" /> Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 h-9 px-3 text-sm" onClick={() => handleNavigate('/settings')}>
                <Icon icon={CreditCard} className="h-4 w-4" /> Billing
            </Button>
             <Button variant="ghost" className="w-full justify-start gap-2 h-9 px-3 text-sm">
                <Icon icon={HelpCircle} className="h-4 w-4" /> Help Center
            </Button>
        </div>
        <div className="mt-2 pt-2 border-t border-white/10">
            <Button variant="ghost" className="w-full justify-start gap-2 h-9 px-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={handleLogout}>
                <Icon icon={LogOut} className="h-4 w-4" /> Sign Out
            </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};
