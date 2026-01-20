import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-0">
            <Icon icon={ArrowLeft} /> Back
        </Button>

        <GlassCard variant="flat" className="space-y-6 p-12">
            <Typography variant="h1">Terms of Service</Typography>
            <Typography variant="muted">Last updated: March 15, 2026</Typography>

            <div className="space-y-4 text-zinc-300">
                <Typography variant="h3">1. Acceptance of Terms</Typography>
                <p>By accessing and using Glassmind, you accept and agree to be bound by the terms and provision of this agreement.</p>

                <Typography variant="h3">2. Description of Service</Typography>
                <p>Glassmind provides AI-powered academic content generation and analysis tools. We reserve the right to modify, suspend, or discontinue the service at any time.</p>

                <Typography variant="h3">3. User Conduct</Typography>
                <p>You agree to use the service only for lawful purposes. You are responsible for all content generated using your account.</p>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default TermsPage;
