import { FaTimes } from 'react-icons/fa';
import { useRef } from 'react';

function ProductContainer (props) {

  const productContainerRef = useRef();

  const hideProductContainer = () => {

    productContainerRef.current.classList.add('invisible');
    productContainerRef.current.classList.add('opacity-0');

  }

  return (
    <div id='product-container' onClick={hideProductContainer} ref={productContainerRef} className='z-[99] drop-shadow-2xl fixed inset-0 flex justify-center items-center invisible opacity-0 transition-all'>

        <div className='flex flex-col sm:flex-row p-2'>
                   
        {/* NUEVA CARD */}
        <div class="max-w-md border border-gray-200 rounded-lg shadow bg-pink-300 dark:border-gray-700">
          <img className='rounded-t-lg' src={require(`../productsImages/${props.code}.jpg`)}/>
          <div className='p-5'>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
              {props.name}
            </h5>
            <p
              class="mb-3 font-normal text-gray-700 bold dark:text-gray-700">
              {props.description} 
            </p>
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
              Precio: ${props.price}
            </h5>
            <p
              class="mb-3 font-normal text-gray-700 dark:text-gray-700">
              Stock: {props.stock} 
            </p>
            <p
              class="mb-3 font-normal text-gray-700 dark:text-gray-900">
              Codigo del producto: {props.code} 
            </p>
          </div>
        </div>

      </div>

    </div>
    
  );
}

export default ProductContainer;