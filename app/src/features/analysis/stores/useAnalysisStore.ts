import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProcessingEvent, FileContext } from '@shared/engine/types';
import { runAnalysis } from '@shared/engine/pipeline/Orchestrator';

export type TemplateId = 'academic' | 'minimal' | 'detailed' | 'summary';

export interface MarkingScheme {
  introduction: number;
  body: number;
  conclusion: number;
  presentation: number;
}

interface AnalysisStore {
  questions: string;
  template: TemplateId;
  markingScheme: MarkingScheme;
  totalScore: number;
  isGenerating: boolean;
  processingSteps: ProcessingEvent[];
  setQuestions: (q: string) => void;
  setTemplate: (t: TemplateId) => void;
  setMarkingScheme: (scheme: MarkingScheme) => void;
  updateMarkingScheme: (key: keyof MarkingScheme, value: number) => void;
  startAnalysis: (files: File[]) => void;
  resetAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisStore>()(
  persist(
    (set, get) => ({
      questions: '',
      template: 'academic',
      markingScheme: {
        introduction: 10,
        body: 60,
        conclusion: 20,
        presentation: 10,
      },
      totalScore: 100,
      isGenerating: false,
      processingSteps: [],

      setQuestions: (q) => set({ questions: q }),
      setTemplate: (t) => set({ template: t }),
      setMarkingScheme: (scheme) => {
          const total = Object.values(scheme).reduce((a, b) => a + b, 0);
          set({ markingScheme: scheme, totalScore: total });
      },
      updateMarkingScheme: (key, value) => {
        const currentScheme = get().markingScheme;
        const newScheme = { ...currentScheme, [key]: value };
        const total = Object.values(newScheme).reduce((a, b) => a + b, 0);
        set({ markingScheme: newScheme, totalScore: total });
      },

      startAnalysis: (files: File[]) => {
          set({ isGenerating: true, processingSteps: [] });

          const fileContexts: FileContext[] = files.map(f => ({
              id: Math.random().toString(36),
              name: f.name,
              size: f.size,
              type: f.type
          }));

          const orchestrator = runAnalysis(fileContexts);

          orchestrator.on('progress', (event: ProcessingEvent) => {
              set((state) => ({
                  processingSteps: [...state.processingSteps, event]
              }));
          });

          orchestrator.on('step-completed', (event: ProcessingEvent) => {
               set((state) => ({
                  processingSteps: [...state.processingSteps, event]
              }));
          });

          orchestrator.on('all-completed', () => {
              // Wait a moment before finishing to show 100%
              setTimeout(() => {
                  set({ isGenerating: false });
              }, 1000);
          });
      },

      resetAnalysis: () => set({ isGenerating: false, processingSteps: [] })
    }),
    {
      name: 'analysis-storage',
      partialize: (state) => ({
          questions: state.questions,
          template: state.template,
          markingScheme: state.markingScheme
      }),
    }
  )
);
