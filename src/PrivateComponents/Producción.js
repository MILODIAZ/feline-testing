import { useEffect, useState } from 'react';
import ProveedorManager from './Proveedor/Manager-Proveedor';
import SeguimientoPedidos from './SeguimientoPedidos';
import NewLote from './Lote/NewLote';

function Producción() {

    //Abrir para ver la pestaña administrar proveedores    
    const [openProveedor, setOpenProveedor] = useState(false);
    const [openNewLote, setNewLote] = useState(false);
    const [reloadLotes, setReloadLotes] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);

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
    const handleOpenAler = () => {
        setOpenAlert(!openAlert)
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            {openProveedor ? <ProveedorManager handleClose={handleOpenProveedor} /> : null}
            {openNewLote && (<NewLote
                handleClose={handleOpenNewLote} reloadLotes={setReloadLotes}
            />)}

            <div className='flex'>
                <div className='flex items-center text-[30px] px-10'>
                    <p className='text-xl font-bold'>SEGUIMIENTO DE PEDIDOS</p>
                </div>
                <div className='flex flex-row justify-end py-8 px-10'>

                    {/* Nuevo Lote */}
                    <div>
                        <button onClick={handleOpenNewLote} reloadLotes={setReloadLotes} className='text-sm text-white transition duration-150 hover:bg-[#157c61] bg-[#93c47d]  font-bold py-2 px-10 rounded mx-4' >+ Nuevo lote</button>
                    </div>
                    <div>
                        <button onClick={handleOpenProveedor} className='text-sm text-black transition duration-150 hover:bg-yellow-700 bg-yellow-500 font-bold py-2 px-10 rounded'>Administrar Proveedores</button>
                    </div>
                </div>
            </div>

            <div>
                <SeguimientoPedidos />
            </div>
        </div>

    );
}

export default Producción;