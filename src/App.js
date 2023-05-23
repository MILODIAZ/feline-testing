import './App.css';
import MainPage from './Components/MainPage';
import HomeMain from './Components/HomeMain';
import CategorieMain from './Components/CategorieMain';
import NosotrosMain from './Components/NosotrosMain';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>,
    children: [
      {
        path: '/',
        element: <HomeMain />
      },
      {
        path: '/:categorieID',
        element: <CategorieMain />
      },
      {
        path: '/Nosotros',
        element: <NosotrosMain />
      }
    ]
  },  
  {
    path:'/login',
    element: <h2>administracion</h2>,
    isPrivate: true    
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
