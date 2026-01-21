import { useAnalysisStore } from '@features/analysis';
import { Typography } from '@shared/ui/Typography';

export const AnswerEditor = () => {
  const { result } = useAnalysisStore();

  if (!result) {
      return (
          <div className="bg-white text-black min-h-[800px] p-12 rounded-lg shadow-xl max-w-[21cm] mx-auto flex items-center justify-center">
              <div className="text-center space-y-4">
                  <Typography variant="h3" className="text-zinc-800">No Analysis Available</Typography>
                  <Typography variant="muted" className="text-zinc-500">Please run an analysis to generate a report.</Typography>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-white text-black min-h-[800px] p-12 rounded-lg shadow-xl max-w-[21cm] mx-auto">
        <div dangerouslySetInnerHTML={{ __html: result }} />
    </div>
  );
};
