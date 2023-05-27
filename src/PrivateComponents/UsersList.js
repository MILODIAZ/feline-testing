import { useState, useEffect } from "react";

function UsersList () {

  /* LOGICA DE LISTAR Y ELIMINAR USUARIOS */

  const [dataLoaded, setDataLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  },[]);

  const loadData = () => {    
    fetch("http://localhost/feline-testing/public/postQueries.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `query=3`
    })
      .then(response => response.json())
      .then(data => {        
        setUsers(data);
        setDataLoaded(true);
      })
      .catch(error => console.log(error));
  };

  const deleteUser = (userRut) => {
    console.log(userRut);
    
    fetch("http://localhost/feline-testing/public/postQueries.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `query=4&user=${userRut}`
      })
        .then(response => response.json())
        .then(data => {    
          if(data===true){
            setDataLoaded(false);
            loadData();
          } else {
            alert('Error al eliminar al usuario');
          }
          
        })
        .catch(error => console.log(error)); 
    
  }

  /* LOGICA DE AGREGAR USUARIOS */

  const [userRut, setUserRut] = useState('');
  const [userName, setUserName] = useState('');

  function handleUserRutChange(event) {
    setUserRut(event.target.value);    
  }

  function handleUserNameChange(event) {
    setUserName(event.target.value);    
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost/feline-testing/public/postQueries.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `query=5&userRut=${userRut}&userName=${userName}`
    })
      .then(response => response.json())
      .then(data => {       
        
        if(data===true){          
          setUserRut('');
          setUserName('');
          loadData();
          alert("Usuario registrado con éxito");       
        } else {
          alert("Error al registrar usuario");
        }

      })
      .catch(error => console.log(error));
  }

  return(
    <div className='flex flex-col'>

      {dataLoaded ? (
        users.map(user => (
          (user[1]!=='Mirle Jaque' && user[0]!=='15912517-3')?
            <div key={user[0]} className='flex flex-row justify-between'>
            <p>{user[0]}</p>
            <p className='pl-8 text-left'>{user[1]}</p>
            <button onClick={() => deleteUser(user[0])} className='pl-8 underline text-red-500'>Eliminar</button>
            </div>
            :null          
        ))
      ) : null}

      <div>

        <h3 className='pt-4 font-bold'>Nuevo usuario</h3>

        <form onSubmit={handleSubmit}>

          <div className='flex flex-col'>
            <label htmlFor='userRut'>Rut</label>
            <input id='userRut' type='text' value={userRut} onChange={handleUserRutChange}></input>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='userName'>Nombre de usuario</label>
            <input id='userName' type='text' value={userName} onChange={handleUserNameChange}></input>
          </div>
          <div>
            <button className='underline text-blue-500'>+ Agregar</button>
          </div>
          
        </form>

      </div>    

      
            
    </div>
  );
}

export default UsersList;