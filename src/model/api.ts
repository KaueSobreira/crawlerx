export interface Api {
  name: string;
  url: string;
  method: string;
  headers: Record<string, string> | null;
  body: Record<string, unknown> | null;
  params: Record<string, string> | null;
  return_type: string;
}

export interface ApiData extends Api {
  id: number;
}

export interface ApiDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (Api: Api) => void;
  initialData?: Partial<Api> | null;
}
