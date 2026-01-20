import { Home, FileText, Settings, Upload, BarChart2 } from 'lucide-react';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@shared/lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Upload, label: 'Upload', href: '/upload' },
  { icon: BarChart2, label: 'Analysis', href: '/analysis' },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const NavigationDrawer = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl hidden md:block">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
            <Link key={item.href} to={item.href} className="block">
                <Button
                variant={isActive ? 'primary' : 'ghost'}
                className={cn(
                    "w-full justify-start gap-3",
                    isActive ? "bg-primary/10 text-primary hover:bg-primary/20 shadow-none border-0" : "text-zinc-400 hover:text-white"
                )}
                >
                <Icon icon={item.icon} />
                {item.label}
                </Button>
            </Link>
            )
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="rounded-lg bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-4 border border-white/10">
            <h4 className="font-semibold text-sm mb-1">Pro Plan</h4>
            <p className="text-xs text-zinc-400 mb-3">85% storage used</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%]" />
            </div>
        </div>
      </div>
    </aside>
  );
};
