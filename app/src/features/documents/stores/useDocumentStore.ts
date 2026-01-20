import { create } from 'zustand';

export interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
}

interface DocumentStore {
  files: FileItem[];
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  clearFiles: () => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  files: [],
  addFiles: (newFiles) => {
    const fileItems = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: 'uploading' as const,
    }));

    set((state) => ({ files: [...state.files, ...fileItems] }));

    // Simulate upload
    fileItems.forEach((item) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          set((state) => ({
            files: state.files.map((f) =>
              f.id === item.id ? { ...f, progress: 100, status: 'completed' } : f
            ),
          }));
        } else {
            set((state) => ({
                files: state.files.map((f) =>
                  f.id === item.id ? { ...f, progress } : f
                ),
              }));
        }
      }, 200);
    });
  },
  removeFile: (id) =>
    set((state) => ({ files: state.files.filter((f) => f.id !== id) })),
  updateProgress: (id, progress) =>
    set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, progress } : f)),
    })),
  clearFiles: () => set({ files: [] }),
}));
