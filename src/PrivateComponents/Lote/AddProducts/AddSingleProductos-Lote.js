import React, {useEffect, useState} from 'react';

function  AddProductosLote(props){
    const [codProducto, setCodProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if(submitted){
            setSubmitted(false);
        }
    },[submitted])


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost/feline-testing/public/main.php?query=24&lote=${props.id}&codProducto=${codProducto}&cantidad=${cantidad}`)
        .then(response => response.json())
        .then(data => {
            if(data === true){
                alert('Producto agregado al lote');
            }
        }).catch(error => {
            alert('Error al agregar producto al lote')
            console.log(error);
        })

        console.log(codProducto, cantidad, props.id);
        setCodProducto('');
        setCantidad('');
        setSubmitted(true);
    }
    return(
        <div className='overflow-hidden'>
            <p className='text-lg font-bold'>Agregar nuevo producto al lote: {props.id}</p> 
            <form className='grid grid-cols-2 gap-2 w-[80%] m-auto font-bold' onSubmit={handleSubmit}>
                <div className='w-[90%] grid grid-cols-2 gap-2'>

                <label htmlFor='codProducto'>Codigo</label>
                <input className='w-[120px] rounded-[7px] border-solid border-[2px] border-[#000]' type='text' id='codProducto' value={codProducto} onChange={e => setCodProducto(e.target.value)}/>
                <label htmlFor='cantidad'>Cantidad</label>
                <input className='w-[120px] rounded-[7px] border-solid border-[2px] border-[#000]' type='number' id='cantidad' value={cantidad} onChange={e => setCantidad(e.target.value)}/>
                </div>
                <div className='m-auto'>
                <button className='bg-[#54e9d1] w-[100px] h-[40px] m-auto border-solid border-[2px] border-[#000] rounded-[10px]' type='submit'>Agregar</button>

                </div>
            </form>
            

        </div>
    )
}
export default AddProductosLote;