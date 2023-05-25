import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar';
import CategoriesNav from './CategoriesNav';

function MainPage(props) {
  return (
    <div>
      <NavBar />
      <CategoriesNav />
      <main>
        <div>
          <div>
            <Outlet />
          </div>
        </div>
      </main>
      <footer>
        <Link to={'/login'}>Login</Link>
      </footer>
    </div>
  );
}

export default MainPage;
