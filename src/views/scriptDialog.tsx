import React, { useState, useEffect } from "react";
import type { ScriptDialogProps } from "@/model/script";
import { handleScriptFormSubmit } from "../controller/scriptControler";

const ScriptDialog: React.FC<ScriptDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState({
    name: "",
    path: "",
    return_type: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm({
        name: initialData?.name || "",
        path: initialData?.path || "",
        return_type: initialData?.return_type || "",
      });
      setError(null);
    }
  }, [open, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleScriptFormSubmit(form, onSubmit, onClose, setError);
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

        <form onSubmit={handleSubmit} className="space-y-2 text-black">
          <label className="text-sm">Nome:</label>
          <input
            name="name"
            required
            maxLength={255}
            placeholder="Nome do script"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">Arquivo (Path):</label>
          <input
            name="path"
            type="file"
            required
            placeholder="Caminho do arquivo"
            value={form.path}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">Tipo de Retorno:</label>
          <input
            name="return_type"
            required
            maxLength={10}
            placeholder="Tipo de retorno"
            value={form.return_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-red-500 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-300"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScriptDialog;
