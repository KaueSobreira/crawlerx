import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button.tsx";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { buscarApis } from "../controller/apiControler.ts";
function ListaApis() {
  interface ApiData {
    id: number;
    nome: string;
    url: string;
    metodo: string;
    headers: Record<string, string> | null;
    body: Record<string, unknown> | null;
    parametros: Record<string, string> | null;
    tipoRetorno: string;
  }

  const [api, setApi] = useState<ApiData[]>([]);

  useEffect(() => {
    buscarApis()
      .then((data: ApiData[]) => setApi(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <Table className="bg-black text-white">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Método</TableHead>
          <TableHead>Headers</TableHead>
          <TableHead>Body</TableHead>
          <TableHead>Parâmetros</TableHead>
          <TableHead>Tipo de Retorno</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {api.map((api) => (
          <TableRow
            className="truncate whitespace-nowrap overflow-hidden"
            key={api.id}
          >
            <TableCell>{api.id}</TableCell>
            <TableCell>{api.nome}</TableCell>
            <TableCell>{api.url}</TableCell>
            <TableCell>{api.metodo}</TableCell>
            <TableCell className="truncate">
              {JSON.stringify(api.headers, null, 2)}
            </TableCell>
            <TableCell>{JSON.stringify(api.body, null, 2)}</TableCell>
            <TableCell>{JSON.stringify(api.parametros, null, 2)}</TableCell>
            <TableCell>{api.tipoRetorno}</TableCell>
            <TableCell className="flex gap-2">
              <Button className="hover:bg-amber-100 hover:text-black">
                <Pencil />
              </Button>
              <Button className="hover:bg-red-600">
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ListaApis;
