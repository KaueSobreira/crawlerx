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
    progress: 0, // Inicializar sempre com 0
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
          console.log("Dados recebidos do WebSocket:", data); // Debug

          // Se for uma string simples
          if (typeof data === "string") {
            setCrawlerProgress((prev) => ({
              ...prev,
              message: data,
              status: "running",
              // Manter o progresso anterior se não vier novo
            }));
          }
          // Se for um objeto com dados estruturados
          else if (typeof data === "object" && data !== null) {
            setCrawlerProgress((prev) => {
              const newProgress = { ...prev };

              // Atualizar mensagem se presente
              if (data.message) {
                newProgress.message = data.message;
              }

              // Atualizar progresso se presente
              if (data.progress !== undefined && data.progress !== null) {
                newProgress.progress = Math.min(
                  100,
                  Math.max(0, Number(data.progress))
                );
              }

              // Atualizar status se presente
              if (data.status) {
                newProgress.status = data.status;
              } else {
                newProgress.status = "running";
              }

              console.log("Atualizando progresso:", newProgress); // Debug
              return newProgress;
            });
          }
        },
        (error) => {
          console.error("Erro WebSocket:", error);
          setCrawlerProgress({
            message: "Erro na conexão WebSocket",
            status: "error",
            progress: 0,
          });
          setError("Erro na conexão com o servidor");
        },
        () => {
          console.log("WebSocket fechado");
          setCrawlerProgress((prev) => ({
            ...prev,
            message:
              prev.status === "error" ? prev.message : "Crawler finalizado",
            status: prev.status === "error" ? "error" : "completed",
            progress: prev.status === "error" ? prev.progress : 100,
          }));
        }
      );

      wsServiceRef.current.connect();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setCrawlerProgress({
        message: "Erro ao iniciar crawler",
        status: "error",
        progress: 0,
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
