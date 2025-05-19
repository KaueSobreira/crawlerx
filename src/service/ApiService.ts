import type { ApiData } from "@/model/api";

const baseUrl = "http://127.0.0.1:8000/v1/api";

export async function saveApi(api: Partial<ApiData>): Promise<ApiData> {
  const isEditing = !!api.id;
  const url = isEditing ? `${baseUrl}/${api.id}` : baseUrl;
  const method = isEditing ? "PUT" : "POST";

  const payload = {
    ...(isEditing && api.id ? { id: api.id } : {}),
    name: api.name,
    url: api.url,
    method: api.method,
    headers: api.headers ?? {},
    params: api.params ?? {},
    body: api.body ? JSON.stringify(api.body) : null,
    return_type: api.return_type,
  };

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
}

export async function deleteApi(id: number): Promise<void> {
  const response = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Erro ao deletar API");
}

export async function buscarApis(): Promise<ApiData[]> {
  const response = await fetch("http://127.0.0.1:8000/v1/api");
  if (!response.ok) throw new Error("Erro ao buscar APIs");
  return await response.json();
}
