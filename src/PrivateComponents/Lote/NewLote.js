import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import AlertConfirm from "../Extras/AlertConfirm";
import Backdrop from "../Extras/BackDrop";
function NewLote(props) {

    const [providers, setProviders] = useState([]);
    const [codigo, setCodigo] = useState([]);
    const [nombreProveedor, setNombreProveedor] = useState([]);
    const [fechaPedido, setFechaPedido] = useState([]);
    const [fechaLlegada, setFechaLlegada] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const defaultProveedorValue = 'Sin proveedor';
    const [selectedProveedor, setSelectedProveedor] = useState(defaultProveedorValue);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        dataProviders();
        // Evita que la pagina haga scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const dataProviders = () => {
        fetch("http://localhost/feline-testing/public/main.php?query=5")
            .then(response => response.json())
            .then(data => {
                setProviders(data);
            })
            .catch(error => console.log(error));
    };

    const [fieldErrors, setFieldErrors] = useState({});

  // Function to validate form fields
  const validateForm = () => {
    const errors = {};

    if (!codigo) {
      errors.codigo = "Ingresa el código del lote.";
    }

    if (!fechaPedido) {
        errors.fechaPedido = "Ingresa la fecha de pedido.";
      } else {
        // Validate fechaPedido is a valid date
        const datePedido = new Date(fechaPedido);
        if (isNaN(datePedido)) {
          errors.fechaPedido = "Fecha de pedido inválida.";
        }
      }

      if (!fechaLlegada) {
        errors.fechaLlegada = "Ingresa la fecha de llegada.";
      } else {
        // Validate fechaLlegada is a valid date
        const dateLlegada = new Date(fechaLlegada);
        if (isNaN(dateLlegada)) {
          errors.fechaLlegada = "Fecha de llegada inválida.";
        }
      }
  
    if (selectedProveedor === defaultProveedorValue) {
      errors.proveedor = "Selecciona un proveedor válido.";
    }

    return errors;
  };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
    const errors = validateForm();

    // If there are errors, display the error messages
    if (Object.keys(errors).length > 0) {
        setMensaje('Por favor, complete todos los campos obligatorios.')
        setShowErrorAlert(true);
        return;
      }
        fetch(`http://localhost/feline-testing/public/main.php?query=27&codigo=${codigo}&nombre_proveedor=${selectedProveedor}&fecha_pedido=${fechaPedido}&fecha_llegada=${fechaLlegada}`)
            .then(response => response.json())
            .then(data => {
                if (data === true) {
                    console.log(data)
                }
                
                setShowAlert(true);
                props.reloadLotes(true);
            }).catch((e) => {
                setShowErrorAlert(true)
                    setMensaje('Error al ingresar lote, revise denuevo los campos');
  
            })
    };
    const handleConfirm = () => {
        setShowAlert(false);
        props.handleClose();
    }

    return (
        <div>
            <Backdrop z={50} />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#f8efe6] z-[60] border-solid border-[3px] border-[#000] rounded-[5px] p-4 justify-center items-center">
                <div className="flex justify-end">
                    <button onClick={props.handleClose}>
                        <FaTimes className="text-3xl hover:text-[#a5d5d5]" />
                    </button>
                </div>
                <div className="px-8">
                    <div className="text-center">
                        <h1 className='text-[1.75rem] font-bold pb-6 '>Nuevo Lote</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-row justify-between pb-2'>
                                <label htmlFor="codigo">Codigo:</label>
                                <input type="text" id="codigo" name="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} />
                            </div >

                            <div className='flex flex-row justify-between pb-2'>
                                <label htmlFor="fechaPedido">Fecha de Pedido:</label>
                                <input type="date" id="fechaPedido" name="fechaPedido" value={fechaPedido} onChange={e => setFechaPedido(e.target.value)} />
                            </div>

                            <div className='flex flex-row justify-between pb-2'>
                                <label htmlFor="fechaLlegada">Fecha de Llegada:</label>
                                <input type="date" id="fechaLlegada" name="fechaLlegada" value={fechaLlegada} onChange={e => setFechaLlegada(e.target.value)} />
                            </div>

                            <div className='flex flex-row justify-between pb-2'>
                                <label htmlFor="proveedor">Proveedor:</label>
                                <select id="proveedor" name="proveedor" onChange={(e) =>setSelectedProveedor(e.target.value)} value={selectedProveedor}>
                                    <option value={defaultProveedorValue}>{defaultProveedorValue}</option>
                                    {providers.map((provider) => (
                                        <option key={provider[0]} value={provider[0]}>
                                            {provider[0]}
                                        </option>
                                    ))}
                                </select>
    
                            </div>
                            {showErrorAlert && (
      <AlertConfirm mensaje={mensaje} onCancel={() => setShowErrorAlert(false)} />
    )}
                            <button
                                className="bg-[#54e9d1] w-[150px] font-bold h-[50px] mx-auto flex items-center justify-center border-solid border-[2px] border-[#000] rounded-[10px] mb-[20px]"
                                type="submit">Crear Lote</button>
                        </form>
                    </div>
                    {showAlert && (
                        <AlertConfirm
                            mensaje="Lote creado"
                            onCancel={handleConfirm} />
                    )}
                </div>
            </div>
        </div>
    )
}


export default NewLote;
