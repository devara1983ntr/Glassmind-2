import { cn } from '@shared/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const Select = ({
  label,
  value,
  options,
  onChange,
  className,
  placeholder = 'Select an option',
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      {label && <label className="mb-2 block text-sm font-medium text-zinc-400">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 text-left text-sm text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-background',
          isOpen && 'ring-2 ring-primary ring-offset-2'
        )}
      >
        <span className={!selectedOption ? 'text-zinc-500' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Icon icon={ChevronDown} className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-white/10 bg-zinc-900/95 p-1 shadow-xl backdrop-blur-xl">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                'flex w-full items-center rounded-md px-3 py-2 text-sm text-white hover:bg-white/10',
                value === option.value && 'bg-primary/20 text-primary'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
