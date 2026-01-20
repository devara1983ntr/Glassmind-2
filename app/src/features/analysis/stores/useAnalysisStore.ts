import { create } from 'zustand';

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
  setQuestions: (q: string) => void;
  setTemplate: (t: TemplateId) => void;
  setMarkingScheme: (scheme: MarkingScheme) => void;
  updateMarkingScheme: (key: keyof MarkingScheme, value: number) => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  questions: '',
  template: 'academic',
  markingScheme: {
    introduction: 10,
    body: 60,
    conclusion: 20,
    presentation: 10,
  },
  setQuestions: (q) => set({ questions: q }),
  setTemplate: (t) => set({ template: t }),
  setMarkingScheme: (scheme) => set({ markingScheme: scheme }),
  updateMarkingScheme: (key, value) =>
    set((state) => ({
      markingScheme: { ...state.markingScheme, [key]: value },
    })),
}));
