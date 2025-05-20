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
  const { handleSave, handleDelete } = ScriptController();
  const { scriptList, handleSearch } = useScriptListController();
  const [searchInput, setSearchInput] = useState("");

  const handleAddScript = async (script: any) => {
    try {
      await handleSave(script, editingScript);
      setDialogOpen(false);
      setEditingScript(null);
    } catch (error) {
      console.error("Erro ao salvar Script:", error);
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

      <TableScript
        data={scriptList}
        onEdit={(script) => {
          setEditingScript(script);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <ScriptDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingScript(null);
        }}
        onSubmit={handleAddScript}
        initialData={editingScript}
      />
    </div>
  );
};

export default Script;
