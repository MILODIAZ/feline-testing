import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';
import AdministracionUsuarios from '../PrivateComponents/AdministracionUsuarios';
import { useEffect, useState } from 'react';

const linksStyles='text-[1rem] w-2/6 py-2 text-center border-black border-e border-t-[1px] border-b-[2px] bg-white rounded-t-lg';

function Private(){

  const [showUserAdmin, setShowUserAdmin] = useState(false);
  const [showSliderMod, setShowSliderMod] = useState(true);
  const { userName, userRut, isAuthenticated } = useAuthContext();

  /*useEffect(() => {
    updateTabOnRefresh();
  }, []);*/

  const updateTabOnRefresh = () => {
    const lastDir = obtenerUltimoDirectorio();
    const links = document.querySelectorAll("#adminMainTabs a");
    links.forEach(element => {
      element.classList.remove('adminMainSelectedTab');
    });
    switch(lastDir) {
      case "productos":
        document.querySelector('p[innerHTML="PRODUCTOS"]').classList.add("adminMainSelectedTab");
        break;
      case "producción":
        document.querySelector('p[innerHTML="PRODUCCIÓN"]').classList.add("adminMainSelectedTab");
        break;
      default:
        document.querySelector('p[innerHTML="INVENTARIO"]').classList.add("adminMainSelectedTab");
        break;
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  function obtenerUltimoDirectorio() {
    const url = window.location.href;
    const partes = url.split('/');
    const ultimoDirectorio = partes[partes.length - 1];
    return ultimoDirectorio;
  }  

  const tabSelectorMarkup = (event) => {
    const links = document.querySelectorAll("#adminMainTabs a");
    links.forEach(element => {
      element.classList.remove('adminMainSelectedTab');
    });
    event.target.classList.add('adminMainSelectedTab');
  }

  

  const showUserAdminContainer = () => {
    /*const userAdminContainer = document.querySelector('#usersAdminContainer');

    userAdminContainer.classList.remove('invisible');
    userAdminContainer.classList.remove('opacity-0'); */
    if (showUserAdmin){
      setShowUserAdmin(false);
    } else {
      setShowUserAdmin(true);
    }
  }

  //Diapositivas
  

  const openSliderMod = () => {
    if(showSliderMod){
      setShowSliderMod(false);
    } else {
      setShowSliderMod(true);
    }
    console.log(showSliderMod);
  }

  return (
    <div className='bg-[#b0efef] flex flex-col justify-content-center h-screen'> 
      <div className='flex flex-row justify-between pb-16'>

        <div className='pt-2 pl-4 text-[2.5rem]'>
          <h2>Bienvenid@ {userName}</h2>
        </div>

        <div className='flex flex-row'>
          <div>
            <button onClick={openSliderMod} className='text-sm text-white transition duration-150 hover:bg-yellow-700 bg-yellow-500 font-bold py-2 px-4 rounded m-3'>Diapositivas</button>
          </div>
          <div className='flex flex-col'>
          <Link to={'/private/logout'} className='text-sm text-white text-center transition duration-150 hover:bg-red-900 bg-red-600 font-bold py-2 px-4 rounded m-3'>Cerrar Sesión</Link>
          {(userName==='Mirle Jaque' && userRut==='15912517-3')?
            <button onClick={showUserAdminContainer} className='text-sm text-white text-center transition duration-150 hover:bg-indigo-900 bg-blue-600 font-bold py-2 px-4 rounded m-3'>Administrar Usuarios</button>
            : null}          
          </div>

        </div>

        

        {(userName==='Mirle Jaque' && userRut==='15912517-3' && showUserAdmin)?
          <AdministracionUsuarios handleClick={showUserAdminContainer} />
          : null}            

      </div>

      <div id='adminMainTabs' className='flex justify-between'>
        <Link to={'/private'} className={`adminMainSelectedTab ${linksStyles}`} onClick={tabSelectorMarkup}>INVENTARIO</Link>
        <Link to={'/private/productos'} className={linksStyles} onClick={tabSelectorMarkup}>PRODUCTOS</Link>
        <Link to={'/private/produccion'} className={linksStyles} onClick={tabSelectorMarkup}>PRODUCCIÓN</Link>
      </div>

      <div className='bg-[#ffe5f0]'>
        <Outlet />
      </div>
    </div>   
  );
}
  
export default Private;