import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";

const ScriptTable = () => {
  return (
    <Table className="bg-black text-white rounded-sm">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Método</TableHead>
          <TableHead>Headers</TableHead>
          <TableHead>Body</TableHead>
          <TableHead>Parametros</TableHead>
          <TableHead>Tipo de Retorno</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Via Cep</TableCell>
          <TableCell>www.wsviaCep.com.br</TableCell>
          <TableCell>POST</TableCell>
          <TableCell>Exemplo</TableCell>
          <TableCell>Context/aplication</TableCell>
          <TableCell>Exemplo</TableCell>
          <TableCell>JSON</TableCell>
          <Button>
            <Pencil />
          </Button>
          <Button>
            <Trash className="hover:text-red-400" />
          </Button>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ScriptTable;
