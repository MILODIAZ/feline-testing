import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar';
import CategoriesNav from './CategoriesNav';

function MainPage(props) {
  return (
    <div>
      <NavBar />
      <CategoriesNav />
      <main className='min-h-[600px]'>
        <div>
          <div>
            <Outlet />
          </div>
        </div>
      </main>
      
      <footer className='bg-[#56efd3] min-h-[185px]'>
        <CategoriesNav />
        <div className='fixed bottom-3 right-10'>
          <Link className='inline-flex items-center rounded-md bg-[#b6efb0] px-6 py-3 
        text-2xl font-medium text-white-700 bold shadow-lg
         ring-1 ring-inset ring-pink-700/10' to={'/login'}>Login</Link>
        </div>
        
      </footer>
    </div>
  );
}
export default MainPage;
