export interface Script {
  name: string;
  path: string;
  return_type: string;
}

export interface ScriptData extends Script {
  id: number;
}
