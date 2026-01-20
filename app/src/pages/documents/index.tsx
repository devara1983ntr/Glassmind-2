import { useState } from 'react';
import { GlassCard } from '@shared/ui/GlassCard';
import { Typography } from '@shared/ui/Typography';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Badge } from '@shared/ui/Badge';
import { Icon } from '@shared/ui/Icon';
import { Search, Filter, Grid, List, FileText, MoreVertical, Download, Trash } from 'lucide-react';
import { useDocumentStore } from '@features/documents';
import { useNavigate } from 'react-router-dom';

const DocumentsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const { files } = useDocumentStore();
  const navigate = useNavigate();

  // Mock initial files if store is empty for demonstration
  const displayFiles = files.length > 0 ? files : [
      { id: '1', file: { name: 'Physics_Exam_2024.pdf', size: 2500000 }, status: 'completed', progress: 100 },
      { id: '2', file: { name: 'Chemistry_Notes_Ch1.jpg', size: 1200000 }, status: 'completed', progress: 100 },
      { id: '3', file: { name: 'History_Essay_Draft.docx', size: 500000 }, status: 'uploading', progress: 45 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <Typography variant="h2">Document Library</Typography>
            <Typography variant="muted">Manage and organize your uploaded content</Typography>
        </div>
        <Button onClick={() => navigate('/upload')}>Upload New</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
        <div className="relative w-full md:w-96">
            <Icon icon={Search} className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
            <Input
                placeholder="Search files..."
                className="pl-10 h-10 bg-black/20 border-white/5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="gap-2">
                <Icon icon={Filter} className="h-4 w-4" />
                Filter
            </Button>
            <div className="h-6 w-px bg-white/10 mx-2" />
            <div className="flex bg-black/20 rounded-lg p-1 border border-white/5">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <Icon icon={Grid} className="h-4 w-4" />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <Icon icon={List} className="h-4 w-4" />
                </button>
            </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayFiles.map((item: any) => (
                <GlassCard key={item.id} variant="flat" className="group relative hover:bg-white/10 transition-colors">
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button variant="ghost" size="icon" className="h-8 w-8">
                             <Icon icon={MoreVertical} className="h-4 w-4" />
                         </Button>
                    </div>
                    <div className="flex flex-col items-center text-center pt-4 pb-2">
                        <div className="h-16 w-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
                             <Icon icon={FileText} className="h-8 w-8" />
                        </div>
                        <Typography variant="body" className="font-medium truncate w-full px-2">{item.file.name}</Typography>
                        <Typography variant="small" className="text-zinc-500 mt-1">
                            {(item.file.size / 1024 / 1024).toFixed(2)} MB • {new Date().toLocaleDateString()}
                        </Typography>
                         <div className="mt-4 flex gap-2 w-full justify-center">
                            <Badge variant={item.status === 'completed' ? 'success' : 'default'}>
                                {item.status === 'completed' ? 'Processed' : 'Processing'}
                            </Badge>
                         </div>
                    </div>
                </GlassCard>
            ))}
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
            <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-zinc-400 font-medium border-b border-white/10">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Size</th>
                        <th className="p-4">Date Uploaded</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {displayFiles.map((item: any) => (
                         <tr key={item.id} className="hover:bg-white/5 transition-colors">
                             <td className="p-4 flex items-center gap-3 font-medium text-white">
                                 <Icon icon={FileText} className="text-blue-500 h-4 w-4" />
                                 {item.file.name}
                             </td>
                             <td className="p-4 text-zinc-400">{(item.file.size / 1024 / 1024).toFixed(2)} MB</td>
                             <td className="p-4 text-zinc-400">{new Date().toLocaleDateString()}</td>
                             <td className="p-4">
                                <Badge variant={item.status === 'completed' ? 'success' : 'default'}>
                                    {item.status === 'completed' ? 'Processed' : 'Processing'}
                                </Badge>
                             </td>
                             <td className="p-4 text-right">
                                 <div className="flex justify-end gap-2">
                                     <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                                         <Icon icon={Download} className="h-4 w-4" />
                                     </Button>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-error">
                                         <Icon icon={Trash} className="h-4 w-4" />
                                     </Button>
                                 </div>
                             </td>
                         </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
