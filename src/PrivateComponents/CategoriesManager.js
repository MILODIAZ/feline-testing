import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';



function CategoriesManager (props) {

  const [dataLoaded, setDataLoaded] = useState(false);
  const [categories, setCategories] = useState([]);  

  useEffect(() => {
    loadData();
  },[]);

  const loadData = () => {
    fetch("http://localhost/feline-testing/public/main.php?query=1")
      .then(response => response.json())
      .then(data => {
        setDataLoaded(true);
        setCategories(data);
      })
      .catch(error => console.log(error));
  };

  const deleteCategorie = () => {
    
  }

  const [categorieName, setCategorieName] = useState('');

  const handleCategorieNameChange = (event) => {
    setCategorieName(event.target.value);
  }

  const insertCategorie = (event) => {
    event.preventDefault();
    console.log(categorieName);
    fetch(`http://localhost/feline-testing/public/main.php?query=8&categoria=${categorieName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data){
          alert("Categoria ingresada");
          setDataLoaded(false);          
          loadData();
        }        
      })
      .catch(error => console.log(error));
  }

  return(
    <div className='fixed z-[99] inset-0 flex justify-center items-center'>
      <div className='flex flex-col bg-[#f8efe6] p-2 border-2 border-black text-[1.5rem] rounded-lg'>
        <div className='flex justify-end'>          
          <button onClick={()=>props.handleClose()}>
            <FaTimes className='hover:text-[#a5d5d5]' />
          </button>
        </div>
        <div className='p-8'>
          <div>
            <h3 className='text-[1.75rem] font-bold pb-6'>Administración de categorías</h3>
          </div>

          {dataLoaded? 
          (categories.map(categorie => (
            <div key={categorie[0]} className='flex flex-row justify-between pb-2'>
              <p>{categorie[0]}</p>
              <div className='flex justify-end'>
                <button className='text-sm text-black transition duration-150 hover:bg-yellow-700 bg-yellow-500 font-bold py-2 px-4 rounded'>Modificar</button>
                <button onClick={() => deleteCategorie(categorie[0])} className='text-sm text-white text-center transition duration-150 hover:bg-red-900 bg-red-600 font-bold py-1 px-2 rounded ml-3'>Eliminar</button>
              </div>              
            </div>
          ))) : null }

          <div>

            <h3 className='pt-4 font-bold'>Nueva categoría</h3>
            <form onSubmit={insertCategorie}>
              <div className='flex flex-col'>
                <label htmlFor='nombre'>Nombre</label>
                <input name='nombre' type='text' placeholder='Nombre' value={categorieName} onChange={handleCategorieNameChange} />
              </div>
              <div>
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