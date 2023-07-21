import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ProductoLote from "./Products-Lote";
import HeaderLote from "./Header-Lote";
import AddProductosLote from "./AddProducts/AddSingleProductos-Lote";
import AddMoreProducts from "./AddProducts/AddMoreProducts-Lote";

function LoteDetails(props) {
  const [productos, setProductos] = useState([]);
  const [openAddMoreProducts, setAddMoreProducts] = useState(false);
  const [loteId, setLoteId] = useState("");
  const [dataProductLoaded, setDataProductLoaded] = useState(false);

  const handleOpenAddProducts = () => {
    setAddMoreProducts(!openAddMoreProducts);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos  = () => {
    fetch(`http://localhost/feline-testing/public/main.php?query=22&lote=${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        setDataProductLoaded(true);
      })
      .catch((error) => console.log(error));
  };

  
  
  const reloadProducts = () => {
    cargarProductos();
  };

  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
  };
        
  return (
    <div className="fixed inset-0 z-[50] flex justify-center items-center">
      {openAddMoreProducts && (
        <AddMoreProducts
          handleClick={handleOpenAddProducts}
          handleClose={handleOpenAddProducts}
          id={loteId}
          proveedor={props.proveedor}
          agregarProducto={agregarProducto} 
          cargarProductos={reloadProducts}
        />
      )}
      <div className="flex flex-col bg-[#f8efe6] h-[90%] w-[80%] p-2 border-2 border-black rounded-l">
        <div className="flex justify-end">
          <button onClick={() => {props.handleClick();
            props.handleClose();
            props.recargarData();
          }}>
            <FaTimes className="text-3xl hover:text-[#a5d5d5]" />
          </button>
        </div>
        {/* Componente que contiene los detalles del Lote */}
        <HeaderLote
          id={props.id}
          diasRestantes={props.diasRestantes}
        />
        {/* Seccion body con los productos que posee el lote */}
        <div className="h-[20%] bg-[#fc7494] rounded-[10px] border-[2px] border-[#000] p-[15px] grid grid-cols-2 gap-4 mx-[20px]">
          {/* Menu agregar 1 producto */}
          <AddProductosLote id={props.id} cargarProductos={reloadProducts} agregarProducto={agregarProducto} /> {/* Pasa la función agregarProducto como prop */}
          {/* Menu agregar varios productos */}
          <button
            className="bg-[#54e9d1] w-[250px] font-bold h-[50px] m-auto border-solid border-[2px] border-[#000] rounded-[10px]"
            onClick={() => {
              handleOpenAddProducts();
              setLoteId(props.id);
            }}
          >
            Agregar Varios Productos
          </button>
        </div>
        <div className="grid grid-cols-2 h-[70%] overflow-y-scroll">
          {dataProductLoaded && productos.length > 0 ? (
            productos.map((producto) => (
              <ProductoLote
                key={producto[0]}
                id={producto[0]}
                nombre={producto[2]}
                stockEnviado={producto[9]}
                idLote={props.id}
                cargarProductos={reloadProducts}
              />
            ))
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoteDetails;
