import { FaTimes } from 'react-icons/fa';


function DeleteCategorie(props) {

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
          <div className='flex justify-around pt-8'>
            <button className='text-sm text-white transition duration-150 hover:bg-[#b6efb0] bg-[#93c47d]  font-bold py-2 px-6 rounded' onClick={() => { props.deleteCategorie() }}>Sí</button>
            <button className='text-sm text-white transition duration-150 hover:bg-red-900 bg-red-600 font-bold py-2 px-6 rounded' onClick={() => props.handleClick()}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategorie;