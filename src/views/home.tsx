import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@radix-ui/react-progress";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen text-right">
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-1">
          <Button className="bg-emerald-600 text-white text-4xl hover:bg-emerald-800 min-w-40 min-h-20 rounded-3xl">
            Iniciar
          </Button>
          <br></br>
          <br />
          <br />
          <Button className="bg-emerald-600 text-white text-4xl hover:bg-emerald-800 min-w-40 min-h-20 rounded-3xl">
            Baixar
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Textarea className="bg-white min-w-100 min-h-100" />
        <Progress className="bg-white p-3 rounded-3xl" value={progress} />
      </div>
    </div>
  );
};

export default Home;
