import './App.css';
import HomePage from './Components/HomePage';
import NosotrosPage from './Components/NosotrosPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
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
