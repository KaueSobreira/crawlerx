// views/ApiDialog.tsx
import React, { useState, useEffect } from "react";
import type { ApiDialogProps } from "@/model/api";
import { handleApiFormSubmit } from "../controller/apiControler";

const ApiDialog: React.FC<ApiDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState({
    name: "",
    url: "",
    method: "",
    headers: "{}",
    body: "{}",
    params: "{}",
    return_type: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm({
        name: initialData?.name || "",
        url: initialData?.url || "",
        method: initialData?.method || "",
        headers: JSON.stringify(initialData?.headers || {}, null, 2),
        body: JSON.stringify(initialData?.body || {}, null, 2),
        params: JSON.stringify(initialData?.params || {}, null, 2),
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
    handleApiFormSubmit(form, onSubmit, onClose, setError);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-black">Adicionar Api</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2 text-black">
          <label className="text-sm">Nome API:</label>
          <input
            name="name"
            required
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">URL:</label>
          <input
            name="url"
            required
            placeholder="URL"
            value={form.url}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">Método:</label>
          <input
            name="method"
            required
            placeholder="Método (GET, POST...)"
            value={form.method}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">Headers:</label>
          <textarea
            name="headers"
            placeholder="Headers (JSON)"
            value={form.headers}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">Body:</label>
          <textarea
            name="body"
            placeholder="Body (JSON)"
            value={form.body}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">Parâmetros:</label>
          <textarea
            name="params"
            placeholder="Parâmetros (JSON)"
            value={form.params}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">Tipo Retorno:</label>
          <input
            name="return_type"
            required
            placeholder="Tipo Retorno"
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

export default ApiDialog;
