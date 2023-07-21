import { useState } from "react";
import { useEffect } from "react";



function NosotrosMain(props) {
  // CARGAR TEXTO
  const [texto, setTexto] = useState('Cargando...');

  useEffect(() => {
    fetch('http://localhost/feline-testing/public/main.php?query=29')
      .then(response => response.json())
      .then(data => setTexto(data[0].texto)) // Accedemos al primer elemento del array
      .catch(error => console.log(error));
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="h-[80vh]">
      <div className=" fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#56efd3] z-[60] border-solid border-[2px] border-black rounded-[10px] p-4 justify-center items-center my-10">
        <p className="text-4xl pt-2 text-center">TIENDA FELINE</p>
        <p className="text-xl py-[10px] mx-10">
          {texto}
        </p>
      </div>
    </div>
  );
}

export default NosotrosMain;
