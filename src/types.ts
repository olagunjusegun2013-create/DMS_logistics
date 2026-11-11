export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface HotlinkedAsset {
  id: string;
  url: string;
  title: string;
  screenId: string;
  screenTitle: string;
  aspectRatio?: string;
}

export interface ScreenData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  deviceType: DeviceType;
  hotlinkedImages: string[];
  htmlSnippet?: string;
  badge?: string;
}

export type ViewMode = 'artboard' | 'device' | 'importer' | 'assets';
