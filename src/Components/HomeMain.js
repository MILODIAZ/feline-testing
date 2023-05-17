import React, { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import ProductContainer from './ProductContainer';

function HomeMain() {

  const [dataLoaded, setDataLoaded] = useState(false);
  const [hotsales, setHotsales] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch("http://localhost/feline-testing/public/main.php?query=2")
      .then(response => response.json())
      .then(data => {
        setDataLoaded(true);
        setHotsales(data);
      })
      .catch(error => console.log(error));
  }

  const showProductContainer = () => {

    const productContainer = document.querySelector('#product-container');

    productContainer.classList.remove('invisible');
    productContainer.classList.remove('opacity-0'); 

  }

  if (!dataLoaded) {
    return <div>Cargando...</div>;
  } else {
    return (
      <div>

        <ProductContainer />

        <div className="xl:px-60 pt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8">
          {hotsales.map(hotsale => (
            <ProductCard key={hotsale[0]} name={hotsale[2]} price={hotsale[4]} img={hotsale[0]} handleClick={showProductContainer} />
          ))}
        </div>
      </div>
      
    );
  }
}

export default HomeMain;
