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
import { useEffect, useState } from "react";

function ListaApis() {
  const [api, setApi] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/testar-dados-apis")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setApi(data);
      })
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
            className="max-w-xs truncate whitespace-nowrap overflow-hidden"
            key={api.id}
          >
            <TableCell>{api.id}</TableCell>
            <TableCell>{api.nome}</TableCell>
            <TableCell>{api.url}</TableCell>
            <TableCell>{api.metodo}</TableCell>
            <TableCell className="trucante">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(api.headers, null, 2)}
              </pre>
            </TableCell>
            <TableCell>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(api.body, null, 2)}
              </pre>
            </TableCell>
            <TableCell>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(api.parametros, null, 2)}
              </pre>
            </TableCell>
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
