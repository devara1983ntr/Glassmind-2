import * as React from 'react';
import { cn } from '@shared/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            'peer flex h-14 w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-4 pb-1 text-sm text-white shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            error && 'border-error focus-visible:ring-error',
            className
          )}
          placeholder={label || 'Input'}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            className={cn(
              'absolute left-4 top-1 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs pointer-events-none',
              error && 'text-error'
            )}
          >
            {label}
          </label>
        )}
        {error && (
          <span className="text-xs text-error mt-1 ml-1 absolute -bottom-5 left-0">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
