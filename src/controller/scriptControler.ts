import type { Script, ScriptData } from "@/model/script";
import {
  saveScript,
  deleteScript,
  buscarScripts as buscarScriptsService,
  uploadScriptFile,
  updateScriptFile,
  downloadScriptFile,
} from "@/service/ScriptService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useScriptListController() {
  const [scriptList, setScriptList] = useState<ScriptData[]>([]);
  const [filteredScriptList, setFilteredScriptList] = useState<ScriptData[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const loadScripts = async () => {
    try {
      const data = await buscarScriptsService();
      setScriptList(data);
      setFilteredScriptList(data);
    } catch (err) {
      console.error("Erro ao buscar Scripts:", err);
    }
  };

  useEffect(() => {
    loadScripts();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredScriptList(scriptList);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = scriptList.filter(
      (script) =>
        script.id.toString().includes(searchTermLower) ||
        script.name.toLowerCase().includes(searchTermLower)
    );

    setFilteredScriptList(filtered);
  }, [searchTerm, scriptList]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return {
    scriptList: filteredScriptList,
    searchTerm,
    handleSearch,
    reloadScripts: loadScripts,
  };
}

export const ScriptController = () => {
  const handleSave = async (
    script: Script & { id?: number },
    file: File | null,
    editingScript: Partial<ScriptData> | null
  ): Promise<ScriptData> => {
    const isEditing = !!editingScript?.id;

    try {
      const savedScript = await saveScript({
        ...script,
        ...(editingScript?.id ? { id: editingScript.id } : {}),
      });

      if (file) {
        const scriptId = savedScript.id || editingScript?.id;
        if (!scriptId) {
          throw new Error("ID do script não encontrado");
        }

        if (isEditing) {
          await updateScriptFile(scriptId, file);
        } else {
          await uploadScriptFile(scriptId, file);
        }
      }

      return savedScript;
    } catch (error) {
      console.error("Erro ao salvar script:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      if (
        errorMessage.includes("result") ||
        errorMessage.includes("Result") ||
        errorMessage.includes("'result'")
      ) {
        toast.error("Arquivo inválido", {
          description:
            "Para que seu arquivo Python seja aceito, ele precisa conter a variável ou saída chamada result. Edite os dados já incluídos e adicione o arquivo Python correspondente",
          duration: 5000,
        });
      } else {
        toast.error("Erro ao salvar script", {
          description: errorMessage,
          duration: 4000,
        });
      }

      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteScript(id);
    } catch (error) {
      console.error("Erro ao deletar script:", error);
      throw error;
    }
  };

  const handleDownload = async (script: ScriptData) => {
    try {
      if (!script.path || script.path.trim() === "") {
        throw new Error("Este script não possui arquivo para download");
      }

      await downloadScriptFile(script.id, script.name);
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error);
      throw error;
    }
  };

  const buscarScripts = async (): Promise<ScriptData[]> => {
    return await buscarScriptsService();
  };

  return {
    handleSave,
    handleDelete,
    handleDownload,
    buscarScripts,
  };
};
