import { useRoutes, Navigate } from 'react-router-dom';
import { MainLayout } from '@shared/layouts/MainLayout';
import LoginPage from '@pages/login';
import DashboardPage from '@pages/dashboard';
import UploadPage from '@pages/upload';
import AnalysisPage from '@pages/analysis';
import ReviewPage from '@pages/review';
import ExportPage from '@pages/export';
import { useAuthStore } from '@features/auth';
import { ToastContainer } from '@shared/ui/Toast';

export const AppRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const routes = useRoutes([
    {
      path: '/login',
      element: !isAuthenticated ? <LoginPage /> : <Navigate to="/" />,
    },
    {
      path: '/',
      element: isAuthenticated ? (
        <>
            <MainLayout />
            <ToastContainer />
        </>
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        { path: '/', element: <DashboardPage /> },
        { path: 'upload', element: <UploadPage /> },
        { path: 'analysis', element: <AnalysisPage /> },
        { path: 'review', element: <ReviewPage /> },
        { path: 'export', element: <ExportPage /> },
        { path: '*', element: <Navigate to="/" /> },
      ],
    },
  ]);

  return routes;
};
