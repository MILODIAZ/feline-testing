import { FaTimes } from 'react-icons/fa';

function SetStock (props) {
  return (
    <div className='fixed z-[99] inset-0 flex justify-center items-center transition-all'>
      <div className='flex flex-col bg-[#eeeeee] p-2 border-2 border-black text-[1.5rem] '>
        <div className='flex justify-end'>
          <button onClick={() => props.handleClick()}>
            <FaTimes />
          </button>
        </div> 
        <div>
          <p>Indique el stock</p>
        </div>              
      </div>
    </div>
  );
}

export default SetStock;