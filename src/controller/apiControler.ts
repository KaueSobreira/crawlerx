export async function buscarApis() {
  const response = await fetch("http://127.0.0.1:8000/v1/api");
  if (!response.ok) {
    throw new Error("Erro ao buscar APIs");
  }
  const data = await response.json();
  return data;
}
