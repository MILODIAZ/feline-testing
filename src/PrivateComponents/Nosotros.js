import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function CambiarNosotros(props) {
  const [text, setText] = useState('Texto inicial');
  const [editing, setEditing] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleConfirmChange = () => {
    setEditing(false);
  };

  const handleOpenEditor = () => {
    setEditing(true);
  };

  if (editing) {
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
            <textarea
            value={text}
           onChange={handleTextChange}
            style={{ width: '300px', height: '100px' }}
          />
          <button onClick={handleConfirmChange}>Confirmar Cambio</button>
          </div>
        </div>
      </div>
    );
  } else {
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
            <p onClick={handleOpenEditor}>{text}</p>
          </div>
        </div>
      </div>
      
    );
  }
}

export default CambiarNosotros;



