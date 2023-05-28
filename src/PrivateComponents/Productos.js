import { useState, useEffect } from 'react';


function Productos(){
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [dataCategoryLoaded, setDataCategoryLoaded] = useState(false);
  
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    proveedor: '',
    categorias: [],
    precio: '',
    stock: '',
    stockRecomendado: '',
    stockMinimo: '',
    descripcion: '',
    imagen: null
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, imagen: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes acceder a los valores de formData y realizar las acciones necesarias, como enviarlos a través de una solicitud HTTP.
    console.log(formData);
  };

  useEffect(() => {
    dataProviders();
    dataCategory();
  }, []);

  const dataProviders = () => {
    fetch("http://localhost/feline-testing/public/main.php?query=5")
        .then(response => response.json())
        .then(data => {
            setDataCategoryLoaded(true);
            setProviders(data);
        })
        .catch(error => console.log(error));
  };

  const dataCategory = () => {
      fetch("http://localhost/feline-testing/public/main.php?query=1")
          .then(response => response.json())
          .then(data => {
              setDataCategoryLoaded(true);
              setCategories(data);
          })
          .catch(error => console.log(error));
  };

  return(
    <div>

      <div className='flex flex-row justify-between py-8'>
        <div className='w-6/12 text-center'>
          <button className='underline hover:text-blue-500'>+ NUEVO PRODUCTO</button>
        </div>
        <div className='w-6/12 text-center'>            
          <button className='underline hover:text-blue-500'>CATEGORÍAS</button>          
        </div>
      </div>

      <div className='flex flex-row p-24'>
        <div className='w-6/12'>
            <div className='rounded-2xl border-2 border-[#56efd3] bg-[#56efd3] min-w-[250px] w-5/12 mx-auto transition-all hover:border-[#ff7795] hover:bg-[#ff7795] hover:p-[1px] hover:-translate-y-2'>
              <div className='h-full flex flex-col justify-between'>
                <img className='rounded-2xl pb-2' alt='product' src={require(`../productsImages/P001.jpg`)}/>
                <p className='font-bold mx-auto p-1'>Aros de gato</p>
                <p className='mx-auto text-[1.25rem] pb-1'>$3990</p>
              </div>          
            </div>
          </div>
        <div>
          <form onSubmit={handleSubmit}>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='codigo' className='pr-6'>CÓDIGO</label>
              <input type='text' id='codigo' name='codigo' onChange={handleInputChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='nombre' className='pr-6'>NOMBRE</label>
              <input type='text' id='nombre' name='nombre' onChange={handleInputChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>              
              <label htmlFor='proveedor' className='pr-6'>PROVEEDOR</label>
              <select id='proveedor' name='proveedor'>
                <option id='SIN PROVEEDOR' value={'SIN PROVEEDOR'}>SIN PROVEEDOR</option>
                {providers.map(provider => (
                  <option key={provider[0]} id={provider[0]} value={provider[0]}>{provider[0]}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <div>
                <label htmlFor='categorias' className='pr-6'>CATEGORÍAS</label>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                {categories.map(categorie => (
                  <div key={categorie[0]}>
                    <input type='checkbox' id={categorie[0]} value={categorie[0]} name='categorias' />
                    <label htmlFor={categorie[0]}>{categorie[0]}</label>
                  </div>                
                ))}
              </div>                                       
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='precio' className='pr-6'>PRECIO</label>
              <div className='flex'>
                <p className='pr-2'>$</p>
                <input type='text' id='precio' name='precio' onChange={handleInputChange} />
              </div>              
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='stock' className='pr-6'>STOCK</label>
              <input type='text' id='stock' name='stock' onChange={handleInputChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='stockRecomendado' className='pr-6'>STOCK RECOMENDADO</label>
              <input type='text' id='stockRecomendado' name='stockRecomendado' onChange={handleInputChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='stockMinimo' className='pr-6'>STOCK MÍNIMO</label>
              <input type='text' id='stockMinimo' name='stockMinimo' onChange={handleInputChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='descripción' className='pr-6'>DESCRIPCIÓN</label>
              <input type='text' id='descripción' name='descripción' onChange={handleInputChange} />
            </div>

            <div className="flex flex-row justify-between pb-2">
              <label htmlFor='imagen' className="pr-6">IMAGEN</label>
              <input type="file" id='imagen' name='imagen' onChange={handleFileChange} />
            </div>

            <div className='mt-8'>
              <button>+Agregar Producto</button>
            </div>

          </form>
        </div>          
      </div>

    </div>
  );
}

export default Productos;