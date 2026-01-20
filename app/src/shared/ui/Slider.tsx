import { cn } from '@shared/lib/utils';

interface SliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
}

export const Slider = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className,
}: SliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-zinc-400">{label}</label>
            <span className="text-sm font-medium text-white">{value}</span>
        </div>
      )}
      <div className="relative flex h-5 w-full items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="peer absolute inset-0 z-20 w-full opacity-0 cursor-pointer"
        />
        <div className="relative h-1.5 w-full rounded-full bg-white/10">
          <div
            className="absolute h-full rounded-full bg-primary transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className="absolute h-4 w-4 rounded-full border border-primary bg-background ring-2 ring-primary transition-all duration-150 peer-focus-visible:ring-4"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
};
