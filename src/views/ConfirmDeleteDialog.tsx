import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, AlertTriangle } from "lucide-react";
import type { ConfirmDeleteDialogProps } from "@/model/script";

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-black">
            Confirmar Exclusão
          </h2>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">Tem certeza que deseja deletar?</p>
          <p className="text-sm text-red-600 mt-2">
            ⚠️ Esta ação não pode ser desfeita.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-black"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Excluindo...
              </>
            ) : (
              <>
                <Trash className="w-4 h-4 mr-2" />
                Excluir
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
