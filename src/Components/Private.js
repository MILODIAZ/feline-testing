import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';

const linksStyles='text-[1rem] w-2/6 py-2 text-center border-black border-e border-y-[1px]';

function Private(){

  const { userName, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  const tabSelectorMarkup = (event) => {
    const links = document.querySelectorAll("#adminMainTabs a");
    links.forEach(element => {
      element.classList.remove('adminMainSelectedTab');
    });
    event.target.classList.add('adminMainSelectedTab');
  }

  return (
    <div className='bg-white flex flex-col justify-content-center h-screen'> 
      <div className='flex flex-row justify-between mb-16'>

        <div className='text-[2.5rem]'>
          <h2>Bienvenid@ {userName}</h2>
        </div>

        <div>
          <Link to={'/private/logout'} className='pr-3 underline text-[1.5rem]'>Cerrar Sesión</Link>
        </div>        

      </div>

      <div id='adminMainTabs' className='flex justify-between border'>
        <Link to={'/private'} className={`adminMainSelectedTab ${linksStyles}`} onClick={tabSelectorMarkup}>INVENTARIO</Link>
        <Link to={'/private/productos'} className={linksStyles} onClick={tabSelectorMarkup}>PRODUCTOS</Link>
        <Link to={'/private/produccion'} className={linksStyles} onClick={tabSelectorMarkup}>PRODUCCIÓN</Link>
      </div>

      <div className='bg-[#eeeeee]'>
        <Outlet />
      </div>
    </div>   
  );
}
  
export default Private;