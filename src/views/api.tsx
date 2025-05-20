import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import { ApiController, useApiListController } from "@/controller/apiControler";
import ApiDialog from "@/views/apiDialog";
import ListaApis from "@/views/table-api";
import type { ApiData } from "@/model/api";

const API = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApi, setEditingApi] = useState<Partial<ApiData> | null>(null);
  const { handleSave, handleDelete } = ApiController();

  const { apiList } = useApiListController();

  const handleAddApi = async (api: any) => {
    try {
      await handleSave(api, editingApi);
      setDialogOpen(false);
      setEditingApi(null);
    } catch (error) {
      console.error("Erro ao salvar API:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-black text-white p-4 flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">APIs</h1>
        <Button
          className="rounded-full bg-emerald-400 hover:bg-emerald-700 flex items-center gap-2"
          onClick={() => setDialogOpen(true)}
        >
          <ArrowDownUpIcon />
          Adicionar API
        </Button>
      </div>

      <ListaApis
        data={apiList}
        onEdit={(api) => {
          setEditingApi(api);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <ApiDialog
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
