import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

function AddMoreProducts(props) {

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [unidades, setUnidades] = useState(0)
    useEffect(() => {
        dataProduct();
    }, []);

    const filteredProducts = products.filter(
        (product) =>
            product[2].toLowerCase().includes(searchQuery.toLowerCase()) ||
            product[0].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const dataProduct = () => {
        fetch("http://localhost/feline-testing/public/main.php?query=4")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.log(error));
    }

    const handleAdd = (product) => {
        const updatedProducts = products.filter((p) => p[0] !== product[0]);
        setProducts(updatedProducts);
        setSelectedProducts([...selectedProducts, product]);
    };

    const handleDelete = (product) => {
        const updatedSelectedProducts = selectedProducts.filter((p) => p[0] !== product[0]);
        setSelectedProducts(updatedSelectedProducts);
        setProducts([...products, product]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
      
        const product = selectedProducts[0];
        const unidadesProducto = 1;
        const codigoProducto = product;
        const codigoLote = props.loteId;
      
        const url = `http://localhost/feline-testing/public/main.php?query=24&lote=${codigoLote}&codProducto=${codigoProducto}&cantidad=${unidadesProducto}`;
      
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data) {
              console.log("Producto agregado al lote exitosamente");
            } else {
              console.log("Error al agregar el producto al lote");
            }
          })
          .catch((error) => {
            console.error(error);
            console.log("Error en la solicitud de inserción");
          });
      };

    return (
        <div className="fixed  bg-[#f8efe6] overflow-hidden z-[60] h-[80%] w-[80%]  border-solid border-[3px] border-[#000] rounded-[5px] p-2 flex flex-col">
            <div className=' flex justify-end '>
                <button onClick={() => props.handleClose()}>
                    <FaTimes className='text-3xl hover:text-[#a5d5d5]' />
                </button>
            </div>
            <div className="grid grid-cols-2 overflow-y-scroll h-[95%] text-[#fff]">
                {/* Todos los productos */}
                <div className=" p-2 text-[#000]">
                    <div className="flex">
                        {/* Filtro por nombre y codigo */}
                    <p className="text-[26px] text-[#000]"> Productos Disponibles</p>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o codigo"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-[40%] ml-[20px] p-2 mb-2 rounded border-solid border-[2px] border-[#000]"
                    />
                    </div>

                    <ul className=" h-[100%]">
                        {filteredProducts.map((product) => (
                            <li className="bg-[#fc7494] text-[#000] flex items-center justify-between my-2 h-[80px] w-[90%] rounded-[5px] border-solid border-[3px] border-[#000]">
                                <img alt='product' className='rounded h-[100%] ' src={require(`../../../productsImages/${product[0]}.jpg`)} />
                                <p className="text-xl text-bold ">
                                    {product[2]} | {product[0]}
                                </p>
                                <button onClick={() => handleAdd(product)}>
                                    <FaArrowRight className="bg-[#000] text-3xl rounded-[25px] border-solid border-[2px] border-[#000] my-auto text-[#fc7494] mr-4 hover:bg-[#54e9dd] hover:border-[#54e9dd] transition-all" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Productos seleccionados */}
                <div className="p-2">
                    {/* bg-[#f8efe6] */}
                    <div className="flex bg-[#f8efe6]">
                        <p className="text-[28px] text-[#000]"> Productos seleccionados</p>
                        <button type="submit" onClick={handleSubmit}
                            className=" m-auto p-2 bg-[#fc7494] border-solid border-[#000] border-[3px] text-[#000] rounded-[10px] font-bold ">
                            Enviar solicitud
                        </button>
                    </div>
                    <div>

                        <ul>
                            {selectedProducts.map((product) => (
                                <li className="bg-[#fc7494] text-[#000] flex items-center justify-between pr-[10px] my-2 h-[80px] w-[90%] rounded-[5px] border-solid border-[3px] border-[#000]">
                                    <img alt='product' className='rounded h-[100%] w-[15%]' src={require(`../../../productsImages/${product[0]}.jpg`)} />
                                    <p className="text-xl w-[50%] text-bold ">
                                        {product[2]}
                                    </p>
                                    <input className="w-[10%]" type="number" value={unidades} onChange={(e) => setUnidades(e.target.value)}/>
  <button className="w-[10%]" onClick={() => handleDelete(product)}>
                                        <FaArrowLeft className="bg-[#000] text-3xl rounded-[25px] border-solid border-[2px] border-[#000] my-auto text-[#fc7494] mr-4 hover:bg-[#54e9dd] hover:border-[#54e9dd] transition-all" />
                                    </button>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMoreProducts;