import { create } from 'zustand';
import { documentService } from '@shared/api/storage/services';

export interface FileItem {
  id: string; // Temporary ID for the upload list
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  errorMessage?: string;
  documentId?: string; // Real ID after upload
}

interface DocumentStore {
  files: FileItem[];
  addFiles: (files: File[]) => Promise<{ valid: File[]; invalid: string[] }>;
  removeFile: (id: string) => void;
  clearFiles: () => void;
}

const MAX_SIZE = 200 * 1024 * 1024; // 200MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'];

export const useDocumentStore = create<DocumentStore>((set) => ({
  files: [],
  addFiles: async (newFiles) => {
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

    // Create temporary UI items
    const fileItems: FileItem[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: 'uploading' as const,
    }));

    set((state) => ({ files: [...state.files, ...fileItems] }));

    // Start uploads
    fileItems.forEach(async (item) => {
      try {
        // Simulate progress for UI feedback while waiting for service
        const progressInterval = setInterval(() => {
            set((state) => {
                const f = state.files.find(x => x.id === item.id);
                if (!f || f.status !== 'uploading') {
                    clearInterval(progressInterval);
                    return { files: state.files };
                }
                const newProgress = Math.min(f.progress + (Math.random() * 10), 90);
                return {
                    files: state.files.map((x) => x.id === item.id ? { ...x, progress: newProgress } : x)
                };
            });
        }, 200);

        const doc = await documentService.upload(item.file);

        clearInterval(progressInterval);
        set((state) => ({
            files: state.files.map((f) =>
              f.id === item.id ? { ...f, progress: 100, status: 'completed', documentId: doc.id } : f
            ),
        }));
      } catch (error) {
          set((state) => ({
              files: state.files.map((f) =>
                f.id === item.id ? { ...f, status: 'error', errorMessage: (error as Error).message } : f
              ),
          }));
      }
    });

    return { valid: validFiles, invalid: invalidReasons };
  },
  removeFile: (id) =>
    set((state) => ({ files: state.files.filter((f) => f.id !== id) })),
  clearFiles: () => set({ files: [] }),
}));
