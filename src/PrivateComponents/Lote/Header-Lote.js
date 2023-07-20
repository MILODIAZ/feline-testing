import { useEffect, useState } from "react";
import ModHeader from "./ModHeader"
function HeaderLote(props) {

    const [OpenModHeader, setOpenModHeader] = useState(false);
    const [loteData, setLoteData] = useState([]);
    const [codigoLote , setCodigoLote] = useState(props.id)
    const handlOpenModHeader = () => {
        setOpenModHeader(!OpenModHeader);
    };
    useEffect(() => {
        dataLote()
    },[])

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

    const reloadData = (newCodigoLote) =>{
        setCodigoLote(newCodigoLote)
        dataLote()
    }
    return (
        <div>
            {OpenModHeader && (
                <ModHeader
                    handleClose={handlOpenModHeader}
                    recargarDatos={reloadData}
                    id={codigoLote}
                    fechaPedido={loteData.fecha_pedido}
                    fechaLlegada={loteData.fecha_llegada}
                />
            )}
            <div className="text-center justify-center mb-[20px] items-center bg-[#fc7494] font-bold border-solid border-[2px] border-[#000] rounded-[10px]">
                <div className=" text-xl mb-[20px] mt-[20px]">
                        <p>Numero de lote: {codigoLote}</p> {/* Código del lote */}
                </div>
                <div className="text-l grid grid-cols-3 h-[70%] mb-[20px]">
                    <div>Fecha del pedido: {loteData.fecha_pedido}</div>
                    <div>Fecha de llegada: {loteData.fecha_llegada}</div>
                    <p>Días de retrasos: {Math.abs(props.diasRestantes)}</p>
                    
                </div>
                <button onClick={handlOpenModHeader}
                    className="bg-[#54e9d1] w-[150px] font-bold h-[50px] m-auto border-solid border-[2px] border-[#000] rounded-[10px] mb-[20px]">
                    Modificar Datos
                </button>
            </div>
        </div>

    )
}


export default HeaderLote;