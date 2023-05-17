import { FaBars, FaTimes } from 'react-icons/fa';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function NavBar () {

  const navRef = useRef();
  const openNavButtonRef = useRef();  

  const showNavbar = () => {
    navRef.current.classList.toggle('translate-x-full');
    openNavButtonRef.current.classList.toggle('invisible');
  }

  const navClassNames='text-[1.5rem] p-3.5 hover:text-white transition-all'

  return(
    <div>
        <header className='xl:px-10 bg-[#56efd3] grid grid-cols-3 justify-items-center'>

          <h1 className='text-[1.5rem] lg:text-[2rem] text-center w-2/3 my-auto'>Tienda Feline</h1>   

          <a href='/' className='inline-block min-w-[80px] py-2 w-1/6 max-w-[100px]'>
              <img src={require('../images/feline-logo-2.jpg')} alt='feline-logo'/>
          </a>

          <nav ref={navRef} className='z-1 bg-[#ffb2e0] lg:bg-transparent translate-x-full lg:translate-x-0 fixed lg:relative top-0 right-0
          transition-transform lg:transition-none h-screen lg:h-fit lg:my-auto w-2/6'>
            <button className='p-5 lg:hidden' onClick={showNavbar}>
              <FaTimes className='text-[3rem] hover:fill-white transition-all'/>
            </button>
            <ul className='lg:flex lg:flex-row lg:justify-end lg:text-center '>
              <li><Link to={'/'} className={navClassNames}>INICIO</Link></li>
              <li><Link to={'/nosotros'} className={navClassNames}>NOSOTROS</Link></li>
              <li><a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/tienda_feline/' className={navClassNames}>INSTAGRAM</a></li>
            </ul>
          </nav>             
          
          <button ref={openNavButtonRef} className='w-1/3 lg:hidden' onClick={showNavbar}>
            <FaBars className='text-opacity-25 text-[3rem] hover:fill-white transition-all mx-auto'/>
          </button>
                       
        </header>
    </div>
  );

}

export default NavBar;