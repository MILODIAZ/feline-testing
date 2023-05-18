import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import CategoriesNav from './CategoriesNav';
import HomeMain from './HomeMain';

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
    </div>
  );
}

export default MainPage;
