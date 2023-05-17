import React from 'react';
import NavBar from './NavBar';
import CategoriesNav from './CategoriesNav';
import PageMain from './PageMain';

class HomePage extends React.Component{
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
            <PageMain />
          </div>
        </main>    
      </div>
    );  
  }
}
  
export default HomePage;