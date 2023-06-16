import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

function LoteDetails(props){
    const [productos, setProductos] = useState([])

    useEffect(() => {
        datosProductos();
    }, []);

    const datosProductos = () => {
        fetch(`http://localhost/feline-testing/public/main.php?query=22&lote=L1`)
            .then(response => response.json())
            .then(data => {
                setProductos(data);
                console.log(data)
            })
            .catch(error => console.log(error));
    }

    return(
        <div className='fixed inset-0 z-[100] flex flex justify-center items-center'>    
            <div className='flex flex-col bg-[#f8efe6] h-[60%] w-[80%] p-2 border-2 border-black rounded-l'>  
                <div className='flex justify-end '>
                    <button onClick={() => props.handleClose()}>
                        <FaTimes className='text-3xl hover:text-[#a5d5d5]' />
                    </button>
                </div>
                {/* Seccion header con los detalles del lote */}
                <div className="px-4 flex gap-[6px]">
                    <h1 className="font-bold text-2xl px-4">Lote: {props.id}</h1>
                    <p>{props.proveedor}</p>
                        

                    <p>{props.fechaPedido}</p>
                    <p>{props.fechaLlegada}</p>
                    <input type="date" defaultValue={props.fechaPedido} />
<input type="date" defaultValue={props.fechaLlegada} />
                    <p>{props.diasRestantes}</p>
                </div>
                {/* Seccion body con los productos que posee el lote */}
                <div>
                    {productos.map(producto => (
                        <div key={producto[0]} className="flex gap-[5px]">
                            <h1>Codigo: {producto[0]}</h1>
                            <p>Proveedor: {producto[1]}</p>
                            <p>Nombre: {producto[2]}</p>
                            <p>Precio: {producto[4]}</p>
                            <p>Stock enviado: {producto[9]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default LoteDetails;