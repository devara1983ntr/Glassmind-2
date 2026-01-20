export interface FileContext {
  id: string;
  name: string;
  size: number;
  type: string;
  content?: any;
  metadata?: Record<string, any>;
}

export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface ProcessingEvent {
  agent: string;
  status: ProcessingStatus;
  message: string;
  progress: number;
  data?: any;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'concept' | 'entity' | 'reference';
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  relation: string;
}

export interface KnowledgeGraph {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
}
