import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import {
  ScriptController,
  useScriptListController,
} from "@/controller/scriptControler";
import ScriptDialog from "@/views/scriptDialog";
import TableScript from "./table-script";
import type { ScriptData } from "@/model/script";

const Script = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingScript, setEditingScript] =
    useState<Partial<ScriptData> | null>(null);
  const { handleSave, handleDelete } = ScriptController();

  const { scriptList } = useScriptListController();

  const handleAddScript = async (script: any) => {
    try {
      await handleSave(script, editingScript);
      setDialogOpen(false);
      setEditingScript(null);
    } catch (error) {
      console.error("Erro ao salvar Script:", error);
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
