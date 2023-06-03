import { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function HomeSlider () {

  const sliderRef = useRef();
  const sliderDiv = useRef();  
  const [counter, setCounter] = useState(0);

  const nextSlide = () => {
    const slideCount = sliderRef.current.childElementCount;
    const slideWidth = (sliderRef.current.offsetWidth)/3;         
    if(counter+1 === slideCount){
      setCounter(0);      
      sliderDiv.current.style.left = '0px';            
    } else{
      setCounter(counter+1);      
      sliderDiv.current.style.left = `-${(counter+1) * slideWidth}px`;           
    }    
  }

  const prevSlide = () => {
    const slideCount = sliderRef.current.childElementCount;
    const slideWidth = (sliderRef.current.offsetWidth)/3;
    if((counter-1)<0){
      setCounter(slideCount-1);
      sliderDiv.current.style.left = `-${(slideCount-1) * slideWidth}px`;
    } else{
      setCounter(counter-1);
      sliderDiv.current.style.left = `-${(counter-1) * slideWidth}px`;
    }
  }

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 4000);

    const handleResize = () => {
      sliderDiv.current.style.left = '0px';
      setCounter(0);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(slideInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [counter]);

  return(
    <div className='flex flex-row justify-center xl:px-32 2xl:px-72'>     
      
      <div className='overflow-hidden relative border-4 lg:border-8 lg:border-t-0 border-[#ff7795] lg:border-[#ffb2e0] rounded-b-xl'>

        <div className='absolute w-full h-full z-10 flex justify-between'>
          <button onClick={prevSlide}>
            <FaArrowLeft className='ml-4 text-[2rem] fill-white hover:text-[3rem] transition-all' />
          </button>
          <button onClick={nextSlide}>
            <FaArrowRight className='mr-4 text-[2rem] fill-white hover:text-[3rem] transition-all' />
          </button>
        </div>
        
        <div ref={sliderDiv} className='relative z-1 transition-all ease-in duration-500'>          
          <ul ref={sliderRef} className='w-[300%] -z-1 flex flex-row'>
            <li>
              <img alt='slider-sample' src={require('../images/slider-example.jpg')} />
            </li>
            <li>
              <img alt='slider-sample' src={require('../images/slider-example2.jpg')} />
            </li>
            <li>
              <img alt='slider-sample' src={require('../images/slider-example3.jpg')} />
            </li>           
          </ul>
        </div>
        
      </div>      
    </div>
  );
}

export default HomeSlider;