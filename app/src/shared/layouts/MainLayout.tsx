import { AppBar } from '@shared/ui/AppBar';
import { NavigationDrawer } from '@shared/ui/NavigationDrawer';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <AppBar />
      <div className="flex">
        <NavigationDrawer />
        <main className="flex-1 p-6 md:ml-64 transition-all duration-300 ease-in-out">
           <Outlet />
        </main>
      </div>
    </div>
  );
};
