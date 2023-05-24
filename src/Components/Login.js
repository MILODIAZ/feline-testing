import { Navigate, Link } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';
import { useState } from 'react';

function Login(){

  const { incorrectCredentials, isAuthenticated, login } = useAuthContext(); 
  const [ userRut, setUserRut ] = useState('');
  const [ magicWord, setMagicWord ] = useState(''); 

  if (isAuthenticated) {
    console.log(isAuthenticated);
    return <Navigate to={'/private'} />;
  }  

  function handleRutChange(event){
    setUserRut(event.target.value);
  }

  function handlePasswordChange(event){    
    setMagicWord(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    login(userRut, magicWord);
  }

  return (

    <div className='admin bg-[#eeeeee] flex flex-col align-center'>
      <div>
        <Link to={'/'} className='text-sm underline'>Página principal</Link>
      </div>
      <div className='mx-auto pt-2'>
        <h2 className='font-bold'>INICIO SESIÓN ADMINISTRACIÓN</h2>
      </div>

      <div className='mx-auto pt-2'>
        {incorrectCredentials? <h3 className='bg-[#f87171] p-2 rounded-sm'>Acceso Denegado</h3> : null}
      </div>

      <div className='mx-auto pt-2'>
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor='userRut' className='font-bold text-sm'>RUT</label>
            <input id='userRut' type='text' value={userRut} onChange={handleRutChange} className='block border-2' />
          </div>

          <div>
            <label htmlFor='magicWord' className='font-bold text-sm'>CONTRASEÑA</label>
            <input id='magicWord' type='password' value={magicWord} onChange={handlePasswordChange} className='block border-2' />
          </div>

          <div className='py-2 flex justify-center'>
            <button type='submit' className='border-2 bg-blue-400 p-2 rounded-lg'>INGRESAR</button>
          </div>     
          
        </form>
      </div>      

    </div> 

  );
}

export default Login;