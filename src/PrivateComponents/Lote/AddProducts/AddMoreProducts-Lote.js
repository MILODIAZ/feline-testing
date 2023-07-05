import { FaTimes } from "react-icons/fa";
function AddMoreProducts(props){
    return(
        <div className="fixed  bg-[#f8efe6] z-[60] h-[80%] w-[80%]  border-solid border-[3px] border-[#000] rounded-[5px] p-2 flex flex-col">
            <div className='flex justify-end '>
                    <button onClick={() => props.handleClose()}>
                        <FaTimes className='text-3xl hover:text-[#a5d5d5]' />
                    </button>
                </div>
            <div className="grid grid-cols-2 h-[100%] text-[#fff]">
                {/* Todos los productos */}
            <div className="bg-[#404] p-2">
                Todos los productos
            </div>
            {/* Productos seleccionados */}
            <div className="bg-[#099] p-2">
                Productos seleccionados
            </div>
            </div>
        </div>
    )
}

export default AddMoreProducts;