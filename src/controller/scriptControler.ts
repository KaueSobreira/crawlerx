import type { Script, ScriptData } from "@/model/script";
import {
  saveScript,
  deleteScript,
  buscarScripts as buscarScriptsService,
  buscarScripts,
} from "@/service/ScriptService";
import { useEffect, useState } from "react";

export function useScriptListController() {
  const [scriptList, setScriptList] = useState<ScriptData[]>([]);
  const [filteredScriptList, setFilteredScriptList] = useState<ScriptData[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    buscarScripts()
      .then((data) => {
        setScriptList(data);
        setFilteredScriptList(data);
      })
      .catch((err) => console.error("Erro ao buscar Scripts:", err));
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

  return { scriptList: filteredScriptList, searchTerm, handleSearch };
}

export function handleScriptFormSubmit(
  form: any,
  onSubmit: (script: Script) => void,
  onClose: () => void,
  _setError: (msg: string | null) => void
) {
  const script: Script = {
    name: form.name,
    path: form.path,
    return_type: form.return_type,
  };

  onSubmit(script);
  onClose();
}

export const ScriptController = () => {
  const handleSave = async (
    script: Script,
    editingScript: Partial<ScriptData> | null
  ): Promise<ScriptData> => {
    const result = await saveScript({
      ...script,
      ...(editingScript?.id ? { id: editingScript.id } : {}),
    });
    return result;
  };

  const handleDelete = async (id: number) => {
    await deleteScript(id);
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
