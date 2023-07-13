import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

function NewLote(props){

    const [providers, setProviders] = useState([]);
    const [codigo, setCodigo] = useState([]);
    const [nombreProveedor, setNombreProveedor] = useState([]);
    const [fechaPedido, setFechaPedido] = useState([]);
    const [fechaLlegada, setFechaLlegada] = useState([]);


    useEffect(() => {
        dataProviders();
        // Evita que la pagina haga scroll
        document.body.style.overflow = 'hidden';
        return () => {
        document.body.style.overflow = 'auto';
        };
    }, []);

    const dataProviders = () => {
    fetch("http://localhost/feline-testing/public/main.php?query=5")
        .then(response => response.json())
        .then(data => {
            setProviders(data);
        })
        .catch(error => console.log(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(nombreProveedor, codigo, fechaLlegada, fechaPedido)
        fetch(`http://localhost/feline-testing/public/main.php?query=27&codigo=${codigo}&nombre_proveedor=${nombreProveedor}&fecha_pedido=${fechaPedido}&fecha_llegada=${fechaLlegada}`)
        .then(response => response.json())
        .then(data => {
            props.reloadLotes(true);
            console.log(data);
        })
    }
    return(
        <div className="fixed z-[60] h-[100%] w-[100%] bg-[#ffe5f0] p-4"> 
            <div className="flex justify-end">
                <button onClick={props.handleClose}>
                    <FaTimes className="text-4xl"/>
                </button>
            </div>
            <h1> New lote</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="codigo">Codigo:</label>
                     <input type="text" id="codigo" name="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} />
                </div>
                
                <div>
                    <label htmlFor="fechaPedido">Fecha de Pedido:</label>
                    <input type="date" id="fechaPedido" name="fechaPedido" value={fechaPedido} onChange={e => setFechaPedido(e.target.value)} />
                </div>
                
                <div>
                    <label htmlFor="fechaLlegada">Fecha de Llegada:</label>
                    <input type="date" id="fechaLlegada" name="fechaLlegada" value={fechaLlegada} onChange={e => setFechaLlegada(e.target.value)} />
                </div>
                
                <div>
                    <label htmlFor="proveedor">Proveedor:</label>
                    <select id="proveedor" name="proveedor" onChange={(e) => setNombreProveedor(e.target.value)}>
                    {providers.map((provider) => (
                        <option key={provider[0]} value={provider[0]}>
                        {provider[0]}
                        </option>
                    ))}
                    </select>
                </div>
                <button type="submit">Crear Lote</button>
            </form>
        </div>
        
    )
}


export default NewLote;
