import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import TableScript from "./table-script";

const Script = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-black text-white p-4 flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">Scripts</h1>
        <Button className="rounded-full bg-emerald-400 hover:bg-emerald-700 flex items-center gap-2">
          <ArrowDownUpIcon />
          Adicionar Script
        </Button>
      </div>

      <TableScript />
    </div>
  );
};

export default Script;
