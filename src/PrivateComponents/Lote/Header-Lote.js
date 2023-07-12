
function HeaderLote(props) {

    return (
        <div className="text-center justify-center mb-[20px] items-center ">
            <div className=" bg-[#fc7494] font-bold border-solid border-[2px] border-[#000] rounded-[10px] ">
                <div className=" text-xl mb-[20px] ">
                    <p>Numero de lote: {props.id}</p> {/* Código del lote */}
                </div>
                <div className="grid grid-cols-3 h-[70%] mb-[20px]">
                    <input className="bg-[#fc7494] m-auto" type="date" defaultValue={props.fechaPedido} />
                    <input className="bg-[#fc7494]  m-auto" type="date" defaultValue={props.fechaLlegada} />
                    <p>Días de retrasos: {props.diasRestantes}</p>
                </div>
                <button className="bg-[#54e9d1] w-[250px] font-bold h-[50px] m-auto border-solid border-[2px] border-[#000] rounded-[10px] mb-[20px]">
                    Modificar Fechas
                </button>
            </div>
        </div>

    )
}


export default HeaderLote;