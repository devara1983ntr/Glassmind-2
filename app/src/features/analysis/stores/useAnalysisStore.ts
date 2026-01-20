import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  setQuestions: (q: string) => void;
  setTemplate: (t: TemplateId) => void;
  setMarkingScheme: (scheme: MarkingScheme) => void;
  updateMarkingScheme: (key: keyof MarkingScheme, value: number) => void;
  setGenerating: (status: boolean) => void;
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
      setGenerating: (status) => set({ isGenerating: status }),
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
