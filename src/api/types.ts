export interface Workspace {
  id: string;
  title: string;
  description: string;
  tags: string[];
  references: string[];
  context: string;
  createdAt: string;

  // Nuevos campos para creadores:
  platform: 'youtube' | 'tiktok' | 'instagram' | 'general';
  contentType: 'review' | 'tutorial' | 'gaming' | 'vlog' | 'unboxing' | 'otro';
  thumbnailPrompt: string;
  seoKeywords: string[];
  targetAudience: string;
}

export interface HistoryEntry {
  id: string;
  content: string;
  timestamp: string;
}
