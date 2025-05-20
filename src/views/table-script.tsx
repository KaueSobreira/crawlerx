import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ScriptData } from "@/model/script";
import { Pencil, Trash } from "lucide-react";

interface Props {
  data: ScriptData[];
  onEdit: (script: ScriptData) => void;
  onDelete: (id: number) => void;
}

const TableScript = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full min-h-screen p-4 bg-black text-white">
      <Table className="w-full h-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Path</TableHead>
            <TableHead>Tipo de Retorno</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((script: ScriptData) => (
              <TableRow
                key={script.id}
                className="truncate whitespace-nowrap overflow-hidden"
              >
                <TableCell className="max-w-[20ch] truncate">
                  {script.id}
                </TableCell>
                <TableCell className="max-w-[50ch] truncate min-w-[30ch]">
                  {script.name}
                </TableCell>
                <TableCell className="max-w-[20ch] truncate min-w-[50ch]">
                  {script.path}
                </TableCell>
                <TableCell className="max-w-[20ch] truncate">
                  {script.return_type}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    className="hover:bg-amber-100 hover:text-black"
                    onClick={() => onEdit(script)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="hover:bg-red-600"
                    onClick={() => onDelete(script.id)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Nenhum script encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableScript;
