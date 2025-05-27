import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useHomeController } from "@/controller/homeController";
import DownloadDialog from "@/views/DownloadDialog";

const Home = () => {
  const {
    folders,
    dialogOpen,
    loading,
    error,
    crawlerProgress,
    terminalLogs,
    handleStartCrawler,
    handleOpenDownloadDialog,
    handleDownloadFolder,
    handleCloseDialog,
    clearError,
    clearTerminal,
  } = useHomeController();

  const getProgressValue = () => {
    if (crawlerProgress.progress !== undefined) {
      return crawlerProgress.progress;
    }

    switch (crawlerProgress.status) {
      case "running":
        return 50;
      case "completed":
        return 100;
      case "error":
        return 0;
      default:
        return 0;
    }
  };

  const getProgressColor = () => {
    switch (crawlerProgress.status) {
      case "running":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl p-8">
        <div className="flex flex-col gap-6 justify-center">
          <Button
            className="bg-emerald-600 text-white text-4xl hover:bg-emerald-800 min-w-40 min-h-20 rounded-3xl disabled:opacity-50"
            onClick={handleStartCrawler}
            disabled={crawlerProgress.status === "running"}
          >
            {crawlerProgress.status === "running" ? "Executando..." : "Iniciar"}
          </Button>

          <Button
            className="bg-emerald-600 text-white text-4xl hover:bg-emerald-800 min-w-40 min-h-20 rounded-3xl"
            onClick={handleOpenDownloadDialog}
          >
            Baixar
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {error && (
            <div className="p-3 bg-red-900 border border-red-700 text-red-100 rounded">
              {error}
              <button
                onClick={clearError}
                className="float-right text-red-300 hover:text-red-100 ml-2"
              >
                ×
              </button>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Terminal de Logs</span>
            <Button
              variant="outline"
              size="sm"
              onClick={clearTerminal}
              className="text-xs bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
            >
              Limpar
            </Button>
          </div>

          <Textarea
            className="bg-gray-900 text-green-400 border-gray-600 min-h-[300px] resize-none font-mono text-sm"
            value={terminalLogs.join("\n")}
            readOnly
          />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>{getProgressValue()}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${getProgressValue()}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 text-center">
              Status:{" "}
              {crawlerProgress.status === "idle"
                ? "Parado"
                : crawlerProgress.status === "running"
                ? "Executando"
                : crawlerProgress.status === "completed"
                ? "Concluído"
                : "Erro"}
            </div>
          </div>
        </div>
      </div>

      <DownloadDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        folders={folders}
        onDownload={handleDownloadFolder}
        loading={loading}
      />
    </div>
  );
};

export default Home;
