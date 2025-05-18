import ScriptTable from "@/components/table-script";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";

const Script = () => {
  return (
    <div>
      <div className="bg-black text-white p-4 flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">Scripts</h1>
        <Button className="rounded-full bg-emerald-400 hover:bg-emerald-700">
          <ArrowDownUpIcon />
          Adicionar Script
        </Button>
      </div>
      <div>
        <ScriptTable />
      </div>
    </div>
  );
};

export default Script;
