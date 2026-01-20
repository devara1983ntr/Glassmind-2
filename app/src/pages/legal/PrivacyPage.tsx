import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-0">
            <Icon icon={ArrowLeft} /> Back
        </Button>

        <GlassCard variant="flat" className="space-y-6 p-12">
            <Typography variant="h1">Privacy Policy</Typography>
            <Typography variant="muted">Last updated: March 15, 2026</Typography>

            <div className="space-y-4 text-zinc-300">
                <Typography variant="h3">1. Information Collection</Typography>
                <p>We collect information you provide directly to us, such as when you create an account, upload documents, or request support.</p>

                <Typography variant="h3">2. Use of Information</Typography>
                <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>

                <Typography variant="h3">3. Data Security</Typography>
                <p>We implement reasonable security measures to protect your personal information from unauthorized access and disclosure.</p>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default PrivacyPage;
