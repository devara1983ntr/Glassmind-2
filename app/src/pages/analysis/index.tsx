import { MarkingSchemeConfig, TemplateSelector, useAnalysisStore } from '@features/analysis';
import { Button } from '@shared/ui/Button';
import { Typography } from '@shared/ui/Typography';
import { Play, Circle, BrainCircuit, Scan, FileText, Share2, Check } from 'lucide-react';
import { Icon } from '@shared/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '@shared/ui/Toast';
import { useDocuments } from '@shared/hooks/api';
import { useEffect, useRef } from 'react';
import { cn } from '@shared/lib/utils';

const AnalysisPage = () => {
  const navigate = useNavigate();
  const {
      questions,
      setQuestions,
      isGenerating,
      startAnalysis,
      totalScore,
      processingSteps,
      selectedDocumentIds,
      setSelectedDocumentIds
  } = useAnalysisStore();

  const { data: documents, isLoading: docsLoading } = useDocuments();
  const { addToast } = useToastStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  }, [processingSteps]);

  useEffect(() => {
      if (!isGenerating && processingSteps.length > 0) {
          const lastStep = processingSteps[processingSteps.length - 1];
          if (lastStep.agent === 'Semantic Analysis Agent' && lastStep.status === 'completed') {
               addToast('success', 'Analysis generated successfully!');
               setTimeout(() => navigate('/review'), 1000);
          }
      }
  }, [isGenerating, processingSteps, navigate, addToast]);

  const handleGenerate = () => {
      if (selectedDocumentIds.length === 0) {
          addToast('error', 'Please select at least one document.');
          return;
      }

      if (!questions.trim()) {
          addToast('error', 'Please enter at least one question.');
          return;
      }

      if (totalScore !== 100) {
          addToast('warning', `Total marking points must equal 100 (Current: ${totalScore})`);
          return;
      }

      startAnalysis();
  };

  const toggleDocument = (id: string) => {
      if (selectedDocumentIds.includes(id)) {
          setSelectedDocumentIds(selectedDocumentIds.filter(d => d !== id));
      } else {
          setSelectedDocumentIds([...selectedDocumentIds, id]);
      }
  };

  const getAgentIcon = (agentName: string) => {
      if (agentName.includes('Ingestion')) return FileText;
      if (agentName.includes('OCR')) return Scan;
      if (agentName.includes('Semantic')) return BrainCircuit;
      return Circle;
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar pb-20">
        <div className="space-y-2">
          <Typography variant="h2">Configuration</Typography>
          <Typography variant="muted">Define how the AI should structure and format the answer.</Typography>
        </div>

        <section className="space-y-4">
             <div className="flex justify-between items-center">
                <Typography variant="h3">1. Select Documents</Typography>
                <Typography variant="small" className="text-zinc-500">{selectedDocumentIds.length} selected</Typography>
             </div>

             {docsLoading ? (
                 <div className="h-20 flex items-center justify-center text-zinc-500">Loading documents...</div>
             ) : !documents || documents.length === 0 ? (
                 <div className="p-4 rounded-lg border border-dashed border-white/20 text-center text-zinc-500">
                     No documents found. <Button variant="ghost" className="text-primary underline" onClick={() => navigate('/upload')}>Upload now</Button>
                 </div>
             ) : (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                     {documents.map(doc => {
                         const isSelected = selectedDocumentIds.includes(doc.id);
                         return (
                             <div
                                key={doc.id}
                                onClick={() => toggleDocument(doc.id)}
                                className={cn(
                                    "p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between",
                                    isSelected
                                        ? "bg-primary/10 border-primary/50 text-white"
                                        : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                                )}
                             >
                                 <div className="flex items-center gap-3 overflow-hidden">
                                     <Icon icon={FileText} className={cn("h-4 w-4 shrink-0", isSelected ? "text-primary" : "text-zinc-500")} />
                                     <span className="truncate text-sm font-medium">{doc.name}</span>
                                 </div>
                                 {isSelected && <Icon icon={Check} className="h-4 w-4 text-primary shrink-0" />}
                             </div>
                         )
                     })}
                 </div>
             )}
        </section>

        <section className="space-y-4">
            <Typography variant="h3">2. Input Questions</Typography>
            <textarea
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                placeholder="What would you like to know about these documents?"
                className="w-full h-32 rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
            />
        </section>

        <section className="space-y-4">
            <Typography variant="h3">3. Choose Style</Typography>
            <TemplateSelector />
        </section>

        <section className="space-y-4">
             <Typography variant="h3">4. Marking Scheme</Typography>
             <MarkingSchemeConfig />
        </section>

        <div className="pt-4">
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

      <div className="hidden lg:flex flex-col h-full bg-black/40 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
            <Typography variant="small" className="uppercase tracking-wider text-zinc-400 font-semibold">
                Processing Log
            </Typography>
            {isGenerating && (
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-green-500 font-mono">LIVE</span>
                </div>
            )}
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-2 font-mono text-sm" ref={scrollRef}>
            {processingSteps.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
                    <Icon icon={BrainCircuit} className="h-16 w-16 opacity-20" />
                    <p>Ready to process documents...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {processingSteps.map((step, index) => (
                        <div key={index} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "mt-0.5 h-2 w-2 rounded-full shrink-0",
                                    step.status === 'processing' ? "bg-blue-500 animate-pulse" : "bg-green-500"
                                )} />
                                <div className="space-y-1 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-300 font-medium flex items-center gap-2">
                                            <Icon icon={getAgentIcon(step.agent)} className="h-3 w-3" />
                                            {step.agent}
                                        </span>
                                        <span className="text-zinc-500 text-xs">{step.progress}%</span>
                                    </div>
                                    <p className="text-zinc-400">{step.message}</p>

                                    {/* Visualizations based on step data */}
                                    {step.data?.graph && (
                                        <div className="mt-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                                            <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs uppercase tracking-wide">
                                                <Icon icon={Share2} className="h-3 w-3" />
                                                Knowledge Graph Detected
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {step.data.graph.nodes.map((node: any) => (
                                                    <span key={node.id} className="px-2 py-1 rounded bg-blue-500/20 text-blue-200 text-xs border border-blue-500/30">
                                                        {node.label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {step.data?.extractedText && (
                                         <div className="mt-2 p-3 rounded bg-zinc-900 border border-white/5 text-xs text-zinc-500 truncate font-sans">
                                            "{step.data.extractedText.substring(0, 60)}..."
                                         </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
