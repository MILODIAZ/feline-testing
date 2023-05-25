function ProductCard (props) {  

  return (
    <div className='rounded-2xl border-2 border-[#56efd3] bg-[#56efd3] w-9/12 mx-auto transition-all hover:border-[#ff7795] hover:bg-[#ff7795] hover:border-4 hover:-translate-y-2'>
      <button onClick={() => props.handleClick(props.img, props.name, props.price, props.stock, props.description)}>
        <img className='rounded-2xl pb-2' alt='product' src={require(`../productsImages/${props.img}.jpg`)}/>
        <p>{props.name}</p>
        <p>${props.price}</p>
      </button>          
    </div>
  );
}

export default ProductCard;