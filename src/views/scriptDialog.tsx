const ScriptDialog = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Adicionar Script
        </h2>

        <form className="space-y-2 text-black">
          <label className="text-sm">Nome:</label>
          <input
            name="name"
            required
            maxLength={255}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">URL:</label>
          <input
            name="url"
            required
            maxLength={255}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">Path:</label>
          <input
            name="path"
            required
            maxLength={255}
            className="w-full border rounded px-3 py-2"
          />

          <label className="text-sm">Tipo de Retorno:</label>
          <input
            name="return_type"
            required
            maxLength={10}
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded hover:bg-red-500 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-300"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScriptDialog;
