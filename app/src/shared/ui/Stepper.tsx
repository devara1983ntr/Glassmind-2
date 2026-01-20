import { cn } from '@shared/lib/utils';
import { Check } from 'lucide-react';
import { Icon } from './Icon';

interface Step {
  id: number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full bg-white/10 -translate-y-1/2" />
        <div
          className="absolute left-0 top-1/2 -z-10 h-0.5 bg-primary -translate-y-1/2 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300',
                  isCompleted
                    ? 'border-primary bg-primary text-white'
                    : isCurrent
                    ? 'border-primary bg-background text-primary'
                    : 'border-white/20 bg-background text-zinc-500'
                )}
              >
                {isCompleted ? <Icon icon={Check} className="h-4 w-4" /> : step.id}
              </div>
              <span
                className={cn(
                  'text-xs font-medium absolute -bottom-6 w-24 text-center transition-colors',
                  isCurrent ? 'text-white' : 'text-zinc-500'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
