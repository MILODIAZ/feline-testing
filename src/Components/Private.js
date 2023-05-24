import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';

function Private(){

  const { userName, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='flex flex-col justify-content-center h-screen'> 
      <div className='bg-[#eeeeee] flex flex-row justify-between'>

        <div>
          <h2>Bienvenid@ {userName}</h2>
        </div>

        <div>
          <Link to={'/private/logout'} className='text-sm underline'>Cerrar Sesión</Link>
        </div>

      </div>
    </div>   
  );
}
  
export default Private;