import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../Components/ScrollToTopButton';
import SetStock from './Products/SetStock';
import DeleteProduct from './Products/Delete-Product';
import ModProducts from './Products/Mod-Products';
import AlertLote from './Extras/AlertLote';

function Inventario() {
    const [dataProductLoaded, setDataProductLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    {/* Alerta de Lotes con retrasos*/ }

    const [openAlert, setOpenAlert] = useState(false);

    const handleOpenAler = () => {
        setOpenAlert(!openAlert)
    };

    useEffect(() => {
        dataProduct();
    }, []);

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsVisible(scrollTop > 0);
    };

    const dataProduct = () => {
        fetch("http://localhost/feline-testing/public/main.php?query=4")
            .then(response => response.json())
            .then(data => {
                setDataProductLoaded(true);

                setProducts(data);
            })
            .catch(error => console.log(error));
    }

    const reloadProducts = () => {
        setDataProductLoaded(false);
        dataProduct();
    }

    // Categorias
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dataCategory();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const dataCategory = () => {
        fetch("http://localhost/feline-testing/public/main.php?query=1")
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.log(error));
    };

    // MODIFICAR STOCK
    const [openStock, setOpenStock] = useState(false);
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [productStock, setProductStock] = useState(0);

    const handleOpenStock = (code, name, stock) => {
        if (openStock) {
            setOpenStock(false);
            setProductCode('');
            setProductStock(0);
        } else {
            setOpenStock(true);
            setProductCode(code);
            setProductStock(stock);
            setProductName(name);
        }
    }

    //ELIMINAR PRODUCTO
    const [openDeleteProduct, setOpenDeleteProduct] = useState(false);

    const handleOpenDelete = (name, code) => {
        if (openDeleteProduct) {
            setOpenDeleteProduct(false);
            setProductName('');
            setProductCode('');
        } else {
            setOpenDeleteProduct(true);
            setProductName(name);
            setProductCode(code);
        }
    }
    const [selectedCategory, setSelectedCategory] = useState('todas');
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        if (selectedCategory === 'todas') {
            const filteredProducts = products.filter(product =>
                product[2].toLowerCase().includes(searchTerm.toLowerCase())
                || product[0].toLowerCase().includes(searchTerm.toLowerCase())
            )

            setCategoriesSelected(filteredProducts);
        } else {
            fetch(`http://localhost/feline-testing/public/main.php?query=3&categoria=${selectedCategory}`)
                .then(response => response.json())
                .then(data => {
                    const filteredProducts = data.filter(product =>
                        product[2].toLowerCase().includes(searchTerm.toLowerCase())
                        || product[0].toLowerCase().includes(searchTerm.toLowerCase()))
                    setCategoriesSelected(filteredProducts);
                })
                .catch(error => console.log(error));
        }
    }, [selectedCategory, selectedFilter, searchTerm, products]);

    const handleCategoryChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedCategory(selectedOption);
    }

    const handleFilterChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedFilter(selectedOption);
    }

    //LÓGICA DE FAVORITOS

    const [openModProd, setOpenModProd] = useState(false);

    const handleOpenModProd = () => {
        if (openModProd) {
            setOpenModProd(false);
        } else {
            setOpenModProd(true);
        }
    }

    const updateFavorite = (newStatus, codigo, setIcon) => {
        fetch(`http://localhost/feline-testing/public/main.php?query=10&favoriteStatus=${newStatus}&codigo=${codigo}`)
            .then(response => response.json())
            .then(data => {
                setIcon();
            })
            .catch(error => console.log(error));
    }

    const setIconTrue = (event) => {
        event.target.classList.remove('text-white');
        event.target.classList.remove('text-[25px]');
        event.target.classList.add('text-[#f7d000]');
        event.target.classList.add('text-[40px]');
    }

    const setIconFalse = (event) => {
        event.target.classList.remove('text-[#f7d000]');
        event.target.classList.remove('text-[40px]');
        event.target.classList.add('text-white');
        event.target.classList.add('text-[25px]');
    }

    const setFavorite = (event, codigo) => {
        if (event.target.classList.contains('text-white')) {
            updateFavorite(true, codigo, setIconTrue(event));
        } else {
            updateFavorite(false, codigo, setIconFalse(event));
        }
    }

    //MODIFICAR PRODUCTOS

    const [currentCode, setCurrentCode] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentProvider, setCurrentProvider] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentRecStock, setCurrentRecStock] = useState(0);
    const [currentMinStock, setCurrentMinStock] = useState(0);
    const [currentDescription, setCurrentDescription] = useState(0);

    return (
        <div>
            <AlertLote />
            {openModProd ? <ModProducts handleClick={handleOpenModProd} reloadProducts={reloadProducts} code={currentCode} name={currentName} provider={currentProvider} price={currentPrice} recStock={currentRecStock} minStock={currentMinStock} description={currentDescription} /> : null}
            {openDeleteProduct ? <DeleteProduct code={productCode} name={productName} handleClick={handleOpenDelete} reloadProducts={reloadProducts} /> : null}
            {openStock ? <SetStock stock={productStock} codigo={productCode} name={productName} handleClick={handleOpenStock} reloadProducts={reloadProducts} /> : null}
            <div>
                <div className='px-8 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2 mt-4'>

                    <label>Filtrar por categoría</label>
                    <select
                        className=' px-4 py-2 text-black w-[80%] rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-md'
                        value={selectedCategory} onChange={handleCategoryChange}>
                        <option id='todas' value={'todas'}>Todas</option>
                        {categories.map(categorie => (
                            <option key={categorie[0]} id={categorie[0]} value={categorie[0]}>
                                {categorie[0]}
                            </option>
                        ))}
                        <option id='Otros' value='Otros'>Otros</option>
                        <option id='Favoritos' value='Favoritos'>Favoritos</option>
                    </select>

                    <label>Filtro por stock</label>
                    <select
                        className=' px-4 py-2 w-[80%] rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-md'
                        value={selectedFilter} onChange={handleFilterChange}>
                        <option value="all">---</option>
                        <option value="overstock">Recomendado</option>
                        <option value='normalstock'>Aceptable</option>
                        <option value="lowstock">Bajo</option>
                    </select>
                </div>
                <div className='px-8 py-3'>

                    <label>Buscar:</label>
                    <input
                        className="px-8 py-3 w-[80%] max-w-[600px] ml-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        type='text'
                        placeholder='Ingrese nombre o codigo del producto...'
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)} />
                </div>
            </div>
            <div className="lg:p-8 rounded-md w-[100%]">
                <ScrollToTopButton>

                    <div className={`fixed bottom-4 text-2xl right-4 bg-gray-800 text-white px-[22px] py-2 rounded-md shadow-xl 
                transition duration-300 hover:bg-gray-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        Arriba</div>
                </ScrollToTopButton>
                <div className=" flex items-center  justify-between pb-6">
                    <div>
                        <div className="lg:-mx-4 w-[100%]  px-4 sm:px-8  overflow-x-auto">
                            <div className="inline-block  shadow rounded-lg overflow-hidden ">
                                <table className='min-w-[100%] w-[100%] leading-normal'>
                                    {dataProductLoaded ?
                                        <tbody>

                                            {categoriesSelected.map(product => {
                                                const isOverstock = product[5] >= product[6];
                                                const isLowStock = product[5] < product[7];
                                                const isNormalStock = (product[5] < product[6] && product[5] >= product[7]);
                                                if (
                                                    (selectedFilter === 'all') ||
                                                    (selectedFilter === 'overstock' && isOverstock) ||
                                                    (selectedFilter === 'lowstock' && isLowStock) ||
                                                    (selectedFilter === 'normalstock' && isNormalStock)
                                                ) {
                                                    return (
                                                        <tr key={product[0]} className={`rounded px-[10px] items-center border-solid border-2 border-gray-400 w-[100%] h-[150px] inline-flex mt-2 xs:mt-0
                                            
                                            ${(() => {
                                                                switch (true) {
                                                                    case product[5] >= product[6]:
                                                                        return 'bg-[#b6efb0]';
                                                                    case product[5] < product[7]:
                                                                        return 'bg-[#eb8792]';
                                                                    default:
                                                                        return 'bg-[#fff2cc]';
                                                                }
                                                            })()}
                                            
                                            `}>
                                                            {/* Nombre e imagen */}
                                                            <td className='w-[40%] px-5 py-5 border-gray-200 text-sm'>
                                                                <div className='flex items-center'>
                                                                    <div className='w-[10%] pr-16 flex w-[40px] h-[40px]'>
                                                                        <button className='w-[40px]'>
                                                                            <p onClick={(event) => setFavorite(event, product[0])} className={product[8] ? 'text-[#f7d000] text-[40px] transition-all' : 'text-white text-[25px] transition-all'}>&#9733;</p>
                                                                        </button>
                                                                    </div>
                                                                    <div className='w-[45%]  flex-shrink-0'>
                                                                        <img alt='product' className='rounded h-[140px] lg:h-[140px]  min-w-1/2' src={require(`../productsImages/${product[0]}.jpg`)} />
                                                                    </div>
                                                                    <div className='w-[45%] ml-3 text-lg md:text-xl lg:text-2xl'>
                                                                        <h2 className='text-gray-900 font-bold whitespace-no-wrap'>
                                                                            {product[2]}
                                                                        </h2>
                                                                        <p className='text-sm md:text-md lg:text-md text-gray-900  whitespace-no-wrap'>
                                                                            {product[0]}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            {/* Stock */}
                                                            <td className='w-[40%] px-5 py-5 border-gray-200'>
                                                                <p className='text-md md:text-xl lg:text-2xl font-bold text-gray-900 whitespace-no-wrap'>
                                                                    Stock: {product[5]}
                                                                </p>
                                                                <p className='sm:text-md lg:text-md text-gray-900 whitespace-no-wrap'>
                                                                    Recomendado: {product[6]}
                                                                </p>
                                                                <p className='sm:text-md lg:text-md text-gray-900 whitespace-no-wrap'>
                                                                    Mínimo: {product[7]}
                                                                </p>

                                                            </td>


                                                            {/* Botones */}
                                                            <td>
                                                                <button
                                                                    onClick={() => handleOpenStock(product[0], product[2], product[5])}
                                                                    className="text-sm text-white transition duration-150 hover:bg-indigo-900 bg-blue-600 font-bold py-2 px-4 rounded-l">
                                                                    Actualizar Stock
                                                                </button>
                                                            </td>

                                                            <td>

                                                                <button
                                                                    onClick={() => {
                                                                        handleOpenModProd();
                                                                        setCurrentCode(product[0]);
                                                                        setCurrentName(product[2]);
                                                                        if (product[1] === null) {
                                                                            setCurrentProvider('SIN PROVEEDOR');
                                                                        } else {
                                                                            setCurrentProvider(product[1]);
                                                                        }
                                                                        setCurrentPrice(product[4]);
                                                                        setCurrentRecStock(product[6]);
                                                                        setCurrentMinStock(product[7]);
                                                                        setCurrentDescription(product[3]);
                                                                    }}
                                                                    className="text-sm text-black transition duration-150 hover:bg-yellow-700 bg-yellow-500 font-bold py-2 px-4">
                                                                    Modificar Producto
                                                                </button>
                                                            </td>

                                                            <td>
                                                                <button
                                                                    onClick={() => handleOpenDelete(product[2], product[0])}
                                                                    className="text-sm text-white transition duration-150 hover:bg-red-900 bg-red-600 font-bold py-2 px-4 rounded-r">
                                                                    Eliminar Producto
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                } else { return null; }
                                            })}
                                        </tbody> : null}

                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Inventario;