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
  onDelete: (id: number) => void;
}

function ListaApis({ data, onEdit, onDelete }: Props) {
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
        {data.map((api) => (
          <TableRow
            key={api.id}
            className="truncate whitespace-nowrap overflow-hidden"
          >
            <TableCell>{api.id}</TableCell>
            <TableCell>{api.name}</TableCell>
            <TableCell className="max-w-[20ch] truncate">{api.url}</TableCell>
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
