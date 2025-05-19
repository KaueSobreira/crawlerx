import { useState } from "react";
import ListaApis, { type ApiData } from "@/components/table-api";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import ScriptDialog from "@/controller/apiDialog";

const API = () => {
  const handleAddApi = async (api: {
    name: string;
    url: string;
    method: string;
    headers: Record<string, string> | null;
    body: Record<string, unknown> | null;
    params: Record<string, string> | null;
    return_type: string;
  }) => {
    const isEditing = !!editingApi;
    const endpoint = isEditing
      ? `http://127.0.0.1:8000/v1/api/${editingApi.id}`
      : "http://127.0.0.1:8000/v1/api";

    const method = isEditing ? "PUT" : "POST";

    // ✅ Ajustando o payload para coincidir com ApiJsonData
    const payload = {
      // Incluir ID apenas no PUT
      ...(isEditing && editingApi?.id && { id: editingApi.id }),
      name: api.name,
      url: api.url,
      method: api.method,
      headers: api.headers || {}, // Garantir que nunca seja null
      params: api.params || {}, // Garantir que nunca seja null
      body: api.body ? JSON.stringify(api.body) : null, // Manter como string ou null
      return_type: api.return_type,
    };

    console.log("Payload enviado:", payload);

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.detail ||
          `HTTP ${response.status}: ${response.statusText}`;
        console.error("Erro do backend:", errorMessage);
        throw new Error(`Erro ao salvar API: ${errorMessage}`);
      }

      const result = await response.json();
      console.log("API salva com sucesso:", result);

      setEditingApi(null);
      setDialogOpen(false);

      // ✅ Opcional: Você pode adicionar um callback para atualizar a lista
      // window.location.reload(); // Força reload da página para atualizar a lista
    } catch (error) {
      console.error("Erro ao salvar API:", error);
      // ✅ Opcional: Mostrar erro para o usuário
      alert(`Erro ao salvar API: ${error.message}`);
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApi, setEditingApi] = useState<Partial<ApiData> | null>(null);

  const handleEditApi = (api: Partial<ApiData> | null) => {
    setEditingApi(api);
    setDialogOpen(true);
  };

  const handleDeleteApi = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/v1/api/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.detail ||
          `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(`Erro ao deletar API: ${errorMessage}`);
      }

      console.log("API deletada com sucesso");
      // ✅ Opcional: Atualizar a lista após deletar
      // window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar API:", error);
      alert(`Erro ao deletar API: ${error.message}`);
    }
  };

  const handleOpenDialog = () => {
    setEditingApi(null); // Limpar dados de edição
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-black text-white p-4 flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">APIs</h1>
        <Button
          className="rounded-full bg-emerald-400 hover:bg-emerald-700 flex items-center gap-2"
          onClick={handleOpenDialog}
        >
          <ArrowDownUpIcon />
          Adicionar API
        </Button>
      </div>

      <div>
        <ListaApis onEdit={handleEditApi} onDelete={handleDeleteApi} />
      </div>

      <ScriptDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingApi(null);
        }}
        onSubmit={handleAddApi}
        initialData={editingApi}
      />
    </div>
  );
};

export default API;
