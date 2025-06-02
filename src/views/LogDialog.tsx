import { useState } from "react";

import type { Log } from "@/model/logModel";
import { fetchLogs } from "@/controller/logController";

export default function LogDialog() {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const data = await fetchLogs();
      setLogs(data);
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-4 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-emerald-400"
      >
        Logs
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full relative">
            <h2 className="text-xl font-semibold mb-4">Logs</h2>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-4 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div className="overflow-auto max-h-[70vh]">
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-2 text-left">ID</th>
                      <th className="p-2 text-left">Método</th>
                      <th className="p-2 text-left">Path</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">IP</th>
                      <th className="p-2 text-left">User-Agent</th>
                      <th className="p-2 text-left">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id} className="border-t">
                        <td className="p-2">{log.id}</td>
                        <td className="p-2">{log.method}</td>
                        <td className="p-2">{log.path}</td>
                        <td className="p-2">{log.status_code}</td>
                        <td className="p-2">{log.ip}</td>
                        <td className="p-2 break-all">{log.user_agent}</td>
                        <td className="p-2">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
