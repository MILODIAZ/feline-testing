import React, { useRef, useState } from 'react';
import axios from 'axios';

function CambiarSlider(props) {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = async () => {
    if (!image) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);

      // Enviamos la imagen al servidor
      await axios.post('', formData);

      alert('Imagen cambiada exitosamente.');

      // Cerramos la ventana emergente
      props.handleClick();
    } catch (error) {
      console.log(error);
      alert('Hubo un error al cambiar la imagen.');
    }
  };

  const handleDefaultImage = () => {
    setImage(null); // Elimina la imagen actual seleccionada
  };

  return (
    <div className='fixed z-[99] inset-0 flex justify-center items-center'>
      <div className='flex flex-col bg-[#f8efe6] p-2 border-2 border-black text-[1.5rem] rounded-lg'>
        <div className='flex justify-end'>
          <button onClick={() => props.handleClick()}>Cerrar</button>
        </div>
        <div className='p-8'>
          <div>
            <h3 className='text-[1.75rem] font-bold pb-6'>Cambiar Slider</h3>
            <div>
              <input type='file' onChange={handleImageUpload} ref={fileInputRef} />
              {image ? (
                <div>
                  <img src={image} alt='Uploaded' />
                  <button onClick={handleDefaultImage}>Eliminar imagen</button>
                </div>
              ) : (
                <div>
                  <p>Selecciona una imagen para cambiar el slider.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <button onClick={handleImageChange}>Confirmar</button>
      </div>
    </div>
  );
}

export default CambiarSlider;




