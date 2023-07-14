import { useEffect, useState } from 'react';
import ProveedorManager from './Proveedor/Manager-Proveedor';
import SeguimientoPedidos from './SeguimientoPedidos';
import NewLote from './Lote/NewLote';

function Producción() {

    //Abrir para ver la pestaña administrar proveedores    
    const [openProveedor, setOpenProveedor] = useState(false);
    const [openNewLote, setNewLote] = useState(false);
    const [reloadLotes, setReloadLotes] = useState(false);

    const handleOpenProveedor = () => {
        if (openProveedor) {
            setOpenProveedor(false);
        } else {
            setOpenProveedor(true);
        }
    }
    
    const handleOpenNewLote = () => {
        setNewLote(!openNewLote)
    }

    return (
        <div>
            {openProveedor ? <ProveedorManager handleClose={handleOpenProveedor} /> : null}
            {openNewLote && (<NewLote 
                handleClose={handleOpenNewLote} reloadLotes={setReloadLotes}
            />)}
            <div className='flex flex-row justify-end py-8 px-60'>
                <div >
                    <button className='text-sm text-white text-center transition duration-150 hover:bg-indigo-900 bg-blue-600 font-bold py-2 px-4 rounded'>Seguimiento de Pedidos</button>
                </div>
                {/* Nuevo Lote */}
                <div>
                    <button onClick={handleOpenNewLote} reloadLotes={setReloadLotes} className='text-sm text-white transition duration-150 hover:bg-[#157c61] bg-[#93c47d]  font-bold py-2 px-4 rounded mx-4'>+ Nuevo lote</button>
                </div>
                <div>
                    <button onClick={handleOpenProveedor} className='text-sm text-black transition duration-150 hover:bg-yellow-700 bg-yellow-500 font-bold py-2 px-4 rounded'>Administrar Proveedores</button>
                </div>
            </div>
            <div>
                <SeguimientoPedidos />
            </div>
        </div>
    );
}

export default Producción;