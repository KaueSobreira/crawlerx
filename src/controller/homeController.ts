import { useState, useEffect, useRef } from "react";
import type { FolderItem, CrawlerProgress } from "@/model/home";
import {
  listDataFolders,
  downloadZipFolder,
  CrawlerWebSocketService,
} from "@/service/HomeService";

export function useHomeController() {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crawlerProgress, setCrawlerProgress] = useState<CrawlerProgress>({
    message: "",
    status: "idle",
  });
  const [wsInfo] = useState<any>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const wsServiceRef = useRef<CrawlerWebSocketService | null>(null);

  const addTerminalLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setTerminalLogs((prev) => [...prev, logMessage]);
  };

  const clearTerminal = () => {
    setTerminalLogs([]);
  };

  useEffect(() => {
    return () => {
      if (wsServiceRef.current) {
        wsServiceRef.current.disconnect();
      }
    };
  }, []);

  const handleStartCrawler = async () => {
    try {
      clearTerminal();
      setError(null);

      if (wsServiceRef.current?.isConnected()) {
        setError("Crawler já está executando");
        return;
      }

      setCrawlerProgress({
        message: "Conectando...",
        status: "running",
        progress: 0,
      });

      addTerminalLog("Sistema: Iniciando conexão WebSocket...");

      wsServiceRef.current = new CrawlerWebSocketService(
        (data) => {
          if (typeof data === "string") {
            addTerminalLog(`Crawler: ${data}`);
            setCrawlerProgress((prev) => ({
              ...prev,
              message: data,
              status: "running",
            }));
          } else if (typeof data === "object" && data !== null) {
            const message = data.message || JSON.stringify(data);
            addTerminalLog(`Crawler: ${message}`);

            setCrawlerProgress((prev) => ({
              ...prev,
              message: message,
              progress: data.percentage || data.progress || prev.progress,
              status: "running",
            }));
          } else {
            addTerminalLog(`Dados: ${JSON.stringify(data)}`);
          }
        },
        (error) => {
          addTerminalLog("Erro: Falha na conexão WebSocket");
          setCrawlerProgress({
            message: "Erro na conexão WebSocket",
            status: "error",
          });
          setError("Erro na conexão com o servidor");
        },
        () => {
          addTerminalLog("Sistema: Conexão WebSocket encerrada");
          setCrawlerProgress((prev) => ({
            ...prev,
            message:
              prev.status === "error" ? prev.message : "Crawler finalizado",
            status: prev.status === "error" ? "error" : "completed",
          }));
        }
      );

      wsServiceRef.current.connect();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
      addTerminalLog(`Erro: ${errorMsg}`);
      setError(errorMsg);
      setCrawlerProgress({
        message: "Erro ao iniciar crawler",
        status: "error",
      });
    }
  };

  const handleOpenDownloadDialog = async () => {
    try {
      setError(null);
      setLoading(true);
      setDialogOpen(true);

      addTerminalLog("Sistema: Buscando pastas disponíveis...");
      const folderList = await listDataFolders();
      setFolders(folderList);
      addTerminalLog(`Sistema: ${folderList.length} pasta(s) encontrada(s)`);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Erro ao buscar pastas";
      addTerminalLog(`Erro: ${errorMsg}`);
      setError(errorMsg);
      setDialogOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFolder = async (folderName: string) => {
    try {
      setError(null);
      addTerminalLog(`Sistema: Iniciando download de "${folderName}"...`);
      await downloadZipFolder(folderName);
      addTerminalLog(`Sistema: Download de "${folderName}" concluído!`);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Erro ao baixar pasta";
      addTerminalLog(`Erro: ${errorMsg}`);
      setError(errorMsg);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFolders([]);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    folders,
    dialogOpen,
    loading,
    error,
    crawlerProgress,
    wsInfo,
    terminalLogs,

    handleStartCrawler,
    handleOpenDownloadDialog,
    handleDownloadFolder,
    handleCloseDialog,
    clearError,
    clearTerminal,
    addTerminalLog,
  };
}
