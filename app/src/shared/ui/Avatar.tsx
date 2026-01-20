import { cn } from '@shared/lib/utils';
import { User } from 'lucide-react';
import { Icon } from './Icon';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({ src, alt, fallback, size = 'md', className }: AvatarProps) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
  };

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-white/10 items-center justify-center',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="font-medium text-white/80">
          {fallback || <Icon icon={User} className="h-1/2 w-1/2" />}
        </span>
      )}
    </div>
  );
};
