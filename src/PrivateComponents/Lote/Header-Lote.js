import { useState } from "react";
import ModHeader from "./ModHeader"
function HeaderLote(props) {

    const [OpenModHeader, setOpenModHeader] = useState(false);

    const handlOpenModHeader = () => {
        setOpenModHeader(!OpenModHeader);
    };

    return (
        <div>
            {OpenModHeader && (
                <ModHeader
                    handleClose={handlOpenModHeader}
                    id={props.id}
                    fechaPedido={props.fechaPedido}
                    fechaLlegada={props.fechaLlegada}
                />
            )}
            <div className="text-center justify-center mb-[20px] items-center bg-[#fc7494] font-bold border-solid border-[2px] border-[#000] rounded-[10px]">
                <div className=" text-xl mb-[20px] mt-[20px]">
                    <p>Numero de lote: {props.id}</p> {/* Código del lote */}
                </div>
                <div className="text-l grid grid-cols-3 h-[70%] mb-[20px]">
                    <div>Fecha del pedido: {props.fechaPedido}</div>
                    <div>Fecha de llegada: {props.fechaLlegada}</div>
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