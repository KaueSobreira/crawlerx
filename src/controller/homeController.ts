import { useState, useEffect, useRef } from "react";
import type { FolderItem, CrawlerProgress } from "@/model/home";
import {
  listDataFolders,
  downloadZipFolder,
  getCrawlerWsInfo,
  CrawlerWebSocketService,
} from "@/service/HomeService";

export function useHomeController() {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crawlerProgress, setCrawlerProgress] = useState<CrawlerProgress>({
    message: "Pronto para iniciar",
    status: "idle",
  });
  const [wsInfo, setWsInfo] = useState<any>(null);

  const wsServiceRef = useRef<CrawlerWebSocketService | null>(null);

  useEffect(() => {
    const fetchWsInfo = async () => {
      try {
        const info = await getCrawlerWsInfo();
        setWsInfo(info);
        setCrawlerProgress((prev) => ({
          ...prev,
          message: info.info || "WebSocket disponível",
        }));
      } catch (err) {
        console.error("Erro ao buscar info do WebSocket:", err);
        setCrawlerProgress((prev) => ({
          ...prev,
          message: "Erro ao conectar com WebSocket",
        }));
      }
    };

    fetchWsInfo();
  }, []);

  useEffect(() => {
    return () => {
      if (wsServiceRef.current) {
        wsServiceRef.current.disconnect();
      }
    };
  }, []);

  const handleStartCrawler = async () => {
    try {
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

      wsServiceRef.current = new CrawlerWebSocketService(
        (data) => {
          if (typeof data === "string") {
            setCrawlerProgress((prev) => ({
              ...prev,
              message: data,
              status: "running",
            }));
          } else if (data.progress !== undefined) {
            setCrawlerProgress((prev) => ({
              ...prev,
              message: data.message || prev.message,
              progress: data.progress,
              status: "running",
            }));
          }
        },
        (error) => {
          setCrawlerProgress({
            message: "Erro na conexão WebSocket",
            status: "error",
          });
          setError("Erro na conexão com o servidor");
        },
        () => {
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
      setError(err instanceof Error ? err.message : "Erro desconhecido");
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

      const folderList = await listDataFolders();
      setFolders(folderList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar pastas");
      setDialogOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFolder = async (folderName: string) => {
    try {
      setError(null);
      await downloadZipFolder(folderName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao baixar pasta");
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

    handleStartCrawler,
    handleOpenDownloadDialog,
    handleDownloadFolder,
    handleCloseDialog,
    clearError,
  };
}
