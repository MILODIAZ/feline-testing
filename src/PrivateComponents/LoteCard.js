function LoteCard(props){   

  return (
    <div className={`flex justify-between items-center px-10 py-6 mt-2 rounded border-2 border-gray-400
    
    ${(()=>{switch(true){
      case props.dias_restantes>=3:
        return 'bg-[#fff2cc]'
      case props.dias_restantes<0:
        return 'bg-[#eb8792]'
      default:
        return 'bg-[#b6efb0]'
    }})()}
    
    `}>
        <div>
            <p className='text-[1.25rem] font-bold'>{props.id}</p>
        </div>
        <div className='w-[120px]'>
            <p className='whitespace-nowrap'>{props.proveedor}</p>
        </div>
        <div>
            <p>Pedido:</p>
            <p>{props.fecha_pedido}</p>
        </div>
        <div>
            <p>Llegada:</p>
            <p>{props.fecha_llegada}</p>
        </div>        
        <div>
          <p>Estado:</p>
          {
              (() => {
              switch (true) {
                  case (props.dias_restantes>1):
                    return <p>{props.dias_restantes} días restantes</p>;
                  case (props.dias_restantes===1):
                    return <p>1 día restante</p>;
                  case(props.dias_restantes===-1):
                    return <p>1 día atrasado</p>;
                  case (props.dias_restantes<-1):
                    return <p>{Math.abs(props.dias_restantes)} día(s) atrasado</p>;                    
                  default:
                    return <p>Llega hoy</p>;
              }
              })()
          }                                 
        </div>
        <div className='flex flex-row'>
          <div>
            <button className='text-sm text-white transition duration-150 hover:bg-[#157c61] bg-[#93c47d]  font-bold py-2 px-4 rounded-l'>Confirmar</button>
          </div>
          <div>
            <button className='text-sm text-white text-center transition duration-150 hover:bg-indigo-900 bg-blue-600 font-bold py-2 px-4 ml-1'>Detalle</button>
          </div>
          <div>
            <button className='text-sm text-white transition duration-150 hover:bg-red-900 bg-red-600 font-bold py-2 px-4 mx-1'>Eliminar</button>
          </div>
          <div>
            <button className='text-sm text-black transition duration-150 hover:bg-yellow-700 bg-yellow-500 font-bold py-2 px-4 rounded-r'>Modificar</button>
          </div>
        </div>
    </div>
  );   

}

export default LoteCard;