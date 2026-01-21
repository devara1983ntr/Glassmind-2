import { cn } from '@shared/lib/utils';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'flat' | 'elevated' | 'floating';
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}

export const GlassCard = ({
  variant = 'elevated',
  className,
  children,
  interactive = false,
  ...props
}: GlassCardProps) => {
  const variantStyles = {
    flat: 'glass-card-flat',
    elevated: 'glass-card-elevated',
    floating: 'glass-card-floating',
  };

  return (
    <motion.div
      className={cn(
        'glass-card-base relative overflow-hidden p-6',
        variantStyles[variant],
        interactive && "hover:shadow-elevation-mid hover:scale-[1.005] active:scale-[0.99] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
