import { FaTimes } from 'react-icons/fa';
import { useRef } from 'react';

function ProductContainer (props) {

  const productContainerRef = useRef();

  const hideProductContainer = () => {

    productContainerRef.current.classList.add('invisible');
    productContainerRef.current.classList.add('opacity-0');

  }

  return (
    <div id='product-container' onClick={hideProductContainer} ref={productContainerRef} className='z-[99] fixed inset-0 flex justify-center items-center invisible opacity-0 transition-all'>

      <div className="bg-[#ffb2e0] w-5/6 md:w-4/6 lg:w-7/12 xl:w-5/12 p-3 border-8 border-[#ff7795] rounded-lg">

        <div className='flex justify-end'>
          <button onClick={hideProductContainer}>
            <FaTimes className='text-[1.5rem] hover:fill-white transition-all'/>
          </button>
        </div>
        
        <div className='flex flex-col sm:flex-row p-2'>

          <div className='sm:w-11/12'>
            <p className='text-[11px]'>{props.code}</p>
            <img className='border-4 border-[#56efd3] rounded-lg' alt='product-image' src={require(`../productsImages/${props.code}.jpg`)}/>
          </div>

          <div className='text-center mt-3 sm:my-auto w-5/6 mx-auto sm:px-2'>
            <p className='text-2xl'>{props.name}</p>            
            <p className='text-3xl'>${props.price}</p>
            <p className='text-[11px]'>Disponible: {props.stock} un.</p>
            <p className='text-white'>{props.description}</p>
          </div> 

        </div>

      </div>

    </div>
    
  );
}

export default ProductContainer;