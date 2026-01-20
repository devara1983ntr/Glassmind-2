import { Dropzone, FileList, useDocumentStore } from '@features/documents';
import { Button } from '@shared/ui/Button';
import { Typography } from '@shared/ui/Typography';
import { ArrowRight } from 'lucide-react';
import { Icon } from '@shared/ui/Icon';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const navigate = useNavigate();
  const files = useDocumentStore((state) => state.files);
  const isAllCompleted = files.length > 0 && files.every((f) => f.status === 'completed');

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <Typography variant="h2">Upload Documents</Typography>
        <Typography variant="muted">
          Upload PDFs, images, or scanned documents for analysis.
        </Typography>
      </div>

      <Dropzone />

      <div className="flex justify-between items-center">
         <Typography variant="h4">Uploaded Files ({files.length})</Typography>
         <Button
            disabled={!isAllCompleted}
            onClick={() => navigate('/analysis')}
            className="gap-2"
         >
            Next: Configure Analysis
            <Icon icon={ArrowRight} />
         </Button>
      </div>

      <FileList />
    </div>
  );
};

export default UploadPage;
