
function HeaderLote(props){
    
    return(
        <div className="px-4 flex gap-[6px] h-[20%] bg-white">
            <p className="font-bold text-2xl   px-4">Lote:</p>
            <input type="text" defaultValue={props.id} />
            <input type="date" defaultValue={props.fechaPedido} />
            <input type="date" defaultValue={props.fechaLlegada} />
            <input type='text' defaultValue={props.diasRestantes}/>
        </div>
        )
}


export default HeaderLote;