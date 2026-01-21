import { useState } from 'react';
import { useAuthStore } from '@features/auth';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Icon } from '@shared/ui/Icon';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useToastStore } from '@shared/ui/Toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const { login, isLoading } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
        addToast('error', 'Please fill in all fields');
        return;
    }

    try {
      await login(email);
      addToast('success', 'Welcome back!');
      navigate('/');
    } catch (error) {
      addToast('error', (error as Error).message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 animate-pulse" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md p-6">
        <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary mb-4 shadow-lg shadow-primary/20">
                <Icon icon={Mail} className="h-8 w-8 text-white" />
            </div>
            <Typography variant="h1" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Glassmind
            </Typography>
            <Typography variant="muted" className="mt-2 text-lg">
                Transform Academic Content into Professional Answers
            </Typography>
        </div>

        <GlassCard variant="elevated" className="p-8 backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="w-full gap-2 hover:bg-white/5 border-white/10">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                </Button>
                 <Button variant="outline" type="button" className="w-full gap-2 hover:bg-white/5 border-white/10">
                    <svg className="h-5 w-5" viewBox="0 0 23 23">
                        <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                        <path fill="#f35325" d="M1 1h10v10H1z"/>
                        <path fill="#81bc06" d="M12 1h10v10H12z"/>
                        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                        <path fill="#ffba08" d="M12 12h10v10H12z"/>
                    </svg>
                    Microsoft
                </Button>
             </div>

             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-zinc-500">Or continue with email</span>
                </div>
             </div>

            <div className="space-y-4">
                <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/20"
                />
                <div className="relative">
                    <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-black/20 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-4 text-zinc-400 hover:text-white"
                    >
                        <Icon icon={showPassword ? EyeOff : Eye} className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-white">
                    <input type="checkbox" className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary" />
                    Remember me
                </label>
                <a href="#" className="text-primary hover:text-primary-hover hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full h-12 text-base shadow-lg shadow-primary/25" isLoading={isLoading}>
              Sign In
            </Button>
          </form>
        </GlassCard>

        <div className="mt-6 text-center space-y-4">
             <div>
                <Typography variant="muted">
                    {isRegistering ? "Already have an account?" : "New to the platform?"}
                </Typography>
                <Button
                    variant="ghost"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-white font-semibold hover:bg-transparent p-0 ml-2 h-auto"
                >
                    {isRegistering ? "Sign In" : "Create your account"}
                </Button>
             </div>

             <div className="flex justify-center gap-4 text-xs text-zinc-500">
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <span>•</span>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
             </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
