
export interface Workspace {
  id: string;
  title: string;
  description: string;
  tags: string[];
  references: string[];
  context: string;
  createdAt: string;
}

export interface HistoryEntry {
  id: string;
  content: string;
  timestamp: string;
}
