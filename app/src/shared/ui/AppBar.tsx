import { Search, Bell, User, Menu } from 'lucide-react';
import { Icon } from '@shared/ui/Icon';
import { Button } from '@shared/ui/Button';
import { useState, useRef, useEffect } from 'react';
import { NotificationPanel } from '@features/notifications/components/NotificationPanel';
import { UserMenu } from '@features/user/components/UserMenu';
import { AnimatePresence } from 'framer-motion';

export const AppBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
            setShowNotifications(false);
        }
        if (userRef.current && !userRef.current.contains(event.target as Node)) {
            setShowUserMenu(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
            <Icon icon={Menu} />
        </Button>
         <div className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Glassmind
         </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
           <input
             type="text"
             placeholder="Search documents..."
             className="w-full h-10 rounded-lg bg-white/5 border border-white/10 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-zinc-500"
           />
           <Icon icon={Search} className="absolute left-3 top-2.5 text-zinc-400 h-5 w-5" />
      </div>

      <div className="flex items-center gap-2 relative">
        <div ref={notifRef} className="relative">
             <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(!showNotifications)}>
                <Icon icon={Bell} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-error" />
            </Button>
            <AnimatePresence>
                {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
            </AnimatePresence>
        </div>

        <div ref={userRef} className="relative">
            <Button variant="ghost" size="icon" onClick={() => setShowUserMenu(!showUserMenu)}>
                <Icon icon={User} />
            </Button>
            <AnimatePresence>
                {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
            </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
