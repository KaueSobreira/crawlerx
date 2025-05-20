export interface Script {
  name: string;
  path: string;
  return_type: string;
}

export interface ScriptData extends Script {
  id: number;
}

export interface ScriptDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (script: Script) => void;
  initialData?: Partial<ScriptData> | null;
}
