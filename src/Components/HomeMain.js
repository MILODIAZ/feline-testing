import React, { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import ProductContainer from './ProductContainer';
import HomeSlider from './HomeSlider';

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

  const [productCode, setProductCode] = useState('P001');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const showProductContainer = (prodCod, prodName, prodPrice, prodStock, prodDescription) => {

    const productContainer = document.querySelector('#product-container');

    productContainer.classList.remove('invisible');
    productContainer.classList.remove('opacity-0');
    
    setProductCode(prodCod);
    setProductName(prodName);
    setProductPrice(prodPrice);
    setProductStock(prodStock);
    setProductDescription(prodDescription);

  }

  if (!dataLoaded) {
    return <div>Cargando...</div>;
  } else {
    return (
      <div>

        <HomeSlider />

        <ProductContainer code={productCode} name={productName} price={productPrice} stock={productStock} description={productDescription} />

        <div className="xl:px-32 2xl:px-60 pt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8">
          {hotsales.map(hotsale => (
            <ProductCard key={hotsale[0]} name={hotsale[2]} price={hotsale[4]} img={hotsale[0]} handleClick={showProductContainer} stock={hotsale[5]} description={hotsale[3]}/>
          ))}
        </div>
        
      </div>
      
    );
  }
}

export default HomeMain;
