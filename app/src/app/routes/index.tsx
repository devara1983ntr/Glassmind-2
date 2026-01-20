import { useRoutes, Navigate } from 'react-router-dom';
import { MainLayout } from '@shared/layouts/MainLayout';
import LoginPage from '@pages/login';
import DashboardPage from '@pages/dashboard';
import { useAuthStore } from '@features/auth';

export const AppRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const routes = useRoutes([
    {
      path: '/login',
      element: !isAuthenticated ? <LoginPage /> : <Navigate to="/" />,
    },
    {
      path: '/',
      element: isAuthenticated ? <MainLayout /> : <Navigate to="/login" />,
      children: [
        { path: '/', element: <DashboardPage /> },
        { path: '*', element: <Navigate to="/" /> },
      ],
    },
  ]);

  return routes;
};
