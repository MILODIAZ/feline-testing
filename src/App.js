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
    path:'/admin',
    element: <h1>ADMIN</h1>
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
