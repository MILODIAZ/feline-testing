import LoteDetails from "./Details-Lote";
import { useState, useEffect } from "react";
import ConfirmationModal from "../Extras/ModalConfirm";
import AlertConfirm from "../Extras/AlertConfirm";
import ConfirmLote from "./Confirm/Confirm-Lote"

function LoteCard(props) {

  const [showAlert, setShowAlert] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [loteData, setLoteData] = useState([]); 
  const [codigoLote , setCodigoLote] = useState(props.id)
  const [openDetailLote, setOpenDetailLote] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const eliminarLote = () => {
    setShowConfirmation(false);
    eliminarContenido();
    
    fetch(`http://localhost/feline-testing/public/main.php?query=18&codigo_lote=${props.id}`)
      .then((response) => {
        if (!response.ok) {
          setMensaje("Error en la solicitud");
          setShowAlert(true);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setMensaje("Lote eliminado");
          setShowAlert(true);
          props.cargarProductos();
        }
      })
      .catch((error) => {
        setMensaje("UPS, ocurrio un error");
        setShowAlert(true);
      });
  };

  useEffect(() => {
    dataLote()
  },[])

  const reloadData = () => {
    dataLote();
  }


  const dataLote = () => {
    fetch(`http://localhost/feline-testing/public/main.php?query=31&codigo=${codigoLote}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLoteData(data[0]);
        } else if (!Array.isArray(data)) {
          // Si data es un objeto, úsalo directamente
          setLoteData(data);
      }})
  }

  const eliminarContenido = () => {
    setShowConfirmation(false);
    console.log(props.id);
    fetch(`http://localhost/feline-testing/public/main.php?query=26&codigo_lote=${props.id}`)
      .then((response) => {
        if (!response.ok) {
          setMensaje("Error en la solicitud");
          setShowAlert(true);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setMensaje("Producto eliminado");
          setShowAlert(true);
          props.cargarProductos();
        }
      })
      .catch((error) => {
        setMensaje("UPS, ocurrio un error");
        setShowAlert(true);
      });
  };

  const handleOpenDetailLote = () => {
    if (openDetailLote) {
      setOpenDetailLote(false);
    } else {
      setOpenDetailLote(true);
    }
    props.recargarProductos;
  }

  const [loteId, setLoteId] = useState('');
  const [loteProveedor, setLoteProveedor] = useState('');
  const [loteFechaPedido, setLoteFechaPedido] = useState('');
  const [loteFechaLlegada, setLoteFechaLlegada] = useState(0);
  const [loteDiasRestantes, setLoteDiasRestantes] = useState(0);

  return (


    <div className={`flex justify-between items-center px-4 xl:px-10 py-6 mt-2 rounded border-2 border-gray-400
    
    ${(() => {
        switch (true) {
          case loteData.dias_restantes >= 3:
            return 'bg-[#fff2cc]'
          case loteData.dias_restantes < 0:
            return 'bg-[#eb8792]'
          default:
            return 'bg-[#b6efb0]'
        }
      })()}
          
          `}>
      {/* Abre y redirecciona a una carta con los detalles del lote */}
      {(openDetailLote) ? <LoteDetails handleClick={handleOpenDetailLote} id={loteId} proveedor={loteProveedor} fechaPedido={loteFechaPedido} fechaLlegada={loteFechaLlegada} diasRestantes={loteDiasRestantes} recargarData={props.cargarProductos} recargarDatos={reloadData} handleClose={handleOpenDetailLote} /> : null}

      <div className="md:w-[5%] text-center">
        <p className='text-[1.25rem] font-bold'>{loteData.codigo}</p>
      </div>
      <div className='w-[10%]'>
        <p className='whitespace-nowrap md:text-xl'>{loteData.nombre_proveedor == null ? 'SIN PROVEEDOR' : loteData.nombre_proveedor}</p>
      </div>
      <div className="w-[10%]">
        <p className="font-bold">Pedido:</p>
        <p>{loteData.fecha_pedido}</p>
      </div>
      <div className="w-[10%]">
        <p className="font-bold">Llegada:</p>
        <p>{loteData.fecha_llegada}</p>
      </div>
      <div className="w-[10%]">
        <p className="font-bold">Estado:</p>
        {
          (() => {
            switch (true) {
              case (loteData.dias_restantes > 1):
                return <p>{loteData.dias_restantes} días restantes</p>;
              case (loteData.dias_restantes === 1):
                return <p>1 día restante</p>;
              case (loteData.dias_restantes === -1):
                return <p>1 día atrasado</p>;
              case (loteData.dias_restantes < -1):
                return <p>{Math.abs(loteData.dias_restantes)} día(s) atrasado</p>;
              default:
                return <p>Llega hoy</p>;
            }
          })()
        }
      </div>
      <div className='flex flex-col w-[20%] md:w-[10%] md:flex-wrap'>
        {/* Confirmar */}
        <div>
          <ConfirmLote recargarLotes={props.cargarProductos} id={loteData.codigo}/>
        </div>
        {/* Detalles */}
        <button
          onClick={() => {
            handleOpenDetailLote();
            setLoteId(loteData.codigo);
            setLoteProveedor(loteData.nombre_proveedor == null ? 'SIN PROVEEDOR' : loteData.nombre_proveedor);
            setLoteFechaPedido(loteData.fecha_pedido);
            setLoteFechaLlegada(loteData.fecha_llegada);
            setLoteDiasRestantes(loteData.dias_restantes);
          }}
          className="text-sm my-[1px] text-white text-center transition duration-150 hover:bg-indigo-900 bg-blue-600 font-bold w-[100%] py-2 md:px-4">
          Detalles
        </button>
        {/* Eliminar */}
        <div>
          <button onClick={() => setShowConfirmation(true)} className='text-sm my-[1px] text-white transition duration-150 hover:bg-red-900 bg-red-600 font-bold w-[100%] py-2 md:px-4'>Eliminar</button>
        </div>
        {showConfirmation && (
          <ConfirmationModal
            message={`¿Estás seguro de que deseas eliminar el Lote ${codigoLote}?`}
            botonPrimario={'Eliminar'}
            onConfirm={eliminarLote}
            onCancel={() => setShowConfirmation(false)}
          />

        )}
      </div>
    </div>
  );

}

export default LoteCard;