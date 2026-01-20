import { EventEmitter } from 'events';
import type { FileContext, ProcessingEvent } from '../types';

export abstract class BaseAgent extends EventEmitter {
  abstract name: string;

  abstract process(context: FileContext): Promise<FileContext>;

  protected emitProgress(message: string, progress: number, data?: any) {
    const event: ProcessingEvent = {
      agent: this.name,
      status: 'processing',
      message,
      progress,
      data,
    };
    this.emit('progress', event);
  }

  protected emitComplete(message: string, data?: any) {
    const event: ProcessingEvent = {
      agent: this.name,
      status: 'completed',
      message,
      progress: 100,
      data,
    };
    this.emit('completed', event);
  }

  protected emitError(message: string) {
    const event: ProcessingEvent = {
      agent: this.name,
      status: 'failed',
      message,
      progress: 0,
    };
    this.emit('error', event);
  }
}
