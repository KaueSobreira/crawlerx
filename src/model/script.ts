export interface Script {
  name: string;
  url?: string;
  path?: string;
  return_type: string;
}

export interface ScriptData extends Script {
  id: number;
  url: string;
  path: string;
}

export interface ScriptDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (script: Script & { id?: number }, file: File | null) => void;
  initialData?: Partial<ScriptData> | null;
}
