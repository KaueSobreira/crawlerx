export interface DataFolder {
  name: string;
  size?: string;
  created_at?: string;
}

export type FolderItem = string | DataFolder;

export interface CrawlerProgress {
  message: string;
  progress?: number;
  status: "running" | "completed" | "error" | "idle";
}

export interface DownloadDialogProps {
  open: boolean;
  onClose: () => void;
  folders: FolderItem[];
  onDownload: (folderName: string) => void;
  loading: boolean;
}
