import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Folder } from "lucide-react";
import type { DownloadDialogProps } from "@/model/home";

const DownloadDialog: React.FC<DownloadDialogProps> = ({
  open,
  onClose,
  folders,
  onDownload,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Selecionar Pasta para Download
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-black">Carregando pastas...</div>
          </div>
        ) : folders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Nenhuma pasta encontrada</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {folders.map((folder, index) => {
              const folderName =
                typeof folder === "string" ? folder : folder.name;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-black">{folderName}</p>
                      {typeof folder === "object" && folder.size && (
                        <p className="text-sm text-gray-500">
                          Tamanho: {folder.size}
                        </p>
                      )}
                      {typeof folder === "object" && folder.created_at && (
                        <p className="text-sm text-gray-500">
                          Criado: {folder.created_at}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                    onClick={() => onDownload(folderName)}
                    disabled={!folderName}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Baixar
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-black border-gray-300"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadDialog;
