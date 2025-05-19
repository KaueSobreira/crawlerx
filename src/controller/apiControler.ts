import type { Api, ApiData } from "@/model/api";
import {
  saveApi,
  deleteApi,
  buscarApis as buscarApisService,
} from "@/service/ApiService";

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
