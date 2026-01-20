import { ExportOptions } from '@features/export';
import { Button } from '@shared/ui/Button';
import { Typography } from '@shared/ui/Typography';
import { Icon } from '@shared/ui/Icon';
import { ArrowLeft, Download, Mail, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToastStore } from '@shared/ui/Toast';

const ExportPage = () => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const { addToast } = useToastStore();

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
        setIsExporting(false);
        addToast('success', 'Document exported successfully!');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
         <Button variant="ghost" onClick={() => navigate('/review')} className="pl-0 gap-2 mb-4 hover:bg-transparent hover:text-white">
            <Icon icon={ArrowLeft} />
            Back to Review
        </Button>
        <Typography variant="h2">Export & Delivery</Typography>
        <Typography variant="muted">Choose your preferred format and delivery method.</Typography>
      </div>

      <section>
        <Typography variant="h4" className="mb-4">1. Select Format</Typography>
        <ExportOptions />
      </section>

      <section>
        <Typography variant="h4" className="mb-4">2. Delivery Method</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-6 flex-col gap-3 hover:border-primary hover:bg-primary/5">
                <Icon icon={Download} className="h-8 w-8" />
                <span>Direct Download</span>
            </Button>
            <Button variant="outline" className="h-auto p-6 flex-col gap-3 hover:border-primary hover:bg-primary/5">
                <Icon icon={Mail} className="h-8 w-8" />
                <span>Email Delivery</span>
            </Button>
             <Button variant="outline" className="h-auto p-6 flex-col gap-3 hover:border-primary hover:bg-primary/5">
                <Icon icon={Cloud} className="h-8 w-8" />
                <span>Save to Cloud</span>
            </Button>
        </div>
      </section>

      <div className="pt-8 border-t border-white/10 flex justify-end">
        <Button size="lg" className="w-full md:w-auto gap-2 min-w-[200px]" onClick={handleExport} isLoading={isExporting}>
            <Icon icon={Download} />
            Process Export
        </Button>
      </div>
    </div>
  );
};

export default ExportPage;
