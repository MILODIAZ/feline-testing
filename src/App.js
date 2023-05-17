import './App.css';
import MainPage from './Components/MainPage';
import NosotrosPage from './Components/NosotrosPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>
  },
  {
    path:'/nosotros',
    element: <NosotrosPage/>
  },
  {
    path:'/admin',
    element: <h1>admin</h1>
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
