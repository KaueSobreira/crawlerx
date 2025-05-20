import type { ScriptData } from "@/model/script";

const baseUrl = "http://127.0.0.1:8000/v1/script";

export async function saveScript(
  script: Partial<ScriptData>
): Promise<ScriptData> {
  const isEditing = !!script.id;
  const url = isEditing ? `${baseUrl}/${script.id}` : baseUrl;
  const method = isEditing ? "PUT" : "POST";

  const payload = {
    ...(isEditing && script.id ? { id: script.id } : {}),
    name: script.name,
    path: script.path,
    return_type: script.return_type,
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

export async function deleteScript(id: number): Promise<void> {
  const response = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Erro ao deletar Script");
}

export async function buscarScripts(): Promise<ScriptData[]> {
  const response = await fetch("http://127.0.0.1:8000/v1/script");
  if (!response.ok) throw new Error("Erro ao buscar Scripts");
  return await response.json();
}
