export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  language: string;
  timezone: string;
  notifications: {
    emailAnalysis: boolean;
    emailUpdates: boolean;
    desktop: boolean;
  };
}

export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string; // ISO string
  status: 'processing' | 'ready' | 'error';
  content?: string; // Base64 for mock
}

export interface Analysis {
  id: string;
  question: string;
  documentIds: string[];
  templateId?: string;
  result: string;
  createdAt: string;
  status: 'processing' | 'completed' | 'failed';
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}

export const STORAGE_KEYS = {
  DOCUMENTS: 'app_documents',
  ANALYSES: 'app_analyses',
  USER_SETTINGS: 'app_user_settings', // Stores User object
  NOTIFICATIONS: 'app_notifications',
  AUTH_TOKEN: 'app_auth_token', // Simple session marker
  THEME_PREFERENCE: 'app_theme',
  SIDEBAR_STATE: 'app_sidebar_collapsed'
};
