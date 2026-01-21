import { AppBar } from '@shared/ui/AppBar';
import { NavigationDrawer } from '@shared/ui/NavigationDrawer';
import { Breadcrumbs } from '@shared/ui/Breadcrumbs';
import { Stepper } from '@shared/ui/Stepper';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@features/auth';
import { LoadingOverlay } from '@shared/ui/LoadingOverlay';

const workflowSteps = [
  { id: 1, label: 'Upload' },
  { id: 2, label: 'Analysis' },
  { id: 3, label: 'Review' },
  { id: 4, label: 'Export' },
];

const workflowPaths = ['/upload', '/analysis', '/review', '/export'];

export const MainLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isLoading = useAuthStore((state) => state.isLoading);

  const isWorkflowPage = workflowPaths.includes(currentPath);

  const getCurrentStepIndex = () => {
    return workflowPaths.indexOf(currentPath);
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <AppBar />
      <div className="flex">
        <NavigationDrawer />
        <main className="flex-1 p-6 lg:ml-64 transition-all duration-300 ease-in-out">
           <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
              <Breadcrumbs />
              {isWorkflowPage && (
                 <div className="w-full sm:w-64">
                     <Stepper steps={workflowSteps} currentStep={getCurrentStepIndex()} />
                 </div>
              )}
           </div>
           <Outlet />
        </main>
      </div>
      {isLoading && <LoadingOverlay />}
    </div>
  );
};
