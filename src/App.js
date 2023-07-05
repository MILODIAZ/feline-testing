import './App.css';
import MainPage from './Components/MainPage';
import HomeMain from './Components/HomeMain';
import CategorieMain from './Components/CategorieMain';
import NosotrosMain from './Components/NosotrosMain';
import Login from './Components/Login';
import CambioContraseña from './Components/CambioContraseña';
import PrivateRoute from './Components/PrivateRoute';
import Private from './Components/Private';
import Inventario from './PrivateComponents/Inventario';
import Productos from './PrivateComponents/Products/Productos';
import Producción from './PrivateComponents/Producción';
import Logout from './Components/Logout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthContextProvider from './Contexts/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>,
    children: [
      {
        index: true,
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
    element: <Login />           
  },
  {
    path:'/login/changePass',
    element: <CambioContraseña />
  },
  {
    path:'/private',
    element: <PrivateRoute />,
    children: [
      {
        path:'',
        element:<Private />,
        children: [
          {
            path:'',
            element:<Inventario />
          },
          {
            path:'/private/productos',
            element:<Productos />
          },
          {
            path:'/private/produccion',
            element:<Producción />
          }
        ]
      },
      {
        path:'/private/logout',
        element:<Logout />
      }
    ]
  }
]);

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>      
    </div>
  );
}

export default App;
