import { FunctionTool, LlmAgent } from '@google/adk';
import { z } from 'zod';
import { Orchestrator } from './src/pipeline/Orchestrator.js';
import { FileContext, ProcessingEvent } from './src/types/index.js';

/* Mock tool implementation */
const getCurrentTime = new FunctionTool({
  name: 'get_current_time',
  description: 'Returns the current time in a specified city.',
  parameters: z.object({
    city: z.string().describe("The name of the city for which to retrieve the current time."),
  }) as any,
  execute: ({ city }) => {
    return { status: 'success', report: `The current time in ${city} is 10:30 AM` };
  },
});

/* Integration of existing Orchestrator agents */
const analyzeDocument = new FunctionTool({
  name: 'analyze_document',
  description: 'Analyzes a document using the internal ingestion, OCR, and semantic analysis pipeline.',
  parameters: z.object({
    fileName: z.string().describe("The name of the file to analyze."),
    fileType: z.string().describe("The MIME type of the file (e.g., 'application/pdf', 'image/png').").default('application/octet-stream'),
    content: z.string().describe("The text content or description of the file.").optional(),
  }) as any,
  execute: async ({ fileName, fileType, content }) => {
    console.log(`Starting analysis for ${fileName}...`);

    const file: FileContext = {
      id: Math.random().toString(36).substring(7),
      name: fileName,
      size: 1024, // Mock size
      type: fileType,
      content: content,
      metadata: {}
    };

    const orchestrator = new Orchestrator();

    // Capture logs for the report
    const logs: string[] = [];

    const resultPromise = new Promise<{ status: string, report: string, data?: any }>((resolve, reject) => {
      orchestrator.on('progress', (e: ProcessingEvent) => {
        const msg = `[${e.agent}] ${e.message} (${e.progress}%)`;
        console.log(msg);
        logs.push(msg);
      });

      orchestrator.on('step-completed', (e: ProcessingEvent) => {
        const msg = `[${e.agent}] Completed: ${e.message}`;
        console.log(msg);
        logs.push(msg);
      });

      orchestrator.on('all-completed', (e: { file: FileContext }) => {
        resolve({
          status: 'success',
          report: `Analysis completed successfully.\n\nLogs:\n${logs.join('\n')}`,
          data: e.file
        });
      });

      orchestrator.on('error', (e: ProcessingEvent) => {
        const msg = `Error in ${e.agent}: ${e.message}`;
        console.error(msg);
        logs.push(msg);
        resolve({ // Resolve with error info instead of rejecting to return a report
          status: 'error',
          report: `Analysis failed.\n\nLogs:\n${logs.join('\n')}`,
          data: e
        });
      });
    });

    // Start analysis
    orchestrator.runAnalysis([file]);

    return resultPromise;
  },
});

export const rootAgent = new LlmAgent({
  name: 'amaae_engine_agent',
  model: 'gemini-1.5-flash',
  description: 'An agent that can tell time and analyze documents using a multi-step pipeline.',
  instruction: `You are a helpful assistant.
                You can tell the current time in a city using 'get_current_time'.
                You can also analyze documents (ingestion, OCR, semantic analysis) using 'analyze_document'.`,
  tools: [getCurrentTime, analyzeDocument],
});
