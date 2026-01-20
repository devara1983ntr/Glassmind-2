import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { GlassCard } from './GlassCard';
import { Typography } from './Typography';
import { Button } from './Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Icon } from './Icon';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
          <GlassCard variant="elevated" className="max-w-md w-full text-center space-y-6 p-8 border-red-500/20">
            <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                <Icon icon={AlertTriangle} className="h-8 w-8 text-red-500" />
            </div>
            <div>
                <Typography variant="h3">Something went wrong</Typography>
                <Typography variant="muted" className="mt-2">
                    We apologize for the inconvenience. The application has encountered an unexpected error.
                </Typography>
            </div>
            <div className="p-4 bg-red-950/30 rounded-lg border border-red-500/10 text-left overflow-auto max-h-32">
                <code className="text-xs text-red-200 font-mono">
                    {this.state.error?.message}
                </code>
            </div>
            <Button
                onClick={() => window.location.reload()}
                className="w-full gap-2"
                variant="outline"
            >
                <Icon icon={RefreshCw} />
                Reload Application
            </Button>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
