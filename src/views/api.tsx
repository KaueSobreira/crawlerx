import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon, SearchIcon } from "lucide-react";
import { ApiController, useApiListController } from "@/controller/apiControler";
import ApiDialog from "@/views/apiDialog";
import ListaApis from "@/views/table-api";
import type { ApiData } from "@/model/api";
import { Input } from "@/components/ui/input";

const API = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApi, setEditingApi] = useState<Partial<ApiData> | null>(null);
  const { handleSave, handleDelete } = ApiController();
  const { apiList, handleSearch, refreshList } = useApiListController();
  const [searchInput, setSearchInput] = useState("");

  const handleAddApi = async (api: any) => {
    try {
      await handleSave(api, editingApi);
      setDialogOpen(false);
      setEditingApi(null);
      refreshList();
    } catch (error) {
      console.error("Erro ao salvar API:", error);
    }
  };

  const handleDeleteApi = async (id: number) => {
    try {
      await handleDelete(id);
      refreshList();
    } catch (error) {
      console.error("Erro ao excluir API:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(searchInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
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
      <div className="flex items-center gap-2 pl-4 mb-4">
        <Input
          placeholder="Pesquise por ID ou Nome..."
          className="max-w-xs text-white"
          value={searchInput}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="p-2 bg-emerald-500 rounded-full hover:bg-emerald-600 transition-colors"
          aria-label="Buscar"
          onClick={handleSearchClick}
        >
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      <ListaApis
        data={apiList}
        onEdit={(api) => {
          setEditingApi(api);
          setDialogOpen(true);
        }}
        onDelete={handleDeleteApi}
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
