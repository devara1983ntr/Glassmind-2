import { useRoutes, Navigate } from 'react-router-dom';
import { MainLayout } from '@shared/layouts/MainLayout';
import { useAuthStore } from '@features/auth';
import { ToastContainer } from '@shared/ui/Toast';
import { ProtectedRoute } from './ProtectedRoute';
import { lazy, Suspense } from 'react';
import { LoadingOverlay } from '@shared/ui/LoadingOverlay';

// Lazy loaded pages
const LoginPage = lazy(() => import('@pages/login'));
const DashboardPage = lazy(() => import('@pages/dashboard'));
const UploadPage = lazy(() => import('@pages/upload'));
const AnalysisPage = lazy(() => import('@pages/analysis'));
const ReviewPage = lazy(() => import('@pages/review'));
const ExportPage = lazy(() => import('@pages/export'));
const SettingsPage = lazy(() => import('@pages/settings'));
const DocumentsPage = lazy(() => import('@pages/documents'));
const TermsPage = lazy(() => import('@pages/legal/TermsPage'));
const PrivacyPage = lazy(() => import('@pages/legal/PrivacyPage'));

export const AppRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const routes = useRoutes([
    {
      path: '/login',
      element: !isAuthenticated ? (
        <Suspense fallback={<LoadingOverlay />}>
            <LoginPage />
        </Suspense>
      ) : <Navigate to="/" />,
    },
    {
        path: '/terms',
        element: (
            <Suspense fallback={<LoadingOverlay />}>
                <TermsPage />
            </Suspense>
        )
    },
    {
        path: '/privacy',
        element: (
            <Suspense fallback={<LoadingOverlay />}>
                <PrivacyPage />
            </Suspense>
        )
    },
    {
      element: (
        <>
            <ProtectedRoute />
            <ToastContainer />
        </>
      ),
      children: [
        {
            element: <MainLayout />,
            children: [
                { path: '/', element: <Suspense fallback={<LoadingOverlay />}><DashboardPage /></Suspense> },
                { path: 'upload', element: <Suspense fallback={<LoadingOverlay />}><UploadPage /></Suspense> },
                { path: 'analysis', element: <Suspense fallback={<LoadingOverlay />}><AnalysisPage /></Suspense> },
                { path: 'review', element: <Suspense fallback={<LoadingOverlay />}><ReviewPage /></Suspense> },
                { path: 'export', element: <Suspense fallback={<LoadingOverlay />}><ExportPage /></Suspense> },
                { path: 'settings', element: <Suspense fallback={<LoadingOverlay />}><SettingsPage /></Suspense> },
                { path: 'documents', element: <Suspense fallback={<LoadingOverlay />}><DocumentsPage /></Suspense> },
            ]
        }
      ],
    },
    { path: '*', element: <Navigate to="/" /> },
  ]);

  return routes;
};
