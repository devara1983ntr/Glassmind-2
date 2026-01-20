import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    login({ id: '1', name: 'Demo User', email });
    setIsLoading(false);
    navigate('/');
  };

  return (
    <GlassCard variant="elevated" className="w-full max-w-md p-8 space-y-6">
      <div className="space-y-2 text-center">
        <Typography variant="h2">Welcome Back</Typography>
        <Typography variant="muted">Enter your credentials to access your account</Typography>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full mt-4" size="lg" isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-zinc-400">Don't have an account? </span>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover h-auto p-0 hover:bg-transparent">
          Sign up
        </Button>
      </div>
    </GlassCard>
  );
};
