import { useState, useEffect } from 'react';
import ProveedorManager from './ProveedorManager';

function Producción() {

    const [openProveedor, setOpenProveedor] = useState(false);
    const handleOpenProveedor = () => {
        if (openProveedor) {
            setOpenProveedor(false);
        } else {
            setOpenProveedor(true);
        }
    }

    return (
        <div>
            {openProveedor ? <ProveedorManager handleClose={handleOpenProveedor} /> : null}

            <div className='flex flex-row justify-between py-8'>
                <div className='w-6/12 text-center'>
                    <p className='text-xl font-bold'>PRODUCCIÓN</p>
                </div>
                <div className='w-6/12 text-center'>
                    <button onClick={handleOpenProveedor} className='text-sm text-black transition duration-150 hover:bg-yellow-700 bg-yellow-500 font-bold py-2 px-4 rounded'>Administrar Proveedor</button>
                </div>
            </div>
        </div>

    );
}

export default Producción;