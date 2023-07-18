import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import DeleteCategorie from './Delete-Categories';
import AlertConfirm from "../Extras/AlertConfirm";


function CategoriesManager(props) {

  const [showAlert, setShowAlert] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const [dataLoaded, setDataLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch("http://localhost/feline-testing/public/main.php?query=1")
      .then(response => response.json())
      .then(data => {
        setDataLoaded(true);
        setCategories(data);

      })
      .catch(error => {
        setMensaje("UPS, ocurrio un error");
        setShowAlert(true);
      });
  };

  //ELMININAR CATEGORÍAS

  const deleteCategorie = () => {
    fetch(`http://localhost/feline-testing/public/main.php?query=9&categoria=${categorieNameDeleting}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data) {
          setDataLoaded(false);
          setMensaje("Categoria eliminada");
          setShowAlert(true);
          loadData();
          props.reloadCategories();

        }
      })
      .catch(error => {
        setMensaje("UPS, ocurrio un error");
        setShowAlert(true);
      });
  }

  const [deletingCategorie, setDeletingCategorie] = useState(false);

  const openDeleteCategorie = () => {
    if (deletingCategorie) {
      setDeletingCategorie(false);
    } else {
      setDeletingCategorie(true);
    }
  }

  const [categorieNameDeleting, setCategorieNameDeleting] = useState('');

  const [categorieName, setCategorieName] = useState('');

  const handleCategorieNameChange = (event) => {
    setCategorieName(event.target.value);
  }

  //AGREGAR CATEGORÍAS

  const insertCategorie = (event) => {
    event.preventDefault();
    fetch(`http://localhost/feline-testing/public/main.php?query=8&categoria=${categorieName}`)
      .then(response => response.json())
      .then(data => {
        if (data === true) {
          setDataLoaded(false);
          loadData();
          props.reloadCategories();
          setMensaje("Categoria agregada");
          setShowAlert(true);
        }

      })
      .catch(error => {
        setMensaje("La categoria ya existe.");
        setShowAlert(true);
      });
  }

  //LÓGICA MODIFICAR CATEGORIAS

  const [modCat, setModCat] = useState(false);
  const [modCatSelected, setModCatSelected] = useState('');
  const [categorieModName, setCategorieModName] = useState('');

  const handleCategorieModNameChange = (event) => {
    setCategorieModName(event.target.value);
  }

  const openModCat = (categorie) => {
    if (modCat) {
      setModCat(false);
      setCategorieModName('');
    } else {
      setModCat(true);
      setModCatSelected(categorie);
    }
  }

  const ModCategorie = (event) => {
    event.preventDefault();
    if (categorieModName !== '') {
      fetch(`http://localhost/feline-testing/public/main.php?query=11&modCatSelected=${modCatSelected}&categorieModName=${categorieModName}`)
        .then(response => response.json())
        .then(data => {
          openModCat(false);
          setDataLoaded(false);
          loadData();
          props.reloadCategories();
          setMensaje("Categoria modificada");
          setShowAlert(true);
        })
        .catch(error => {
          setMensaje("UPS, ocurrio un error");
          setShowAlert(true);
        });
    } else {
      setMensaje("Ingrese un nombre Valido");
      setShowAlert(true);
    }

  }
  const handleConfirm = () => {
    setShowAlert(false);
    props.handleClose()
  }

  return (
    <div className='fixed z-[99] inset-0 flex justify-center items-center'>
      {deletingCategorie ? <DeleteCategorie handleClick={openDeleteCategorie} name={categorieNameDeleting} deleteCategorie={() => { deleteCategorie(categorieName); openDeleteCategorie(); }} /> : null}
      <div className='flex flex-col bg-[#f8efe6] p-2 border-2 border-black text-[1.5rem] rounded-lg'>
        <div className='flex justify-end'>
          <button onClick={() => props.handleClose()}>
            <FaTimes className='hover:text-[#a5d5d5]' />
          </button>
        </div>
        <div className='p-8'>
          <div>
            <h3 className='text-[1.75rem] font-bold pb-3'>Administración de categorías</h3>
          </div>

          <div className='relative overflow-y-scroll min-h-[169px]' onScroll={() => { setModCat(false); setCategorieModName(''); }}>
            <div className='absolute w-full'>
              {dataLoaded ?
                (categories.map(categorie => (
                  ((modCat === true && categorie[0] === modCatSelected) ?

                    <div key={categorie[0]} >
                      <form onSubmit={ModCategorie} className='flex flex-row justify-between pb-2 mr-2'>
                        <input type='text' placeholder={categorie[0]} className='w-5/12' value={categorieModName} onChange={handleCategorieModNameChange} />
                        <div className='flex justify-end'>
                          <button type='submit' className='text-sm text-center transition duration-150 bg-[#54e9d1] font-bold py-1 px-2 border-[2px] border-[#000] rounded-[10px] ml-3'>Aceptar</button>
                          <button onClick={openModCat} className='text-sm text-center transition duration-150 bg-[#fc7494] font-bold py-1 px-2 border-[2px] border-[#000] rounded-[10px] ml-3'>Cancelar</button>
                        </div>
                      </form>
                    </div>

                    : <div key={categorie[0]} className='flex flex-row justify-between pb-2 mr-2'>
                      <p>{categorie[0]}</p>
                      <div className='flex justify-end'>
                        <button onClick={() => openModCat(categorie[0])} className='text-sm text-black transition duration-150 bg-[#54e9d1] font-bold py-2 px-4 border-solid border-[2px] border-[#000] rounded-[10px]'>Modificar</button>
                        <button onClick={() => { openDeleteCategorie(); setCategorieNameDeleting(categorie[0]); }} className='text-sm text-center transition duration-150 bg-[#fc7494] font-bold py-1 px-2 border-[2px] border-[#000] rounded-[10px] ml-3'>Eliminar</button>
                      </div>
                    </div>)
                ))) : null}
            </div>

          </div>

          <div>

            <h3 className='pt-4 font-bold text-center'>Nueva categoría</h3>
            <form onSubmit={insertCategorie}>
              <div className='flex flex-col text-center'>
                <label htmlFor='nombre'></label>
                <input className='text-center border-solid border-[2px] border-[#000] rounded-[10px]' name='nombre' type='text' placeholder='--Nombre de la Categoría --' value={categorieName} onChange={handleCategorieNameChange} autoComplete='off' />
              </div>
              <div className='flex justify-center'>
                <button className='text-sm text-black transition duration-150 bg-[#54e9d1] font-bold py-2 px-4 border-solid border-[2px] border-[#000] rounded-[10px] mt-3'>Agregar</button>
              </div>
            </form>

          </div>


        </div>
      </div>
      {showAlert && (
        <AlertConfirm
          mensaje={mensaje}
          onCancel={handleConfirm} />
      )}
    </div>
  );
}

export default CategoriesManager;