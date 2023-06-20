import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ProductoLote from "./lote/productoLote";
import HeaderLote from "./lote/headerLote";

function LoteDetails(props) {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        datosProductos();
    }, []);

    const datosProductos = () => {
        fetch(`http://localhost/feline-testing/public/main.php?query=22&lote=${props.id}`)
            .then(response => response.json())
            .then(data => {
                setProductos(data);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='fixed inset-0 z-[100] flex flex justify-center items-center'>
            <div className='flex flex-col bg-[#f8efe6] h-[60%] w-[80%] p-2 border-2 border-black rounded-l'>
                <div className='flex justify-end '>
                    <button onClick={() => props.handleClose()}>
                        <FaTimes className='text-3xl hover:text-[#a5d5d5]' />
                    </button>
                </div>
                {/* Componente que contiene los detalles del Lote */}
                <HeaderLote 
                    id={props.id}
                    nombreProveedor={props.proveedor} 
                    fechaPedido={props.fechaPedido} 
                    fechaLlegada={props.fechaLlegada} 
                    diasRestantes={props.diasRestantes}  
                />
                {/* Seccion body con los productos que posee el lote */}
                <div className="bg-teal-400 grid grid-cols-2  h-[70%]">
                    {productos.map(producto => (
                        // Componente que contiene los productos de un lote
                        <ProductoLote id={producto[0]} nombre={producto[2]} stockEnviado={producto[9]} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default LoteDetails;