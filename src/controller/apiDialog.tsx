import React, { useState, useEffect } from "react";

interface Api {
  nome: string;
  url: string;
  metodo: string;
  headers: Record<string, string> | null;
  body: Record<string, unknown> | null;
  parametros: Record<string, string> | null;
  tipoRetorno: string;
}

interface ApiDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (Api: Api) => void;
}

function validateJSON(jsonString: string) {
  if (!jsonString) return true;
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

const ApiDialog: React.FC<ApiDialogProps> = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    nome: "",
    url: "",
    metodo: "",
    headers: "{}",
    body: "{}",
    parametros: "{}",
    tipoRetorno: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setForm({
        nome: "",
        url: "",
        metodo: "",
        headers: "{}",
        body: "{}",
        parametros: "{}",
        tipoRetorno: "",
      });
      setError(null);
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !validateJSON(form.headers) ||
      !validateJSON(form.body) ||
      !validateJSON(form.parametros)
    ) {
      setError("Headers, Body ou Parâmetros não são JSON válidos.");
      return;
    }

    const Api: Api = {
      nome: form.nome,
      url: form.url,
      metodo: form.metodo,
      headers: form.headers ? JSON.parse(form.headers) : null,
      body: form.body ? JSON.parse(form.body) : null,
      parametros: form.parametros ? JSON.parse(form.parametros) : null,
      tipoRetorno: form.tipoRetorno,
    };

    onSubmit(Api);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Adicionar Api</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          <p className="p-0 text-sm">Nome API:</p>
          <input
            name="nome"
            required
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <p className="p-0 text-sm">URL:</p>
          <input
            name="url"
            required
            placeholder="URL"
            value={form.url}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <p className="p-0 text-sm">Metodo:</p>
          <input
            name="metodo"
            required
            placeholder="Método (GET, POST...)"
            value={form.metodo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <p className="p-0 text-sm">Headers:</p>
          <textarea
            name="headers"
            placeholder="Headers (JSON)"
            value={form.headers}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <p className="p-0 text-sm">Body:</p>
          <textarea
            name="body"
            placeholder="Body (JSON)"
            value={form.body}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <p className="p-0 text-sm">Parâmetros:</p>
          <textarea
            name="parametros"
            placeholder="Parâmetros (JSON)"
            value={form.parametros}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <p className="p-0 text-sm">Tipo Retorno:</p>
          <input
            name="tipoRetorno"
            required
            placeholder="Tipo Retorno"
            value={form.tipoRetorno}
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
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-300 "
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
