import { BaseAgent } from './BaseAgent';
import type { FileContext } from '../types';

export class OCRAgent extends BaseAgent {
  name = 'OCR Processing Agent';

  async process(context: FileContext): Promise<FileContext> {
    this.emitProgress('Initializing OCR engine...', 10);
    await new Promise((resolve) => setTimeout(resolve, 600));

    this.emitProgress('Detecting text regions...', 40);
    await new Promise((resolve) => setTimeout(resolve, 800));

    this.emitProgress('Extracting text with confidence scoring...', 80);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const extractedText = 'Sample extracted text from document...';

    this.emitComplete('Text extraction completed with 98% confidence', { extractedText });
    return { ...context, content: extractedText };
  }
}
