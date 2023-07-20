import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

function CambiarNosotros(props) {
  const [text, setText] = useState('Texto inicial');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch('http://localhost/feline-testing/public/main.php?query=29')
      .then(response => response.json())
      .then(data => setText(data[0].texto))
      .catch(error => console.log(error));
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
    setEditing(false);
  };

  const handleConfirmChange = () => {
    // Aquí realizas la solicitud para guardar el nuevo texto en la base de datos
    fetch(`http://localhost/feline-testing/public/main.php?query=30&nuevotexto=${text}`)
      .then(response => response.json())
      .then(data => {
        console.log('Texto actualizado en la base de datos:', data);
        setEditing(false);
      });
  };

  const handleOpenEditor = () => {
    setEditing(true);
  };

  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#f8efe6] z-[60] border-solid border-[3px] border-[#000] rounded-[5px] p-4 justify-center items-center'>
      <div className='flex justify-end'>
        <button onClick={() => props.handleClick()}>
          <FaTimes className='hover:text-[#a5d5d5]' />
        </button>
      </div>
      <div>
        <p className='text-2xl font-bold mb-2 text-center'>Nosotros</p>
        {editing ? (
          <div>
            <textarea
              value={text}
              onChange={handleTextChange}
              className='w-96 h-64'
            />
            <div className='flex justify-center'>
              <button
                onClick={handleConfirmChange}
                className="bg-[#54e9d1] w-[150px] font-bold h-[50px] mx-auto flex items-center justify-center border-solid border-[2px] border-[#000] rounded-[10px] mb-[20px] my-4"
              >Confirmar Cambio</button>
            </div>
          </div>
        ) : (
          <div>
            <div

              className='text-base bg-gray-100 border-2 border-gray-300 rounded-md p-2 cursor-pointer overflow-auto w-96 h-64'
            >
              {text}
            </div>
            <button
              className="bg-[#fc7494] w-[150px] font-bold h-[50px] mx-auto flex items-center justify-center border-solid border-[2px] border-[#000] rounded-[10px] mb-[20px] my-4"
              onClick={handleOpenEditor}
            >
              Modificar
            </button>
          </div>
        )}
      </div>
    </div>

  );
}

export default CambiarNosotros;









