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
export interface ApiData {
  id: number;
  nome: string;
  url: string;
  metodo: string;
  headers: Record<string, string> | null;
  body: Record<string, unknown> | null;
  parametros: Record<string, string> | null;
  tipoRetorno: string;
}

function ListaApis({
  onEdit,
  onDelete,
}: {
  onEdit: (api: ApiData) => void;
  onDelete: (id: number) => void;
}) {
  const [api, setApi] = useState<ApiData[]>([]);

  useEffect(() => {
    buscarApis()
      .then((data: ApiData[]) => setApi(data))
      .catch((err) => console.error("Erro ao buscar APIs:", err));
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
            <TableCell className="max-w-[20ch] truncate">{api.url}</TableCell>
            <TableCell className="max-w-[20ch] truncate">
              {api.metodo}
            </TableCell>
            <TableCell className="max-w-[20ch] truncate">
              {JSON.stringify(api.headers, null, 2)}
            </TableCell>
            <TableCell className="max-w-[20ch] truncate">
              {JSON.stringify(api.body, null, 2)}
            </TableCell>
            <TableCell className="max-w-[20ch] truncate">
              {JSON.stringify(api.parametros, null, 2)}
            </TableCell>
            <TableCell className="max-w-[20ch] truncate">
              {api.tipoRetorno}
            </TableCell>
            <TableCell className="flex gap-2">
              <Button
                className="hover:bg-amber-100 hover:text-black"
                onClick={() => onEdit(api)}
              >
                <Pencil />
              </Button>
              <Button
                className="hover:bg-red-600"
                onClick={() => onDelete(api.id)}
              >
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
