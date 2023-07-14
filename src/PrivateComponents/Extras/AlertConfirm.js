

function AlertConfirm({mensaje, onCancel}){
    return(
        <div className="fixed z-150 inset-0  flex items-center justify-center">
        <div className="bg-[#f8efe6] py-5 px-12 rounded-[15px] border-solid border-[#000] border-[3px]">
          <h2 className="text-lg font-bold mb-4">{mensaje}</h2>
          <div className="mt-4 flex justify-center">
            <button
              className="px-4 py-2 bg-[#54e9d1] font-bold rounded-[7px] border-solid border-[2px] border-[#000] hover:bg-teal-500"
              onClick={onCancel}
            >
                Confirmar
            </button>
          </div>
        </div>
      </div>
    )
}

export default AlertConfirm;