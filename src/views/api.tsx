import { useState } from "react";
import ListaApis from "@/components/table-api";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import ScriptDialog from "@/controller/apiDialog"; // importe correto aqui

const API = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddApi = async (api: {
    nome: string;
    url: string;
    metodo: string;
    headers: Record<string, string> | null;
    body: Record<string, unknown> | null;
    parametros: Record<string, string> | null;
    tipoRetorno: string;
  }) => {
    try {
      const response = await fetch("http://localhost:3000/cadastrar-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(api),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar API");
      }

      const result = await response.json();
      console.log("API salva com sucesso:", result);

      // Aqui você pode atualizar a tabela após salvar a nova API
    } catch (error) {
      console.error("Erro ao salvar API:", error);
    }
  };

  return (
    <div>
      <div className="bg-black text-white p-4 flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">APIs</h1>
        <Button
          className="rounded-full bg-emerald-400 hover:bg-emerald-700 flex items-center gap-2"
          onClick={() => setDialogOpen(true)}
        >
          <ArrowDownUpIcon />
          Adicionar API
        </Button>
      </div>

      <div>
        <ListaApis />
      </div>

      <ScriptDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddApi}
      />
    </div>
  );
};

export default API;
