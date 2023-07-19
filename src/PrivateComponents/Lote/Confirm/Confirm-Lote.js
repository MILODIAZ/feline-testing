

// Query Actualizar stock

import { useEffect, useState } from "react";
import ConfirmationModal from "../../Extras/ModalConfirm";
import AlertConfirm from "../../Extras/AlertConfirm";

function ConfirmLote(props){
    const [productos, setProductos] = useState([])
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        dataProduct();
    },[])
    
    const dataProduct = () => {
        fetch(`http://localhost/feline-testing/public/main.php?query=22&lote=${props.id}`)
        .then((response) => response.json())
        .then((data) => {
            setProductos(data);
        })
    }

    const actualizarStock = () => {
        productos.forEach((producto) => {
            const codigo = producto[0];
            const nuevoStock = producto[5] + producto[9];
            fetch(`http://localhost/feline-testing/public/main.php?query=6&codigo=${codigo}&nuevoStock=${nuevoStock}`)
            .then(response => response.json())
            .then(data => {
                eliminarProducto(codigo, props.id);
            })
            .catch(error => console.log(error));
        })
        eliminarLote();
        props.recargarLotes();
        setShowConfirmation(false)
        
        setMensaje("Stock ingresado");
        setShowAlert(true);
    }

    const eliminarProducto = (codigo, idLote) => {
        fetch(`http://localhost/feline-testing/public/main.php?query=25&lote=${idLote}&codProducto=${codigo}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {console.log('eliminado del lote')}
            })
            .catch((error) => console.log(error));
    };

    const eliminarLote = () => {
        fetch(`http://localhost/feline-testing/public/main.php?query=18&codigo_lote=${props.id}`)
          .then((response) => {
            if (!response.ok) {}
            return response.json();
          })
          .then((data) => {})
          .catch((error) => { console.log(error)
          });
      };

    return(
        <div>
            <button onClick={()=> setShowConfirmation(true)}
            className='text-sm my-[1px] text-black  transition duration-150 hover:bg-[#157c61] bg-[#93c47d]  font-bold w-[100%] py-2 md:px-4'>
            Confirmar
            </button>
        {showConfirmation && (
            <ConfirmationModal
            message={`¿Estás seguro de que deseas eliminar el Lote ${props.id}?`}
            botonPrimario={'Confirmar'}
            onConfirm={actualizarStock}
            onCancel={() => setShowConfirmation(false)}
            />
            
            )}
        {showAlert && (
            <AlertConfirm  mensaje={mensaje} 
            onCancel={setShowAlert(false)} />
        )}
        </div>
    )
}

export default ConfirmLote;