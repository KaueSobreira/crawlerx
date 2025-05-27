import React, { useState, useEffect } from "react";
import type { Script, ScriptDialogProps } from "@/model/script";

const ScriptDialog: React.FC<ScriptDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState({
    name: "",
    return_type: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({
        name: initialData?.name || "",
        return_type: initialData?.return_type || "",
      });
      setFile(null);
      setError(null);
    }
  }, [open, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".py")) {
        setError("Apenas arquivos .py são permitidos");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!form.name.trim()) {
        throw new Error("Nome é obrigatório");
      }
      if (!form.return_type.trim()) {
        throw new Error("Tipo de retorno é obrigatório");
      }

      if (!initialData?.id && !file) {
        throw new Error("Arquivo Python é obrigatório para novos scripts");
      }

      const scriptData: Script = {
        name: form.name,
        url: "",
        path: "",
        return_type: form.return_type,
      };

      const scriptWithId = {
        ...scriptData,
        ...(initialData?.id ? { id: initialData.id } : {}),
      };

      await onSubmit(scriptWithId, file);

      onClose();
    } catch (err) {
      let errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";

      if (errorMessage.includes("result")) {
        errorMessage =
          'O arquivo Python deve conter uma variável chamada "result" com os dados que você deseja salvar. Exemplo: result = {"dados": "exemplo"}';
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-black">
          {initialData ? "Editar Script" : "Adicionar Script"}
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="p-3 bg-red-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>📝 Importante:</strong> O arquivo Python deve conter
              result para ser aceito.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nome:</label>
            <input
              name="name"
              required
              maxLength={255}
              placeholder="Nome do script"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Arquivo Python (.py):
            </label>
            <input
              type="file"
              accept=".py"
              onChange={handleFileChange}
              className="w-full border rounded px-3 py-2"
              disabled={isSubmitting}
              {...(!initialData?.id ? { required: true } : {})}
            />
            {initialData?.id && (
              <p className="text-xs text-gray-600 mt-1">
                Deixe vazio para manter o arquivo atual
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de Retorno:
            </label>
            <input
              name="return_type"
              required
              maxLength={10}
              placeholder="Ex: json, txt, csv"
              value={form.return_type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-red-500 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScriptDialog;
