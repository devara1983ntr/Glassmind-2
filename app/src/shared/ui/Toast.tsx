import { cn } from '@shared/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { create } from 'zustand';
import { Icon } from './Icon';

export type ToastType = 'success' | 'warning' | 'error';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (type, message) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const styles = {
  success: 'bg-green-500/10 border-green-500/20 text-green-500',
  warning: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
  error: 'bg-red-500/10 border-red-500/20 text-red-500',
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              'pointer-events-auto flex items-center gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-md',
              styles[toast.type]
            )}
          >
            <Icon icon={icons[toast.type]} className="h-5 w-5" />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Icon icon={X} className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
