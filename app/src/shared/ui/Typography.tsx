import { cn } from '@shared/lib/utils';
import type { ElementType, HTMLAttributes } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'muted';
  as?: ElementType;
  children: React.ReactNode;
}

export const Typography = ({
  variant = 'body',
  as,
  className,
  children,
  ...props
}: TypographyProps) => {
  const styles = {
    h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white',
    h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-white',
    h3: 'scroll-m-20 text-2xl font-semibold tracking-tight text-white',
    h4: 'scroll-m-20 text-xl font-semibold tracking-tight text-white',
    body: 'leading-7 text-zinc-300',
    small: 'text-sm font-medium leading-none text-white',
    muted: 'text-sm text-zinc-400',
  };

  const Component = as || (variant.startsWith('h') ? (variant as ElementType) : 'p');

  return (
    <Component className={cn(styles[variant], className)} {...props}>
      {children}
    </Component>
  );
};
