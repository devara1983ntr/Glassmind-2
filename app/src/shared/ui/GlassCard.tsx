import { cn } from '@shared/lib/utils';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'flat' | 'elevated' | 'glass';
  className?: string;
  children: React.ReactNode;
}

export const GlassCard = ({
  variant = 'glass',
  className,
  children,
  ...props
}: GlassCardProps) => {
  const variantStyles = {
    flat: 'bg-black/40 border border-white/5 shadow-none',
    elevated: 'bg-zinc-900/80 border border-white/10 shadow-elevation-mid',
    glass: 'bg-white/5 backdrop-blur-lg border border-white/10 shadow-elevation-low',
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-xl p-6',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
