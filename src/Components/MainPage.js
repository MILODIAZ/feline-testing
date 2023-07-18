import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar';


function MainPage(props) {

  return (
    <div>
      <NavBar />

      <main className='min-h-[600px]'>
        <div>
          <div>
            <Outlet />
          </div>
        </div>
      </main>

      <footer className='bg-[#56efd3] items-center'>
        <ul className='text-center grid grid-cols-3 mb-3'>
          <li><Link to={'/'} className={'text-[1.5rem] p-3.5 hover:text-white transition-all'}>INICIO</Link></li>
          <li><Link to={'/Nosotros'} className={'text-[1.5rem] p-3.5 hover:text-white transition-all'}>NOSOTROS</Link></li>
          <li><a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/tienda_feline/' className={'text-[1.5rem] p-3.5 hover:text-white transition-all'}>INSTAGRAM</a></li>
        </ul>
        <div className='text-center'>
          <Link className='' to={'/login'}>Administración</Link>
        </div>

      </footer>
    </div>
  );
}
export default MainPage;
