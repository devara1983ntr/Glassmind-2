import { cn } from '@shared/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
}

export const Skeleton = ({ variant = 'text', className, ...props }: SkeletonProps) => {
  const styles = {
    text: 'h-4 w-full rounded',
    rectangular: 'h-full w-full rounded-md',
    circular: 'h-full w-full rounded-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-white/10',
        styles[variant],
        className
      )}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
    <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="h-12 w-12" />
        <div className="space-y-2 flex-1">
            <Skeleton variant="text" className="w-1/2" />
            <Skeleton variant="text" className="w-3/4 h-3" />
        </div>
    </div>
    <Skeleton variant="rectangular" className="h-24" />
    <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/4" />
        <Skeleton variant="text" className="w-1/4" />
    </div>
  </div>
);
