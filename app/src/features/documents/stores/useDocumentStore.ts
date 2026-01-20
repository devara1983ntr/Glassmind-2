import { create } from 'zustand';

export interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  errorMessage?: string;
}

interface DocumentStore {
  files: FileItem[];
  addFiles: (files: File[]) => { valid: File[]; invalid: string[] };
  removeFile: (id: string) => void;
  clearFiles: () => void;
}

const MAX_SIZE = 200 * 1024 * 1024; // 200MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'];

export const useDocumentStore = create<DocumentStore>((set) => ({
  files: [],
  addFiles: (newFiles) => {
    const validFiles: File[] = [];
    const invalidReasons: string[] = [];

    newFiles.forEach((file) => {
        if (file.size > MAX_SIZE) {
            invalidReasons.push(`${file.name}: Exceeds 200MB limit`);
        } else if (!ALLOWED_TYPES.includes(file.type)) {
            invalidReasons.push(`${file.name}: Invalid file type`);
        } else {
            validFiles.push(file);
        }
    });

    if (validFiles.length === 0) return { valid: [], invalid: invalidReasons };

    const fileItems: FileItem[] = validFiles.map((file) => ({
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
        progress += Math.random() * 15;

        // Random failure simulation (5% chance)
        if (Math.random() < 0.05 && progress < 50) {
            clearInterval(interval);
            set((state) => ({
                files: state.files.map((f) =>
                  f.id === item.id ? { ...f, status: 'error', errorMessage: 'Network error' } : f
                ),
            }));
            return;
        }

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
      }, 300);
    });

    return { valid: validFiles, invalid: invalidReasons };
  },
  removeFile: (id) =>
    set((state) => ({ files: state.files.filter((f) => f.id !== id) })),
  clearFiles: () => set({ files: [] }),
}));
