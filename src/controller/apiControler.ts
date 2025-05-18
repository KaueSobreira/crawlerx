export async function buscarApis() {
  const response = await fetch("http://localhost:3000/testar-dados-apis");
  if (!response.ok) {
    throw new Error("Erro ao buscar APIs");
  }
  const data = await response.json();
  return data;
}
