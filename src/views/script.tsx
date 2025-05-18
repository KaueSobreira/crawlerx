import ScriptTable from "@/components/table-script";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";

const Script = () => {
  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Scrips</h1>
        <Button className="rounded-full">
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
