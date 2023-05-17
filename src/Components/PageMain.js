import React from 'react';
import ProductCard from "./ProductCard";

class PageMain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataLoaded:false,
      hotsales:[]
    }
  }

  loadData(){

    fetch("http://localhost/feline-testing/public/main.php?query=2")
    .then(response=>response.json())
    .then(data=>{      
      this.setState({ 
        dataLoaded:true,
        hotsales:data      
       })
    })
    .catch(error=>console.log(error));

  }  

  componentDidMount(){

    this.loadData();

  }

  render() {

    const {dataLoaded, hotsales}=this.state;

    if(!dataLoaded){ return(<div>Cargando...</div>) }
    else{
      return (
        <div className="xl:px-60 pt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8">          
          {hotsales.map(
            (hotsale)=>(<ProductCard key={hotsale[0]} name={hotsale[2]} price={hotsale[4]} img={hotsale[0]}/>)
          )}
        </div>
      );
    } 

  }
}

export default PageMain;