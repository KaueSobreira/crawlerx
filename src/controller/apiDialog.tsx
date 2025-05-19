import React, { useState, useEffect } from "react";

interface Api {
  name: string;
  url: string;
  method: string;
  headers: Record<string, string> | null;
  body: Record<string, unknown> | null;
  params: Record<string, string> | null;
  return_type: string;
}

interface ApiDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (Api: Api) => void;
  initialData?: Partial<Api> | null;
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

    if (
      !validateJSON(form.headers) ||
      !validateJSON(form.body) ||
      !validateJSON(form.params)
    ) {
      setError("Headers, Body ou Parâmetros não são JSON válidos.");
      return;
    }

    const api: Api = {
      name: form.name,
      url: form.url,
      method: form.method,
      headers: form.headers ? JSON.parse(form.headers) : null,
      body: form.body ? JSON.parse(form.body) : null,
      params: form.params ? JSON.parse(form.params) : null,
      return_type: form.return_type,
    };

    onSubmit(api);
    onClose();
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
          <p className="p-0 text-sm">Nome API:</p>
          <input
            name="name"
            required
            placeholder="Nome"
            value={form.name}
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
            name="method"
            required
            placeholder="Método (GET, POST...)"
            value={form.method}
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
            name="params"
            placeholder="Parâmetros (JSON)"
            value={form.params}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <p className="p-0 text-sm">Tipo Retorno:</p>
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
