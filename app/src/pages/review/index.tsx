import { AnswerEditor, InsightSidebar } from '@features/review';
import { Button } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import { ArrowLeft, Download, Save, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReviewPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <Button variant="ghost" onClick={() => navigate('/analysis')} className="gap-2">
            <Icon icon={ArrowLeft} />
            Back to Configuration
        </Button>
        <div className="flex gap-3">
             <Button variant="outline" className="gap-2">
                <Icon icon={Save} />
                Save Draft
            </Button>
             <Button variant="outline" className="gap-2">
                <Icon icon={Share2} />
                Share
            </Button>
            <Button className="gap-2" onClick={() => navigate('/export')}>
                <Icon icon={Download} />
                Export
            </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-4 pb-20 custom-scrollbar">
            <AnswerEditor />
        </div>
        <div className="w-80 shrink-0 overflow-y-auto pb-20 custom-scrollbar hidden xl:block">
            <InsightSidebar />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
