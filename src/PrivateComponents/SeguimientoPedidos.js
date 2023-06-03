import { useState, useEffect } from "react";
import LoteCard from "./LoteCard";

function SeguimientoPedidos () {

  const [lotesData, setLotesData ] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(true);

  useEffect(() => {
    loadLotes();
  },[]);

  const loadLotes = () => {
    fetch(`http://localhost/feline-testing/public/main.php?query=14`)
      .then(response => response.json())
      .then(data => {
        setLotesData(data);
        setDataLoaded(true);
      })
      .catch(error => console.log(error));
  }

  return(
    <div className='px-60'>
      <div className='py-4 pl-10'>
        <p className='text-xl font-bold'>SEGUIMIENTO DE PEDIDOS</p>
      </div>

      {dataLoaded ? 
        lotesData.map(lote => (                    
          <LoteCard id={lote[0]} proveedor={lote[1]==null? 'SIN PROVEEDOR' : lote[1]} fecha_pedido={lote[2]} fecha_llegada={lote[3]} dias_restantes={lote[4]} />                     
        )) : <h1>Cargando...</h1>}        
    </div>
  );
}

export default SeguimientoPedidos;