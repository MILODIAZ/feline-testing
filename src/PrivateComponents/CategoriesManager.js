import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import DeleteCategorie from './DeleteCategorie';

function CategoriesManager(props) {

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
      .catch(error => console.log(error));
  };

  //ELMININAR CATEGORÍAS

  const deleteCategorie = () => {    
    fetch(`http://localhost/feline-testing/public/main.php?query=9&categoria=${categorieNameDeleting}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data) {         
          setDataLoaded(false);
          loadData();
          props.reloadCategories();
        }
      })
      .catch(error => console.log(error));
  }

  const [deletingCategorie, setDeletingCategorie] = useState(false);

  const openDeleteCategorie = () => {
    if(deletingCategorie){
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
          alert("Categoría agregada con éxito");
        } else {
          alert('Error al agregar la categoría');
        }

      })
      .catch(error => {
        alert(`La categoría ${categorieName} ya existe.`);
        console.log(error)});
  }

  //LÓGICA MODIFICAR CATEGORIAS

  const [modCat, setModCat] = useState(false);
  const [modCatSelected, setModCatSelected] = useState('');
  const [categorieModName, setCategorieModName ] = useState('');

  const handleCategorieModNameChange = (event) => {
    setCategorieModName(event.target.value);
  }

  const openModCat = (categorie) => {
    if(modCat){
      setModCat(false);
    } else {
      setModCat(true);
      setModCatSelected(categorie);
    }    
  }

  const ModCategorie = (event) => {
    event.preventDefault();
    if(categorieModName!==''){
      fetch(`http://localhost/feline-testing/public/main.php?query=11&modCatSelected=${modCatSelected}&categorieModName=${categorieModName}`)
            .then(response => response.json())
            .then(data => {
                openModCat(false);
                setDataLoaded(false);
                loadData();
                props.reloadCategories();
                alert(`Categoría ${modCatSelected} ahora es ${categorieModName}`);
            })
            .catch(error => {
              console.log(error);
              alert(`Ya existe una categoría ${categorieModName}`)
            });
    } else {
      alert ('Ingrese un nombre válido.');
    }
    
  }

  return (
    <div className='fixed z-[99] inset-0 flex justify-center items-center'>
      {deletingCategorie? <DeleteCategorie handleClick={openDeleteCategorie} name={categorieNameDeleting} deleteCategorie={()=>{deleteCategorie(categorieName); openDeleteCategorie();}} /> : null}
      <div className='flex flex-col bg-[#f8efe6] p-2 border-2 border-black text-[1.5rem] rounded-lg'>
        <div className='flex justify-end'>
          <button onClick={() => props.handleClose()}>
            <FaTimes className='hover:text-[#a5d5d5]' />
          </button>
        </div>
        <div className='p-8'>
          <div>
            <h3 className='text-[1.75rem] font-bold pb-6'>Administración de categorías</h3>
          </div>

          <div className='relative overflow-y-scroll min-h-[169px]'>
            <div className='absolute w-full'>
              {dataLoaded? 
              (categories.map(categorie => (
                ((modCat===true && categorie[0]===modCatSelected)?
                
                  <div key={categorie[0]} >
                    <form onSubmit={ModCategorie} className='flex flex-row justify-between pb-2 mr-2'>
                      <input type='text' placeholder={categorie[0]} className='w-5/12' value={categorieModName} onChange={handleCategorieModNameChange}/>
                      <div className='flex justify-end'>
                        <button type='submit' className='text-sm text-white transition duration-150 hover:bg-[#b6efb0] bg-[#93c47d]  font-bold py-2 px-5 rounded'>Aceptar</button>
                        <button onClick={openModCat} className='text-sm text-white text-center transition duration-150 hover:bg-red-900 bg-red-600 font-bold py-2 px-2 rounded ml-3'>Cancelar</button>
                      </div>                      
                    </form>
                  </div>
                  
                : <div key={categorie[0]} className='flex flex-row justify-between pb-2 mr-2'>
                    <p>{categorie[0]}</p>
                    <div className='flex justify-end'>
                      <button onClick={()=>openModCat(categorie[0])} className='text-sm text-black transition duration-150 hover:bg-yellow-700 bg-yellow-500 font-bold py-2 px-4 rounded'>Modificar</button>
                      <button onClick={()=>{openDeleteCategorie(); setCategorieNameDeleting(categorie[0]);}} className='text-sm text-white text-center transition duration-150 hover:bg-red-900 bg-red-600 font-bold py-1 px-2 rounded ml-3'>Eliminar</button>
                    </div>              
                  </div>)                
              ))) : null }
            </div>
            
          </div>       

          <div>

            <h3 className='pt-4 font-bold'>Nueva categoría</h3>
            <form onSubmit={insertCategorie}>
              <div className='flex flex-col'>
                <label htmlFor='nombre'>Nombre</label>
                <input name='nombre' type='text' placeholder='categoría' value={categorieName} onChange={handleCategorieNameChange} autoComplete='off' />
              </div>
              <div className='flex justify-center'>
                <button className='text-sm text-white transition duration-150 hover:bg-[#b6efb0] bg-[#93c47d]  font-bold py-2 px-4 rounded mt-4'>Agregar</button>
              </div>
            </form>

          </div>


        </div>
      </div>
    </div>
  );
}

export default CategoriesManager;