import { useState, useEffect } from "react";
import LoteCard from "./Lote/Card-Lote";

function SeguimientoPedidos () {

  const [lotesData, setLotesData ] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [filtroRetraso, setFiltroRetraso] = useState('todos');
  
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

  const handleFiltroChange = (event) => {
    setFiltroRetraso(event.target.value);
  };

  const filtroLotesPorRetraso = (lotes) => {
    switch(filtroRetraso){
      case 'atrasado':
        return lotes.filter(lote => lote[4] < 0);
      case 'sin-retraso':
        return lotes.filter(lote => lote[4] >= 3);
      default:
        return lotes;
    }
  }

  const reloadProducts = () => {
    loadLotes();
  }

  const lotesFiltrados = filtroLotesPorRetraso(lotesData);
  return(
    <div className='xl:px-40'>
      <div className='py-4 pl-10'>
        <p className='text-xl font-bold'>SEGUIMIENTO DE PEDIDOS</p>
      </div>
      
      <div  className='px-8 grid grid-cols-2 md:grid-cols-8 xl:grid-cols-8 gap-2 mt-4'>
        <label htmlFor="filtroRetraso" className="mr-2">
          <h5 className="text-xl">Filtrar por retraso:</h5>
        </label>
        <select
          className=' px-4 py-2 w-[80%] rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-md' 
          id="filtroRetraso"
          value={filtroRetraso}
          onChange={handleFiltroChange}
        >
          <option value="todos">Todos</option>
          <option value="atrasado">Atrasado</option>
          <option value="sin-retraso">Sin retraso</option>
        </select>
      </div>

      {dataLoaded ? 
        lotesFiltrados.map(lote => (                    
          <LoteCard key={lote[0]} cargarProductos={reloadProducts} id={lote[0]} proveedor={lote[1]==null? 'SIN PROVEEDOR' : lote[1]} fecha_pedido={lote[2]} fecha_llegada={lote[3]} dias_restantes={lote[4]} />                     
        )) : <h1>Cargando...</h1>}        
    </div>
  );
}

export default SeguimientoPedidos;