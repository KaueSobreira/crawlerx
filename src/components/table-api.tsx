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
import { buscarApis } from "@/service/ApiService.ts";

export interface ApiData {
  id: number;
  name: string;
  url: string;
  method: string;
  headers: Record<string, string> | null;
  body: Record<string, unknown> | null;
  params: Record<string, string> | null;
  return_type: string;
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
            <TableCell>{api.name}</TableCell>
            <TableCell className="max-w-[20ch] truncate">{api.url}</TableCell>
            <TableCell className="max-w-[20ch] truncate">
              {api.method}
            </TableCell>
            <TableCell className="max-w-[20ch] truncate">
              {JSON.stringify(api.headers, null, 2)}
            </TableCell>
            <TableCell className="max-w-[20ch] truncate">
              {JSON.stringify(api.body, null, 2)}
            </TableCell>
            <TableCell className="max-w-[20ch] truncate">
              {JSON.stringify(api.params, null, 2)}
            </TableCell>
            <TableCell className="max-w-[20ch] truncate">
              {api.return_type}
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
