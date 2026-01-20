import { EventEmitter } from 'events';
import { IngestionAgent } from '../agents/IngestionAgent';
import { OCRAgent } from '../agents/OCRAgent';
import { SemanticAgent } from '../agents/SemanticAgent';
import type { FileContext, ProcessingEvent } from '../types';

export class Orchestrator extends EventEmitter {
  private ingestionAgent = new IngestionAgent();
  private ocrAgent = new OCRAgent();
  private semanticAgent = new SemanticAgent();

  constructor() {
    super();
    this.setupListeners();
  }

  private setupListeners() {
    [this.ingestionAgent, this.ocrAgent, this.semanticAgent].forEach((agent) => {
      agent.on('progress', (e: ProcessingEvent) => this.emit('progress', e));
      agent.on('completed', (e: ProcessingEvent) => this.emit('step-completed', e));
      agent.on('error', (e: ProcessingEvent) => this.emit('error', e));
    });
  }

  async runAnalysis(files: FileContext[]) {
    for (const file of files) {
      try {
        let context = file;

        // Step 1: Ingestion
        this.emit('start', { agent: 'Orchestrator', message: `Starting analysis for ${file.name}` });
        context = await this.ingestionAgent.process(context);

        // Step 2: OCR
        context = await this.ocrAgent.process(context);

        // Step 3: Semantic Analysis
        context = await this.semanticAgent.process(context);

        this.emit('all-completed', { file: context });
      } catch (error) {
        this.emit('error', { agent: 'Orchestrator', message: 'Pipeline failed', data: error });
      }
    }
  }
}

export const runAnalysis = (files: FileContext[]) => {
    const orchestrator = new Orchestrator();
    // Use setTimeout to allow the caller to subscribe to events before execution starts
    setTimeout(() => orchestrator.runAnalysis(files), 0);
    return orchestrator;
};
