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
  };

  const handleConfirmChange = () => {
    // Aquí realizas la solicitud para guardar el nuevo texto en la base de datos
    fetch(`http://localhost/feline-testing/public/main.php?query=30&nuevotexto=${text}`)
      .then(response => response.json())
      .then(data => {
        console.log('Texto actualizado en la base de datos:', data);
        setEditing(false);
      })
      
  };

  const handleOpenEditor = () => {
    setEditing(true);
  };

  return (
    <div className='fixed z-[99] inset-0 flex justify-center items-center'>
      <div className='flex flex-col bg-[#f8efe6] p-2 border-2 border-black text-[1.5rem] rounded-lg'>
        <div className='flex justify-end'>
          <button onClick={() => props.handleClick()}>
            <FaTimes className='hover:text-[#a5d5d5]' />
          </button>
        </div>
        <div className="CambiarNosotros">
          <h1>Texto Actual:</h1>
          {editing ? (
            <div>
              <textarea
                value={text}
                onChange={handleTextChange}
                style={{ width: '300px', height: '100px' }}
              />
              <button onClick={handleConfirmChange}>Confirmar Cambio</button>
            </div>
          ) : (
            <div onClick={handleOpenEditor}>
              <div
                style={{
                  overflowY: 'auto',
                  maxHeight: '300px',
                  wordWrap: 'break-word',
                }}
              >
                {text}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CambiarNosotros;








