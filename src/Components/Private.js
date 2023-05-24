import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';

function Private(){

  const { userName, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <h2>Welcome {userName}</h2>
      <Link to={'/private/logout'}>Cerrar Sesión</Link>
    </div>   
  );
}
  
export default Private;