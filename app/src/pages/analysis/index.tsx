import { MarkingSchemeConfig, TemplateSelector, useAnalysisStore } from '@features/analysis';
import { Button } from '@shared/ui/Button';
import { Typography } from '@shared/ui/Typography';
import { Play } from 'lucide-react';
import { Icon } from '@shared/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '@shared/ui/Toast';

const AnalysisPage = () => {
  const navigate = useNavigate();
  const { questions, setQuestions, isGenerating, setGenerating, totalScore } = useAnalysisStore();
  const { addToast } = useToastStore();

  const handleGenerate = () => {
      if (!questions.trim()) {
          addToast('error', 'Please enter at least one question.');
          return;
      }

      if (totalScore !== 100) {
          addToast('warning', `Total marking points must equal 100 (Current: ${totalScore})`);
          return;
      }

      setGenerating(true);

      // Simulate generation delay
      setTimeout(() => {
          setGenerating(false);
          addToast('success', 'Analysis generated successfully!');
          navigate('/review');
      }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      <div className="space-y-6 overflow-y-auto pr-2">
        <div className="space-y-2">
          <Typography variant="h2">Configuration</Typography>
          <Typography variant="muted">Define how the AI should structure and format the answer.</Typography>
        </div>

        <section className="space-y-4">
            <Typography variant="h3">1. Input Questions</Typography>
            <textarea
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                placeholder="Paste your questions here or let the AI extract them from uploaded documents..."
                className="w-full h-40 rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
            />
        </section>

        <section className="space-y-4">
            <Typography variant="h3">2. Choose Style</Typography>
            <TemplateSelector />
        </section>

        <section className="space-y-4">
             <Typography variant="h3">3. Marking Scheme</Typography>
             <MarkingSchemeConfig />
        </section>

        <div className="pt-4 pb-8">
            <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleGenerate}
                isLoading={isGenerating}
                disabled={isGenerating || totalScore !== 100}
            >
                <Icon icon={Play} />
                {isGenerating ? 'Analyzing Content...' : 'Generate Analysis'}
            </Button>
        </div>
      </div>

      <div className="hidden lg:flex flex-col h-full bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-black/20">
            <Typography variant="small" className="uppercase tracking-wider text-zinc-500">Live Preview</Typography>
        </div>
        <div className="flex-1 p-8 overflow-y-auto space-y-8 opacity-60 pointer-events-none select-none">
            {/* Mock Preview Content */}
            <div className="space-y-4">
                <div className="h-8 w-3/4 bg-blue-500/20 rounded animate-pulse" />
                <div className="space-y-2">
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-5/6 bg-white/10 rounded" />
                </div>
            </div>
             <div className="space-y-4">
                <div className="h-6 w-1/2 bg-blue-400/20 rounded animate-pulse" />
                <div className="space-y-2">
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-11/12 bg-white/10 rounded" />
                    <div className="h-4 w-full bg-white/10 rounded" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
