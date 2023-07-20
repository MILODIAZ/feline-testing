import { FaTimes } from 'react-icons/fa';
import UsersList from './List-Users';

function AdministracionUsuarios(props) {

  return (
    <div className='fixed z-[99] inset-0 flex justify-center items-center text-center'>
      <div className='flex flex-col bg-[#f8efe6] p-2 border-2 border-black text-[1.5rem] rounded-lg'>
        <div className='flex justify-end'>
          <button onClick={() => props.handleClick()}>
            <FaTimes className='hover:text-[#a5d5d5]' />
          </button>
        </div>
        <div className='p-8'>

          <div>
            <h3 className='text-[1.75rem] font-bold pb-6'>Administración usuarios</h3>
          </div>

          <UsersList />

        </div>
      </div>
    </div>
  );
}

export default AdministracionUsuarios;