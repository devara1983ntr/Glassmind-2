import { BaseAgent } from './BaseAgent';
import { FileContext } from '../types';

export class IngestionAgent extends BaseAgent {
  name = 'Ingestion Agent';

  async process(context: FileContext): Promise<FileContext> {
    this.emitProgress('Validating file integrity...', 10);
    await new Promise((resolve) => setTimeout(resolve, 500));

    this.emitProgress('Scanning for malware...', 30);
    await new Promise((resolve) => setTimeout(resolve, 500));

    this.emitProgress('Preprocessing image data...', 60);
    await new Promise((resolve) => setTimeout(resolve, 800));

    this.emitComplete('File successfully ingested and preprocessed');
    return { ...context, metadata: { ...context.metadata, preprocessed: true } };
  }
}
