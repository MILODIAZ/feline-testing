import React from 'react';
import NavBar from './NavBar';
import CategoriesNav from './CategoriesNav';

class NosotrosPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {  }
  }   
  
  render() {      
    return (
      <div >          
        <NavBar />
        <CategoriesNav />
        <main>
          <div>          
            
          </div>
        </main>    
      </div>
    );  
  }
}
  
export default NosotrosPage;