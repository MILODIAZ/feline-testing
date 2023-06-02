import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function ModProducts (props) { 

  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [formData, setFormData] = useState({
    codigo: props.code,
    nombre: props.name,
    proveedor: props.provider,
    categorias: [],
    precio: props.price,    
    stockRecomendado: props.recStock,
    stockMinimo: props.minStock,
    descripcion: props.description,
    imagen: null
  });

  const handleCodeChange = (event) => {
    const updatedFormData = {...formData, codigo: event.target.value.toUpperCase()};
    setFormData(updatedFormData);    
  };
  const handleNameChange = (event) => {
    const updatedFormData = {...formData, nombre: event.target.value};
    setFormData(updatedFormData);
  };
  const handlePriceChange = (event) => {
    if(event.target.value >= 0){
      const updatedFormData = {...formData, precio: event.target.value};
      setFormData(updatedFormData);
    }    
  };
  const handleRecommendedStockChange = (event) => {
    if(event.target.value >= 0){
      const updatedFormData = {...formData, stockRecomendado: event.target.value};
      setFormData(updatedFormData);
    } 
  };
  const handleMinimunStockChange = (event) => {
    if(event.target.value >= 0){
      const updatedFormData = {...formData, stockMinimo: event.target.value};
      setFormData(updatedFormData);
    } 
  };
  const handleDescriptionChange = (event) => {
    const updatedFormData = {...formData, descripcion: event.target.value};
    setFormData(updatedFormData);
  };
  const handleChangeCategories = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    }
    console.log(selectedCategories);
  };
  const handleProviderChange = (event) => {
    const selectedProvider = event.target.value;
    const updatedFormData = { ...formData, proveedor:selectedProvider };
    setFormData(updatedFormData);
  }
    
  const dataProviders = () => {
      fetch("http://localhost/feline-testing/public/main.php?query=5")
          .then(response => response.json())
          .then(data => {              
              setProviders(data);
          })
          .catch(error => console.log(error));
  };

  const dataCategory = () => {
    fetch("http://localhost/feline-testing/public/main.php?query=1")
        .then(response => response.json())
        .then(data => {            
            setCategories(data);
            /*data.map(categorie => {
              setSelectedCategories(prevSelectedCategories => [...prevSelectedCategories, categorie[0]]);
            });*/
            ModProdCategories();
        })
        .catch(error => console.log(error));
  };

  const ModProdCategories = () => {
    fetch(`http://localhost/feline-testing/public/main.php?query=12&code=${props.code}`)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          data.map(categorie => {
            setSelectedCategories(prevSelectedCategories => [...prevSelectedCategories, categorie[0]]);
          });
          setDataLoaded(true);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    dataProviders();
    dataCategory();    
  }, []);

  //PROPS PARA PLACEHOLDERS  
  
  return(
    <div className='fixed inset-0 z-[100] flex flex justify-center items-center'>
      <div className='flex flex-col bg-[#f8efe6] p-2 border-2 border-black rounded-lg'>
        <div className='flex justify-end'>
          <button onClick={()=>props.handleClick()}>
            <FaTimes className='hover:text-[#a5d5d5]'/>
          </button>
        </div>
        {dataLoaded?
        <div className='p-8'>
          <div>
            <p className='text-[1.75rem] font-bold pb-6'>Modificar {props.name}</p>
          </div>
          
          <div>
            <form>
              <div className='pb-2'>
                <span className='text-xs'>(*) Campos requeridos</span>
              </div>

              <div className='flex flex-row justify-between pb-2'>
                <label htmlFor='codigo' className='pr-6'>CÓDIGO *</label>
                <input autoComplete='off' type='text' name='codigo' placeholder={props.code} value={formData.codigo} onChange={handleCodeChange} />
              </div>

              <div className='flex flex-row justify-between pb-2'>
                <label htmlFor='nombre' className='pr-6'>NOMBRE *</label>
                <input autoComplete='off' type='text' name='nombre' placeholder={props.name} value={formData.nombre} onChange={handleNameChange}/>
              </div>

              <div className='flex flex-row justify-between pb-2'>              
                <label htmlFor='proveedor' className='pr-6'>PROVEEDOR</label>
                <select name='proveedor' onChange={handleProviderChange} value={formData.proveedor}>
                  <option id='SIN PROVEEDOR' value={'SIN PROVEEDOR'}>SIN PROVEEDOR</option>
                  {providers.map(provider => (
                    <option key={provider[0]} id={provider[0]} value={provider[0]} defaultValue={provider[0]==='Proveedor A'}>{provider[0]}</option>
                  ))}
                </select>
              </div>

              
              <div className='flex flex-row justify-between pb-2'>
                <div>
                  <label htmlFor='categorias' className='pr-6'>CATEGORÍAS</label>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  {categories.map(categorie => (
                    <div key={categorie[0]} className='flex min-w-[150px]'>
                      <input
                      type='checkbox'                      
                      value={categorie[0]}
                      name='categorias'
                      checked={selectedCategories.includes(categorie[0])}
                      onChange={handleChangeCategories}                     
                      />
                      <label className='mx-2' htmlFor={categorie[0]}>{categorie[0]}</label>
                    </div>                
                  ))}
                </div>                                       
              </div>

              <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='precio' className='pr-6'>PRECIO *</label>
              <div className='flex'>
                <p className='pr-2'>$</p>
                <input autoComplete='off' type='number' placeholder={props.price} name='precio' value={formData.precio} onChange={handlePriceChange} />
              </div>              
            </div>            

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='stockRecomendado' className='pr-6'>STOCK RECOMENDADO *</label>
              <input autoComplete='off' type='number' placeholder={props.recStock} name='stockRecomendado' value={formData.stockRecomendado} onChange={handleRecommendedStockChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='stockMinimo' className='pr-6'>STOCK MÍNIMO *</label>
              <input autoComplete='off' type='number' placeholder={props.minStock} name='stockMinimo' value={formData.stockMinimo} onChange={handleMinimunStockChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='descripción' className='pr-6'>DESCRIPCIÓN *</label>
              <input autoComplete='off' type='text' placeholder={props.description} name='descripción' value={formData.descripcion} onChange={handleDescriptionChange} />
            </div>

            <div className="flex flex-row justify-between pb-2">
              <label htmlFor='imagen' className="pr-6">IMAGEN</label>
              <input type="file" accept='image/*' id='imagen' name='imagen' />
            </div>

            <div className='mt-8 flex justify-center mb-[10px]'>
              <button className="text-sm text-black transition duration-150 hover:bg-pink-400 bg-pink-300 font-bold py-2 px-4 rounded">MODIFICAR</button>
            </div>

            </form>
          </div>           
        </div> : <span>Cargando</span> }
      </div>
    </div>
  );
}
  
export default ModProducts;