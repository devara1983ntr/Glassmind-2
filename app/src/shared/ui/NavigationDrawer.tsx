import { Home, FileText, Settings, Upload, BarChart2, CheckCircle } from 'lucide-react';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@shared/lib/utils';
import { useUIStore } from '@shared/stores/useUIStore';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Upload, label: 'Upload', href: '/upload' },
  { icon: BarChart2, label: 'Analysis', href: '/analysis' },
  { icon: CheckCircle, label: 'Review', href: '/review' },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const NavigationDrawer = () => {
  const location = useLocation();
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  // Close menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const NavContent = () => (
    <nav className="p-4 space-y-2">
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.href) && (item.href !== '/' || location.pathname === '/');
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
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Persistent Drawer */}
      <aside className="hidden lg:block fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl">
        <NavContent />
      </aside>

      {/* Mobile Overlay Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 z-[60] w-64 bg-[#0a0a0a] border-r border-white/10 lg:hidden shadow-2xl"
            >
               <div className="h-16 flex items-center px-6 border-b border-white/5">
                   <div className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Glassmind
                   </div>
               </div>
               <div className="h-[calc(100vh-4rem)] overflow-y-auto">
                    <NavContent />
               </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
