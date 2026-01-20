import { cn } from '@shared/lib/utils';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Switch = ({ checked, onCheckedChange, label, className }: SwitchProps) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background',
          checked ? 'bg-primary' : 'bg-white/10'
        )}
      >
        <span
          className={cn(
            'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
      {label && <label className="text-sm font-medium text-white cursor-pointer" onClick={() => onCheckedChange(!checked)}>{label}</label>}
    </div>
  );
};
