import type { Script, ScriptData } from "@/model/script";
import {
  saveScript,
  deleteScript,
  buscarScripts as buscarScriptsService,
  uploadScriptFile,
  updateScriptFile,
} from "@/service/ScriptService";
import { useEffect, useState } from "react";

export function useScriptListController() {
  const [scriptList, setScriptList] = useState<ScriptData[]>([]);
  const [filteredScriptList, setFilteredScriptList] = useState<ScriptData[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const loadScripts = async () => {
    try {
      setLoading(true);
      const data = await buscarScriptsService();
      setScriptList(data);
      setFilteredScriptList(data);
    } catch (err) {
      console.error("Erro ao buscar Scripts:", err);
    } finally {
      setLoading(false);
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
    loading,
    reloadScripts: loadScripts,
  };
}

export const ScriptController = () => {
  const handleSave = async (
    script: Script,
    file: File | null,
    editingScript: Partial<ScriptData> | null
  ): Promise<ScriptData> => {
    const isEditing = !!editingScript?.id;

    try {
      // 1. Primeiro salva/atualiza os dados do script
      const savedScript = await saveScript({
        ...script,
        ...(editingScript?.id ? { id: editingScript.id } : {}),
      });

      // 2. Se há arquivo, faz o upload
      if (file) {
        const scriptId = savedScript.id || editingScript?.id;
        if (!scriptId) {
          throw new Error("ID do script não encontrado");
        }

        if (isEditing) {
          // Para edição, usa PUT para atualizar o arquivo
          await updateScriptFile(scriptId, file);
        } else {
          // Para novo script, usa POST para criar o arquivo
          await uploadScriptFile(scriptId, file);
        }
      }

      return savedScript;
    } catch (error) {
      console.error("Erro ao salvar script:", error);
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

  const buscarScripts = async (): Promise<ScriptData[]> => {
    return await buscarScriptsService();
  };

  return {
    handleSave,
    handleDelete,
    buscarScripts,
  };
};
