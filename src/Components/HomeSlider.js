function HomeSlider () {
  return(
    <div className='flex justify-center'>
      <div className='overflow-hidden border-4 border-[#ff7795] rounded-xl'>
        <img alt='slider-sample  w-full' src={require('../images/slider-example.jpg')} />
      </div>      
    </div>
  );
}

export default HomeSlider;