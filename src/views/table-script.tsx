import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

const TableScript = () => {
  return (
    <div className="w-full min-h-screen p-4 bg-black text-white">
      <Table className="w-full h-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Path</TableHead>
            <TableHead>Tipo de Retorno</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="truncate whitespace-nowrap overflow-hidden">
            <TableCell className="max-w-[20ch] truncate">1</TableCell>
            <TableCell className="max-w-[20ch] truncate">Exemplo</TableCell>
            <TableCell className="max-w-[20ch] truncate min-w-[50ch]">
              https://api.exemplo.com
            </TableCell>
            <TableCell className="max-w-[20ch] truncate min-w-[30ch]">
              /dados
            </TableCell>
            <TableCell className="max-w-[20ch] truncate">JSON</TableCell>
            <TableCell className="flex gap-2">
              <Button className="hover:bg-amber-100 hover:text-black">
                <Pencil />
              </Button>
              <Button className="hover:bg-red-600">
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableScript;
