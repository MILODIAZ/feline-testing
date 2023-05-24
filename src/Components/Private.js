import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';

function Private(){

  const { userName, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='bg-[#eeeeee] flex flex-col justify-content-center h-screen'> 
      <div className='flex flex-row justify-between'>

        <div>
          <h2>Bienvenid@ {userName}</h2>
        </div>

        <div>
          <Link to={'/private/logout'} className='text-sm underline'>Cerrar Sesión</Link>
        </div>        

      </div>

      <div>
        <Link to={'/private'} className='text-sm underline'>Inventario</Link>
        <Link to={'/private/productos'} className='text-sm underline'>Productos</Link>
        <Link to={'/private/produccion'} className='text-sm underline'>Producción</Link>
      </div>

      <div>
        <Outlet />
      </div>
    </div>   
  );
}
  
export default Private;