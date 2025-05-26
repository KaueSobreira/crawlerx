import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon, SearchIcon } from "lucide-react";
import {
  ScriptController,
  useScriptListController,
} from "@/controller/scriptControler";
import ScriptDialog from "@/views/scriptDialog";
import TableScript from "./table-script";
import type { ScriptData } from "@/model/script";
import { Input } from "@/components/ui/input";

const Script = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingScript, setEditingScript] =
    useState<Partial<ScriptData> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { handleSave, handleDelete } = ScriptController();
  const { scriptList, handleSearch, loading, reloadScripts } =
    useScriptListController();
  const [searchInput, setSearchInput] = useState("");

  const handleAddScript = async (scriptData: any, file: File | null) => {
    try {
      setError(null);
      setSuccess(null);

      await handleSave(scriptData, file, editingScript);

      setSuccess(
        editingScript
          ? "Script atualizado com sucesso!"
          : "Script adicionado com sucesso!"
      );
      setDialogOpen(false);
      setEditingScript(null);

      // Recarrega a lista de scripts
      await reloadScripts();

      // Remove a mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Erro ao salvar Script:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao salvar script"
      );
    }
  };

  const handleDeleteScript = async (id: number) => {
    try {
      setError(null);
      setSuccess(null);

      const confirmed = window.confirm(
        "Tem certeza que deseja deletar este script?"
      );
      if (!confirmed) return;

      await handleDelete(id);
      setSuccess("Script deletado com sucesso!");

      // Recarrega a lista de scripts
      await reloadScripts();

      // Remove a mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Erro ao deletar Script:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao deletar script"
      );
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
        <h1 className="text-2xl font-bold">Scripts</h1>
        <Button
          className="rounded-full bg-emerald-400 hover:bg-emerald-700 flex items-center gap-2"
          onClick={() => setDialogOpen(true)}
        >
          <ArrowDownUpIcon />
          Adicionar Script
        </Button>
      </div>

      {/* Mensagens de erro e sucesso */}
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

      {success && (
        <div className="mx-4 mb-4 p-3 bg-green-900 border border-green-700 text-green-100 rounded">
          {success}
          <button
            onClick={() => setSuccess(null)}
            className="float-right text-green-300 hover:text-green-100"
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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-white">Carregando scripts...</div>
        </div>
      ) : (
        <TableScript
          data={scriptList}
          onEdit={(script) => {
            setEditingScript(script);
            setDialogOpen(true);
          }}
          onDelete={handleDeleteScript}
        />
      )}

      <ScriptDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingScript(null);
          setError(null);
        }}
        onSubmit={handleAddScript}
        initialData={editingScript}
      />
    </div>
  );
};

export default Script;
