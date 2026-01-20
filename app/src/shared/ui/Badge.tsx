import { cn } from '@shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/20 text-primary hover:bg-primary/30',
        secondary: 'border-transparent bg-secondary/20 text-secondary hover:bg-secondary/30',
        success: 'border-transparent bg-green-500/20 text-green-500 hover:bg-green-500/30',
        warning: 'border-transparent bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30',
        error: 'border-transparent bg-red-500/20 text-red-500 hover:bg-red-500/30',
        outline: 'text-zinc-400 border-white/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
};
