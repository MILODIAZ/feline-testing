function ProductoLote(props)  {

    return(
        <div key={props.id} 
                        className="flex bg-[#09f] text-xl items-center  h-[125px] m-6 space-x-8">
                            <img alt='product' className='rounded h-[125px] ' src={require(`../../productsImages/${props.id}.jpg`)} />
                            <p>Codigo: {props.id}</p> {/* Codigo Lote */}
                            <p>Nombre: {props.nombre}</p>
                            <div className="flex-wrap  overflow-hidden"> 
                            <p>Stock enviado:</p>
                            <input className="w-[70%]" type="number" defaultValue={props.stockEnviado} /> {/* Stock enviado */}
                            </div>
                        </div>
    )
}

export default ProductoLote;