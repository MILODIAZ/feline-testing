import React, { useEffect, useState, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CategoriesNav() {
  
  const sliderRef = useRef();
  const sliderDiv = useRef();  
  const [counter, setCounter] = useState(0);

  const nextCategories = () => {
    const slideCount = sliderRef.current.childElementCount;
    const slideWidth = sliderRef.current.offsetWidth;         
    if(counter+1 === Math.ceil(slideCount/3)){
      setCounter(0);      
      sliderDiv.current.style.left = '0px';            
    } else{
      setCounter(counter+1);      
      sliderDiv.current.style.left = `-${(counter+1) * slideWidth}px`;           
    }    
  }

  const prevCategories = () => {
    const slideCount = sliderRef.current.childElementCount;
    const slideWidth = sliderRef.current.offsetWidth;
    if((counter-1)<0){
      setCounter(Math.ceil(slideCount/3)-1);
      sliderDiv.current.style.left = `-${(Math.ceil(slideCount/3)-1) * slideWidth}px`;
    } else{
      setCounter(counter-1);
      sliderDiv.current.style.left = `-${(counter-1) * slideWidth}px`;
    }
  }

  const [dataLoaded, setDataLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch("http://localhost/feline-testing/public/main.php?query=1")
      .then(response => response.json())
      .then(data => {
        setDataLoaded(true);
        setCategories(data);
      })
      .catch(error => console.log(error));
  };

  if (!dataLoaded) {
    return <div>Cargando...</div>;
  } else {
    return (
      <div id='categoriesNav' className="lg:px-56 2xl:px-96 bg-[#ffb2e0] py-3 lg:flex lg:flex-row lg:justify-around">
        <button onClick={prevCategories} className='hidden lg:inline-block'>
          <FaArrowLeft className='text-[2rem] fill-white hover:fill-[#ff7795] transition-all' />
        </button>
        <div className='lg:w-full lg:relative overflow-hidden'>
          <div ref={sliderDiv} className='lg:w-full lg:absolute transition-all'>
            <ul ref={sliderRef} className='-z-1 text-[0.95rem] grid grid-cols-4 gap-y-3 lg:flex lg:flex-row lg:text-[1.5rem] lg:justify-start lg:text-center'>
              {categories.map(categorie => (
                <li key={categorie[0]} className='mx-auto'>
                  <a href={`/${categorie[0]}`} className='text-black hover:text-white uppercase transition-all'>{categorie[0]}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={nextCategories} className='hidden lg:inline-block'>
          <FaArrowRight className='text-[2rem] fill-white hover:fill-[#ff7795] transition-all' />
        </button>
      </div>
    );
  }
}

export default CategoriesNav;
