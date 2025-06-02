import type { Log } from "@/model/logModel";
import axios from "axios";

export async function fetchLogs(): Promise<Log[]> {
  const response = await axios.get("http://127.0.0.1:8000/v1/logs/");
  return response.data;
}
