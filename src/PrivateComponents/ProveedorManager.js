import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function ProveedorManager(props) {
    return (
        <div className='fixed z-[99] inset-0 flex justify-center items-center'>
            <div className='flex flex-col bg-[#f8efe6] p-2 border-2 border-black text-[1.5rem] rounded-lg'>
                <div className='flex justify-end'>
                    <button onClick={() => props.handleClose()}>
                        <FaTimes className='hover:text-[#a5d5d5]' />
                    </button>
                    <div className='p-8'>
                        <div>
                            <h3 className='text-[1.75rem] font-bold pb-6'>Administración de categorías</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProveedorManager;