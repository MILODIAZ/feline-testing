import NavBar from "./NavBar";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function CambioContraseña(){

  const [userRut, setUserRut] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  function handleUserRutChange(event) {
    setUserRut(event.target.value);    
  }

  function handleCurrentPassChange(event) {
    setCurrentPass(event.target.value);   
  }

  function handleNewPassChange(event) {
    setNewPass(event.target.value);   
  }

  function handleConfirmNewPassChange(event) {
    setConfirmNewPass(event.target.value);    
  }

  function changePass (userRut, newPass) {
    fetch("http://localhost/feline-testing/public/postQueries.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `query=2&rut=${userRut}&newPass=${newPass}`
    })
      .then(response => response.json())
      .then(data => {       
        
        if(data===true){
          setIncorrectCredentials(false);
          setUserRut('');
          setCurrentPass('');
          setNewPass('');
          setConfirmNewPass('');
          alert("Contraseña cambiada exitosamente");       
        } else {
          alert("Error al cambiar la contraseña")
        }

      })
      .catch(error => console.log(error));
  }

  function validateCurrentRutPass (userRut, currentPass, newPass) {
    fetch("http://localhost/feline-testing/public/postQueries.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `query=1&usuario=${userRut}&pass=${currentPass}`
    })
      .then(response => response.json())
      .then(data => {        

        if(data[0][0]===true){
          changePass(userRut, newPass);
        } else {
          setIncorrectCredentials(true);
        }

      })
      .catch(error => console.log(error));
  }

  function handleSubmit(event){
    event.preventDefault();    
    if(newPass===confirmNewPass){  
      validateCurrentRutPass(userRut, currentPass, newPass);
    }else{
      setIncorrectCredentials(true);      
    }
  }

  return(
    <div>
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
                <h1 className="text-2xl font-semibold">Cambio de contraseña</h1>
              </div>

              <div className='mx-auto pt-2'>
                    {incorrectCredentials ? <h3 className='bg-pink-300  p-2 rounded-sm text-xl text-[#000] bold'>Credenciales incorrectas</h3> : null}
              </div>

              <div className="divide-y divide-gray-200">
                <div className="pt-8 pb-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <form onSubmit={handleSubmit}>

                    <div className="relative">                     
                      <input autoComplete="off" 
                        id='RUT' type='text' value={userRut} onChange={handleUserRutChange}                        
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
                        placeholder="RUT" />
                      <label htmlFor="RUT" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">RUT</label>
                    </div>

                    <div className="relative mt-8">                    
                      <input autoComplete="off" 
                        id='oldPassword' type='password' value={currentPass} onChange={handleCurrentPassChange}                        
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
                        placeholder="Contraseña actual" />
                      <label htmlFor="oldPassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Contraseña actual</label>
                    </div>

                    <div className="relative mt-8">                     
                      <input id='newPassword' type='password' value={newPass} onChange={handleNewPassChange}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                      <label htmlFor="newPassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Contraseña nueva</label>
                    </div>

                    <div className="relative mt-8">                      
                      <input id='confirmNewPassword' type='password' value={confirmNewPass} onChange={handleConfirmNewPassChange}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                      <label htmlFor="confirmNewPassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirmar contraseña nueva</label>
                    </div>

                    <div className="relative">
                      <button className="bg-teal-400 hover:bg-pink-100 transition-all text-[#000] rounded-sm mt-4 px-4 py-1">Cambiar</button>
                    </div>
                  
                  </form>
                  
                  <div>
                    <Link to={'/login'} className='text-[1rem] hover:text-[#f4a8d3]'>Volver a Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      

    </div>      
  );
    
}

export default CambioContraseña;