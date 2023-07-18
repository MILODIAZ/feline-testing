import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import DeleteProveedor from './Delete-Proveedor';
import ModProveedores from './Mod-Proveedores';
import AlertConfirm from "../Extras/AlertConfirm";

function ProveedorManager(props) {
    const [showAlert, setShowAlert] = useState(false);
    const [mensaje, setMensaje] = useState('');
    // CARGAR PROVEEDORES

    const [dataLoaded, setDataLoaded] = useState(false);
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        fetch("http://localhost/feline-testing/public/main.php?query=5")
            .then(response => response.json())
            .then(data => {
                setDataLoaded(true);
                setProveedores(data);
            })
            .catch(error => {
                setMensaje("UPS, ocurrio un error");
                setShowAlert(true);
            });
    };

    // AGREGAR PROOVEDOR

    const [proveedorName, setProveedorName] = useState('');
    const handleProveedorNameChange = (event) => {
        setProveedorName(event.target.value);
    }
    const insertProveedor = (event) => {
        event.preventDefault();
        if (proveedorName === '') {
            setMensaje("Debe ingresar un componente valido");
            setShowAlert(true);
        } else {
            fetch(`http://localhost/feline-testing/public/main.php?query=21&proveedor=${proveedorName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data === true) {
                        setDataLoaded(false);
                        loadData();
                        setMensaje("Proveedor ingresado con exito");
                        setShowAlert(true);
                    } else {
                        setMensaje("Error al agregar proveedor");
                        setShowAlert(true);
                    }
                })
                .catch(error => {
                    setMensaje("El proveedor ya existe.");
                    setShowAlert(true);
                });
        }

        setProveedorName('');
    }
    const handleConfirm = () => {
        setShowAlert(false);
        props.handleClose()
    }

    // ELIMINAR PROVEEDOR

    const [deletingProveedor, setDeletingProveedor] = useState(false);
    const [ProveedorNameDeleting, setProveedorNameDeleting] = useState('');

    const openDeleteProveedor = () => {
        if (deletingProveedor) {
            setDeletingProveedor(false);
        } else {
            setDeletingProveedor(true);
        }
    }
    const deleteProveedor = () => {
        fetch(`http://localhost/feline-testing/public/main.php?query=19&proveedor=${ProveedorNameDeleting}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setDataLoaded(false);
                    loadData();
                }
            })
            .catch(error => {
                setMensaje("UPS, ocurrio un error");
                setShowAlert(true);
            });
    }

    //MODIFICAR PROVEEDOR

    const [modPro, setModPro] = useState(false);
    const [modProSelected, setModProSelected] = useState('');
    const [proveedorModName, setProveedorModName] = useState('');

    const handleProveedorModNameChange = (event) => {
        setProveedorModName(event.target.value);
    }

    const openModPro = (proveedor) => {
        if (modPro) {
            setModPro(false);
            setProveedorModName('');
        } else {
            setModPro(true);
            setModProSelected(proveedor);
        }
    }

    const ModProveedor = (event) => {
        event.preventDefault();
        if (proveedorModName !== '') {
            console.log(proveedorModName);
            fetch(`http://localhost/feline-testing/public/main.php?query=20&modProSelected=${modProSelected}&proveedorModName=${proveedorModName}`)
                .then(response => response.json())
                .then(data => {
                    openModPro(false);
                    setDataLoaded(false);
                    loadData();
                    setMensaje("Proveedor modificado con exito.");
                    setShowAlert(true);
                })
                .catch(error => {
                    setMensaje("El proveedor ya existe.");
                    setShowAlert(true);
                });
        } else {
            setMensaje("Ingrese un nombre Valido");
            setShowAlert(true);
        }
    }

    return (
        <div className='fixed z-[99] inset-0 flex justify-center items-center'>
            {deletingProveedor ? <DeleteProveedor handleClick={openDeleteProveedor} name={ProveedorNameDeleting} deleteProveedor={() => { deleteProveedor(proveedorName); openDeleteProveedor(); }} /> : null}
            <div className='flex flex-col h bg-[#f8efe6] p-2 border-2 border-black text-[1.5rem] rounded-lg'>
                <div className='flex justify-end '>
                    <button onClick={() => props.handleClose()}>
                        <FaTimes className='hover:text-[#a5d5d5]' />
                    </button>
                </div>
                <div className='p-8'>
                    <div>
                        <h3 className='text-[1.75rem] font-bold pb-3 '>Administración de proveedores</h3>
                    </div>
                    <div className='relative overflow-y-scroll min-h-[169px]'>
                        <div className='absolute w-full'>
                            {dataLoaded ?
                                (proveedores.map(proveedor => (
                                    ((modPro === true && proveedor[0] === modProSelected) ?
                                        <div key={proveedor[0]}>
                                            <form onSubmit={ModProveedor} className='flex flex-row justify-between pb-2 mr-2'>
                                                <input type='text' placeholder={proveedor[0]} className='w-5/12' value={proveedorModName} onChange={handleProveedorModNameChange} />
                                                <div className='flex justify-end'>
                                                    <button type='submit' className='text-sm text-center transition duration-150 bg-[#54e9d1] font-bold py-1 px-2 border-[2px] border-[#000] rounded-[10px] ml-3'>Aceptar</button>
                                                    <button onClick={openModPro} className='text-sm text-center transition duration-150 bg-[#fc7494] font-bold py-1 px-2 border-[2px] border-[#000] rounded-[10px] ml-3'>Cancelar</button>
                                                </div>
                                            </form>
                                        </div>
                                        : <div key={proveedor[0]} className='flex flex-row justify-between pb-2 mr-2'>
                                            <p>{proveedor[0]}</p>
                                            <div className='flex justify-end'>
                                                <button onClick={() => openModPro(proveedor[0])} className='text-sm text-black transition duration-150 bg-[#54e9d1] font-bold py-2 px-4 border-solid border-[2px] border-[#000] rounded-[10px]'>Modificar</button>
                                                <button onClick={() => { openDeleteProveedor(); setProveedorNameDeleting(proveedor[0]); }} className='text-sm text-center transition duration-150 bg-[#fc7494] font-bold py-1 px-2 border-[2px] border-[#000] rounded-[10px] ml-3'>Eliminar</button>
                                            </div>
                                        </div>)
                                ))) : null}
                        </div>
                    </div>
                    <div>
                        <h3 className='pt-4 font-bold text-center'>Nuevo Proveedor</h3>
                        <form onSubmit={insertProveedor}>
                            <div className='flex flex-col text-center'>
                                <label htmlFor='nombre'></label>
                                <input className='text-center border-solid border-[2px] border-[#000] rounded-[10px]' name='nombre' type='text' placeholder='-- Nombre del Proveedor --' value={proveedorName} onChange={handleProveedorNameChange} autoComplete='off'></input>
                            </div>
                            <div className='flex justify-center'>
                                <button className='text-sm text-black transition duration-150 bg-[#54e9d1] font-bold py-2 px-4 border-solid border-[2px] border-[#000] rounded-[10px] mt-3'>Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showAlert && (
                <AlertConfirm
                    mensaje={mensaje}
                    onCancel={handleConfirm} />
            )}
        </div>
    );
}
export default ProveedorManager;