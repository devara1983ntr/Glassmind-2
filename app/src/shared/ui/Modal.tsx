import { cn } from '@shared/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import { Icon } from './Icon';
import { Typography } from './Typography';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
}: ModalProps) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-zinc-900/95 p-6 shadow-elevation-high backdrop-blur-xl',
              className
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <Typography variant="h3">{title}</Typography>
                {description && (
                  <Typography variant="muted" className="mt-1">
                    {description}
                  </Typography>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon icon={X} />
              </Button>
            </div>

            <div className="mb-6">{children}</div>

            {footer && <div className="flex justify-end gap-2">{footer}</div>}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
