export interface Log {
  id: number;
  method: string;
  path: string;
  status_code: number;
  ip: string;
  user_agent: string;
  timestamp: string;
}
