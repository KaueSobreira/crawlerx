import type { Api, ApiData } from "@/model/api";
import {
  saveApi,
  deleteApi,
  buscarApis as buscarApisService,
} from "@/service/ApiService";
import { validateJSON } from "@/utils/validadateJson";
import { useEffect, useState, useCallback } from "react";
import { buscarApis } from "@/service/ApiService";

export function useApiListController() {
  const [apiList, setApiList] = useState<ApiData[]>([]);
  const [filteredApiList, setFilteredApiList] = useState<ApiData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const refreshList = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    buscarApis()
      .then((data) => {
        setApiList(data);
        setFilteredApiList(data);
      })
      .catch((err) => console.error("Erro ao buscar APIs:", err));
  }, [refreshTrigger]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredApiList(apiList);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = apiList.filter(
      (api) =>
        api.id.toString().includes(searchTermLower) ||
        api.name.toLowerCase().includes(searchTermLower)
    );

    setFilteredApiList(filtered);
  }, [searchTerm, apiList]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return { apiList: filteredApiList, searchTerm, handleSearch, refreshList };
}

export function handleApiFormSubmit(
  form: any,
  onSubmit: (api: Api) => void,
  onClose: () => void,
  setError: (msg: string | null) => void
) {
  if (
    !validateJSON(form.headers) ||
    !validateJSON(form.body) ||
    !validateJSON(form.params)
  ) {
    setError("Headers, Body ou Parâmetros não são JSON válidos.");
    return;
  }

  const api: Api = {
    name: form.name,
    url: form.url,
    method: form.method,
    headers: form.headers ? JSON.parse(form.headers) : null,
    body: form.body ? JSON.parse(form.body) : null,
    params: form.params ? JSON.parse(form.params) : null,
    return_type: form.return_type,
  };

  onSubmit(api);
  onClose();
}

export const ApiController = () => {
  const handleSave = async (
    api: Api,
    editingApi: Partial<ApiData> | null
  ): Promise<ApiData> => {
    const result = await saveApi({
      ...api,
      ...(editingApi?.id ? { id: editingApi.id } : {}),
    });
    return result;
  };

  const handleDelete = async (id: number) => {
    await deleteApi(id);
  };

  const buscarApis = async (): Promise<ApiData[]> => {
    return await buscarApisService();
  };

  return {
    handleSave,
    handleDelete,
    buscarApis,
  };
};
