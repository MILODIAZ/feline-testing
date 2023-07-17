import { useState, useEffect } from "react";
import AlertConfirm from "../Extras/AlertConfirm";
function UsersList(props) {

  /* LOGICA DE LISTAR Y ELIMINAR USUARIOS */
  const [showAlert, setShowAlert] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleConfirm = () => {
    setShowAlert(false);
    props.handleClose()
  }
  const [dataLoaded, setDataLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

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
    fetch("http://localhost/feline-testing/public/postQueries.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `query=4&user=${userRut}`
    })
      .then(response => response.json())
      .then(data => {
        if (data === true) {
          setDataLoaded(false);
          loadData();
          setMensaje("Usuario eliminado");
          setShowAlert(true);
        } else {
          setMensaje("Error al eliminar usuario.");
          setShowAlert(true);
        }

      })
      .catch(error => {
        setMensaje("UPS, ocurrio un error");
        setShowAlert(true);
      });

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
    if (validarRut(userRut)) {
      fetch("http://localhost/feline-testing/public/postQueries.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `query=5&userRut=${userRut}&userName=${userName}`
      })
        .then(response => response.json())
        .then(data => {

          if (data === true) {
            setUserRut('');
            setUserName('');
            loadData();
            setMensaje("Usuario agregado.");
            setShowAlert(true);
          } else {
            setMensaje("Error al registrar usuario.");
            setShowAlert(true);
          }

        })
        .catch(error => {
          setMensaje("UPS, ocurrio un error");
          setShowAlert(true);
        });
    } else {
      setMensaje("RUT no valido.");
      setShowAlert(true);;
    }

  }

  const validarRut = (rut) => {
    // Eliminar puntos y guiones del RUT
    rut = rut.replace(/\./g, '');
    if (!rut.includes('-')) {
      rut = rut.slice(0, -1) + '-' + rut.slice(-1);
    }

    // Verificar que el RUT tenga el formato correcto
    const rutRegex = /^0*(\d{1,3}(\.?\d{3})*) \-?([\dkK])$/;
    if (!rutRegex.test(rut)) {
      return false;
    }

    // Separar el dígito verificador del cuerpo del RUT
    const [cuerpo, digitoVerificador] = rut.split('-');
    console.log(digitoVerificador);

    // Verificar que el dígito verificador exista
    if (!digitoVerificador) {
      return false;
    }

    // Calcular el dígito verificador esperado
    let suma = 0;
    let factor = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += factor * parseInt(cuerpo.charAt(i), 10);
      factor = factor >= 7 ? 2 : factor + 1;
    }
    const digitoEsperado = 11 - (suma % 11);
    const digitoCalculado = digitoEsperado === 11 ? '0' : digitoEsperado === 10 ? 'K' : digitoEsperado.toString();

    // Comparar el dígito verificador ingresado con el calculado
    return digitoVerificador.toUpperCase() === digitoCalculado;
  };

  return (
    <div className='flex flex-col'>


      <div className='relative overflow-y-scroll min-h-[150px] min-w-[480px]'>
        <div className='absolute w-full'>
          {dataLoaded ? (
            users.map(user => (
              (user[1] !== 'Mirle Jaque' && user[0] !== '15912517-3') ?
                <div key={user[0]} className='flex flex-row justify-between pt-2'>
                  <div className='flex flex-row justify start'>
                    <p className='whitespace-nowrap'>{user[0]}</p>
                    <p className='whitespace-nowrap pl-8 text-left'>{user[1]}</p>
                  </div>
                  <div className='flex justify-end pl-8'>
                    <button onClick={() => deleteUser(user[0])} className='text-sm text-white text-center transition duration-150 hover:bg-red-900 bg-red-600 font-bold py-1 px-2 rounded ml-3'>Eliminar</button>
                  </div>

                </div>
                : null
            ))
          ) : null}
        </div>
      </div>

      <div>

        <h3 className='pt-4 font-bold'>Nuevo usuario</h3>

        <form onSubmit={handleSubmit}>

          <div className='flex flex-col'>
            <label htmlFor='userRut'>Rut</label>
            <input id='userRut' type='text' value={userRut} placeholder='0000000-0' onChange={handleUserRutChange}></input>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='userName'>Nombre de usuario</label>
            <input id='userName' type='text' value={userName} placeholder='Nombre' onChange={handleUserNameChange}></input>
          </div>
          <div className='flex justify-center'>
            <button className='text-sm text-white transition duration-150 hover:bg-[#b6efb0] bg-[#93c47d]  font-bold py-2 px-4 rounded mt-4'>Registrar</button>
          </div>

        </form>

      </div>
      {showAlert && (
        <AlertConfirm
          mensaje={mensaje}
          onCancel={handleConfirm} />
      )}
    </div>
  );
}

export default UsersList;