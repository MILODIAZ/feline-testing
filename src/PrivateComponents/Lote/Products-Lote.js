import { FaTimes } from "react-icons/fa";

function ProductoLote(props)  {

    const eliminarProducto = () => {
        const idLote = props.idLote;
        fetch(`http://localhost/feline-testing/public/main.php?query=25&lote=${idLote}&codProducto=${props.id}`)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              alert('Producto eliminado del lote');
              props.cargarProductos();
            }
          })
          .catch((error) => console.log(error));
      };

    return(
        <div key={props.id} 
                        className="flex bg-[#fc7494] border-solid border-[2px] border-[#000] text-xl items-center  h-[125px] m-6 space-x-8 rounded-[15px] overflow-hidden">
                            <img alt='product' className='rounded h-[125px] ' src={require(`../../productsImages/${props.id}.jpg`)} />
                            <p>Codigo: {props.id}</p> {/* Codigo Lote */}
                            <p>{props.nombre}</p>
                            <div className="flex-wrap  overflow-hidden"> 
                            <p>Stock enviado:</p>
                             {/* Stock enviado */}
                             <input className="w-[70%] bg-gray-100 text-gray-800 border border-gray-300 rounded-md px-4 py-2 hover:bg-white" type="number" defaultValue={props.stockEnviado} />
                            </div>
                            <button onClick={eliminarProducto}>
                                <FaTimes className='text-3xl hover:text-[#a5d5d5] transition-all'/>
                            </button>
        </div>
    )
}

export default ProductoLote;