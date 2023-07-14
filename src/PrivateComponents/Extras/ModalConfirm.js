export default function ConfirmationModal({ message, onConfirm, onCancel }) {
    return (
      <div className="fixed z-50 inset-0 flex items-center justify-center">
        <div className="bg-[#f8efe6] p-8 rounded-[15px] border-solid border-[#000] border-[3px]">
          <h2 className="text-lg font-medium mb-4">Confirmar eliminación</h2>
          <p>{message}</p>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 mr-2 bg-[#fc7494] font-bold rounded hover:bg-[#FA567C]"
              onClick={onConfirm}
            >
              Eliminar
            </button>
            <button
              className="px-4 py-2 bg-[#54e9d1] font-bold rounded hover:bg-teal-500"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }