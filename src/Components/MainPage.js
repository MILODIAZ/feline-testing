import React from 'react';
import NavBar from './NavBar';
import CategoriesNav from './CategoriesNav';
import HomeMain from './HomeMain';

class MainPage extends React.Component{
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
            <HomeMain />
          </div>
        </main>    
      </div>
    );  
  }
}
  
export default MainPage;