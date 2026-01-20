import type { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '@shared/lib/utils';

interface IconProps extends LucideProps {
  icon: LucideIcon;
}

export const Icon = ({ icon: IconComponent, className, ...props }: IconProps) => {
  return <IconComponent className={cn('h-5 w-5', className)} {...props} />;
};
