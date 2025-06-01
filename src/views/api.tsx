/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon, SearchIcon } from "lucide-react";
import { ApiController, useApiListController } from "@/controller/apiControler";
import ApiDialog from "@/views/apiDialog";
import ListaApis from "@/views/table-api";
import type { ApiData } from "@/model/api";
import { Input } from "@/components/ui/input";
import ConfirmDeleteDialog from "@/views/ConfirmDeleteDialog";

const API = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [apiToDelete, setApiToDelete] = useState<ApiData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingApi, setEditingApi] = useState<Partial<ApiData> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { handleSave, handleDelete } = ApiController();
  const { apiList, handleSearch, refreshList } = useApiListController();
  const [searchInput, setSearchInput] = useState("");

  const handleAddApi = async (api: any) => {
    try {
      setError(null);

      await handleSave(api, editingApi);
      setDialogOpen(false);
      setEditingApi(null);
      refreshList();
    } catch (error) {
      console.error("Erro ao salvar API:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao salvar API"
      );
    }
  };

  const handleDeleteApi = async (api: ApiData) => {
    setApiToDelete(api);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!apiToDelete) return;

    try {
      setError(null);
      setIsDeleting(true);

      await handleDelete(apiToDelete.id);
      refreshList();

      setDeleteDialogOpen(false);
      setApiToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir API:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao excluir API"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setApiToDelete(null);
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

      {error && (
        <div className="mx-4 mb-4 p-3 bg-red-900 border border-red-700 text-red-100 rounded">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-red-300 hover:text-red-100"
          >
            ×
          </button>
        </div>
      )}

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
          setError(null);
        }}
        onSubmit={handleAddApi}
        initialData={editingApi}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        scriptName={""}
      />
    </div>
  );
};

export default API;
