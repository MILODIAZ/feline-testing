import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ProductContainer from "./ProductContainer";
import ProductCard from "./ProductCard";


function CategorieMain () {  

  const [dataLoaded, setDataLoaded] = useState(false);
  const [categorieProducts, setCategorieProducts] = useState([]);

  useEffect(() => {
    loadData();
  });

  const loadData = () => {
    fetch(`http://localhost/feline-testing/public/main.php?query=3&categoria=${params.categorieID}`)
      .then(response => response.json())
      .then(data => {
        setDataLoaded(true);
        setCategorieProducts(data);
      })
      .catch(error => console.log(error));
  };

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

  const params = useParams();  

  if (!dataLoaded) {
    return <div>Cargando...</div>;
  } else {
    return (
    
      <div>

        <div className="flex justify-center">
          <h2 className="text-[2.5rem] text-white mt-8 px-2 bg-[#ff7795] align-middle rounded-2xl">{params.categorieID}</h2>
        </div>        
  
        <ProductContainer code={productCode} name={productName} price={productPrice} stock={productStock} description={productDescription} />
  
        <div className="xl:px-60 pt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8">
          {categorieProducts.map(categorieProducts => (
            <ProductCard key={categorieProducts[0]} name={categorieProducts[2]} price={categorieProducts[4]} img={categorieProducts[0]} handleClick={showProductContainer} stock={categorieProducts[5]} description={categorieProducts[3]}/>
          ))}
        </div>
      </div>
    );
  }
  
}

export default CategorieMain;