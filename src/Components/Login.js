import { Navigate, Link } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';
import { useState } from 'react';
import NavBar from './NavBar';

function Login() {

  const { incorrectCredentials, isAuthenticated, login } = useAuthContext();
  const [userRut, setUserRut] = useState('');
  const [magicWord, setMagicWord] = useState('');

  if (isAuthenticated) {    
    return <Navigate to={'/private'} />;
  }

  function handleRutChange(event) {
    setUserRut(event.target.value);    
  }

  function handlePasswordChange(event) {
    setMagicWord(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();    
    login(userRut, magicWord);
  }

  return (
    <div>
      {/* Color bg #ffb2e0 */}
      
      {/* <div className='mx-auto pt-40'> */}
        {/* Antiguo Login */}
        {/* <div className='admin bg-[#ffffff] flex flex-col align-center max-w-sm mx-auto my-auto '>
          <div className='mx-auto pt-4'>
            <h2 className='text-sm'>INICIO SESIÓN ADMINISTRACIÓN</h2>
          </div>

          

          <div className='mx-auto pt-2'>
            <form onSubmit={handleSubmit}>

              <div>
                <label htmlFor='userRut' className='text-sm'>RUT</label>
                <input id='userRut' type='text' value={userRut} onChange={handleRutChange} className='block border-2' />
              </div>

              <div>
                <label htmlFor='magicWord' className='text-sm'>CONTRASEÑA</label>
                <input id='magicWord' type='password' value={magicWord} onChange={handlePasswordChange} className='block border-2' />
              </div>

              <div className='py-2 flex justify-center'>
                <button type='submit' className='border-2 bg-pink-400 p-2 rounded-lg'>INGRESAR</button>
              </div>

            </form>
          </div>
        </div> */}
        {/* Cierre antiguo login */}
        {/* Nuevo login */}
        {/* <!-- min-h-screen --> */}
        <NavBar />
        
      <div className="overflow-hidden h-3/4 py-6 flex flex-col justify-center sm:py-24">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          {/* Background gradiente */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-teal-400 to-pink-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          {/* Cointainer */}
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            
            <div className="max-w-md mx-auto">
              <div className='text-center'>
                <h1 className="text-2xl font-semibold ">Administración</h1>
              </div>
              <div className='text-center'>
                <h1 className="text-2xl font-semibold">Iniciar sesión </h1>
              </div>

              <div className='mx-auto pt-2'>
                    {incorrectCredentials ? <h3 className='bg-pink-300  p-2 rounded-sm text-xl text-[#000] bold'>Acceso Denegado</h3> : null}
              </div>

              <div className="divide-y divide-gray-200">
                <div className="pt-8 pb-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    {/* RUT */}
                    <input autoComplete="off" 
                      id='userRut' type='text' value={userRut} onChange={handleRutChange}
                      // id="email" name="email" type="text" 
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
                      placeholder="RUT" />
                    <label htmlFor="userRut" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">RUT</label>
                  </div>
                  <div className="relative mt-8">
                    {/* Password */}
                    {/*  id='magicWord' type='password' value={magicWord} onChange={handlePasswordChange} */}
                    <input id='magicWord' type='password' value={magicWord} onChange={handlePasswordChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                    <label htmlFor="magicWord" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Contraseña</label>
                  </div>
                  <div className="relative">
                    <button className="bg-teal-400 hover:bg-pink-100 transition-all text-[#000] rounded-sm mt-4 px-4 py-1">Ingresar</button>
                  </div>
                  
                  </form>

                  <div>
                    <Link to={'/login/changePass'} className='text-[1rem] hover:text-[#f4a8d3]'>Cambiar contraseña</Link>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* Cierre nuevo login */}
      </div>
    // </div>
  );
}

export default Login;