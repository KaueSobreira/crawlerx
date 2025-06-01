import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../components/ui/button";
import { Pencil, Trash } from "lucide-react";
import type { ApiData } from "@/model/api";

interface Props {
  data: ApiData[];
  onEdit: (api: ApiData) => void;
  onDelete: (api: ApiData) => void;
}

function ListaApis({ data, onEdit, onDelete }: Props) {
  return (
    <div className="w-full min-h-screen p-4 bg-black text-white">
      <Table className="w-full h-full table-auto">
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
          {data.length > 0 ? (
            data.map((api) => (
              <TableRow
                key={api.id}
                className="truncate whitespace-nowrap overflow-hidden"
              >
                <TableCell className="max-w-[20ch] truncate">
                  {api.id}
                </TableCell>
                <TableCell className="max-w-[50ch] truncate min-w-[30ch]">
                  {api.name}
                </TableCell>
                <TableCell className="max-w-[30ch] truncate">
                  {api.url}
                </TableCell>
                <TableCell className="max-w-[20ch] truncate">
                  {api.method}
                </TableCell>
                <TableCell className="max-w-[20ch] truncate">
                  {JSON.stringify(api.headers)}
                </TableCell>
                <TableCell className="max-w-[20ch] truncate">
                  {JSON.stringify(api.body)}
                </TableCell>
                <TableCell className="max-w-[20ch] truncate">
                  {JSON.stringify(api.params)}
                </TableCell>
                <TableCell className="max-w-[20ch] truncate">
                  {api.return_type}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    className="hover:bg-amber-100 hover:text-black"
                    onClick={() => onEdit(api)}
                    title="Editar API"
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="hover:bg-red-600"
                    onClick={() => onDelete(api)}
                    title="Deletar API"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                Nenhuma API encontrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ListaApis;
