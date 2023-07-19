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
  }, []);
  return (
    <div>
      <div className="w-[60%] mx-auto text-center bg-[#fff] px-[20px] h-[80vh] justify-center">
        <h2 className="text-[3.5rem] pt-8">TIENDA FELINE</h2>
        <p className="text-xl py-[10px]">
          {texto}
        </p>
      </div>
    </div>
  );
}

export default NosotrosMain;
