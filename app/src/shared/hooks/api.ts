import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, documentService, analysisService, notificationService } from '../api/storage/services';

// Auth Hooks
export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: authService.getCurrentUser,
    staleTime: Infinity, // User data rarely changes automatically
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
    },
  });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.updateProfile,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['user'], updatedUser);
        }
    });
};

// Document Hooks
export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: documentService.getAll,
  });
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: documentService.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: documentService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};

// Analysis Hooks
export const useAnalysisHistory = () => {
  return useQuery({
    queryKey: ['analysis'],
    queryFn: analysisService.getAll,
    refetchInterval: 5000, // Poll for updates (mocking socket/push)
  });
};

export const useCreateAnalysis = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ question, docIds }: { question: string; docIds: string[] }) =>
      analysisService.create(question, docIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis'] });
    },
  });
};

// Notification Hooks
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationService.getAll,
    refetchInterval: 10000,
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: notificationService.markAllAsRead,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      },
    });
  };

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: notificationService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      },
    });
  };
