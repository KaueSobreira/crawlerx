import type { FolderItem } from "@/model/home";

const baseUrl = "http://127.0.0.1:8000/v1";

export async function listDataFolders(): Promise<FolderItem[]> {
  const response = await fetch(`${baseUrl}/dataRecover/`);

  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.detail || "Erro ao buscar pastas");
    } catch {
      throw new Error(errorText || "Erro ao buscar pastas");
    }
  }

  const data = await response.json();
  console.log("Dados recebidos da API:", data);
  return data;
}

export async function downloadZipFolder(folderName: string): Promise<void> {
  if (!folderName || folderName.trim() === "") {
    throw new Error("Nome da pasta é obrigatório");
  }

  console.log("Tentando baixar pasta:", folderName);

  const response = await fetch(
    `${baseUrl}/dataRecover/zip/${encodeURIComponent(folderName)}`
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro na resposta:", errorText);
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.detail || "Erro ao baixar pasta");
    } catch {
      throw new Error(errorText || "Erro ao baixar pasta");
    }
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;

  link.download = `${folderName}.zip`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

export async function getCrawlerWsInfo(): Promise<any> {
  const response = await fetch(`${baseUrl}/crawler/ws-info`);

  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(
        errorData.detail || "Erro ao buscar informações do WebSocket"
      );
    } catch {
      throw new Error(errorText || "Erro ao buscar informações do WebSocket");
    }
  }

  return await response.json();
}

export class CrawlerWebSocketService {
  private ws: WebSocket | null = null;
  private onMessage: (data: any) => void;
  private onError: (error: Event) => void;
  private onClose: () => void;

  constructor(
    onMessage: (data: any) => void,
    onError: (error: Event) => void,
    onClose: () => void
  ) {
    this.onMessage = onMessage;
    this.onError = onError;
    this.onClose = onClose;
  }

  connect(): void {
    const wsUrl = "ws://127.0.0.1:8000/v1/crawler/ws/execute";
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log("WebSocket conectado");
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.onMessage(data);
      } catch (error) {
        this.onMessage(event.data);
      }
    };

    this.ws.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
      this.onError(error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket desconectado");
      this.onClose();
    };
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
