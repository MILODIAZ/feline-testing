import { FaTimes } from "react-icons/fa";

function DeleteProveedor(props) {
    return (
        <div className='fixed inset-0 z-[100] flex flex justify-center items-center'>
            <div className='flex flex-col bg-[#f8efe6] p-2 border-2 border-black text-[1.5rem] rounded-lg'>
                <div className='flex justify-end'>
                    <button onClick={() => props.handleClick()}>
                        <FaTimes className='hover:text-[#a5d5d5]' />
                    </button>
                </div>
                <div className='p-8'>
                    <div>
                        <p>¿Estás seguro de que deseas eliminar {props.name}?</p>
                    </div>
                    <div className='flex justify-end mt-4'>
                        <button className='px-4 py-2 mr-2 bg-[#fc7494] font-bold rounded hover:bg-[#FA567C]' onClick={() => { props.deleteProveedor() }}>Eliminar</button>
                        <button className='px-4 py-2 bg-[#54e9d1] font-bold rounded hover:bg-teal-500' onClick={() => props.handleClick()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteProveedor;