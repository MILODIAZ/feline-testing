import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

function ModHeader(props) {

    { /*Variables para el cambio del Header*/ }

    const [formHeader, setFormHeader] = useState({
        idLote: props.id,
        ingresoFecha: props.fechaPedido,
        llegadaFecha: props.fechaLlegada,
        beforeIdLote: props.id
    });
    const resetFormHeader = () => {
        setFormHeader({
            idLote: props.id,
            ingresoFecha: props.fechaPedido,
            llegadaFecha: props.fechaLlegada,
            beforeIdLote: props.id
        })
    };

    { /*Actualizacion de las variables*/ }

    const handleIdChange = (event) => {
        const updatedFormData = { ...formHeader, idLote: event.target.value };
        setFormHeader(updatedFormData);
    };

    const handleIngresoFechaChange = (event) => {
        const updatedFormData = { ...formHeader, ingresoFecha: event.target.value };
        setFormHeader(updatedFormData);
    };
    const handleLlegadaFechaChange = (event) => {
        const updatedFormData = { ...formHeader, llegadaFecha: event.target.value };
        setFormHeader(updatedFormData);
    };

    {/*Funcion para el cambio del Header*/ }

    const ModHeaderData = (event) => {
        fetch(`http://localhost/feline-testing/public/main.php?query=23&codigo=${formHeader.idLote}&fechaPedido=${formHeader.ingresoFecha}&fechaLlegada=${formHeader.llegadaFecha}&lote=${formHeader.beforeIdLote}`)
            .then(response => response.json())
            .then(data => {
                resetFormHeader();
                alert(`Lote ${formHeader.beforeIdLote} ahora es ${formHeader.idLote}`);
            })
            .catch(error => {
                console.log(error);
                alert(`Ya existe una categoría ${formHeader.idLote}`)
            })
    }


    return (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#f8efe6] z-[60] border-solid border-[3px] border-[#000] rounded-[5px] flex justify-center items-center'>
            <div className='flex justify-end '>
                <button onClick={() => props.handleClose()}>
                    <FaTimes className='text-3xl hover:text-[#a5d5d5]' />
                </button>
            </div >
            <div className="p-8">
                <div>
                    <h3 className='text-[1.75rem] font-bold pb-6 '>Modificación del Lote</h3>
                </div>
                <div className='flex flex-row justify-between pb-2'>
                    <label htmlFor="lote" className="pr-6">Nuevo ID del Lote</label>
                    <input type="text" id="idLote" name="idLote" value={formHeader.idLote} onChange={handleIdChange} />
                </div>
                <div className='flex flex-row justify-between pb-2'>
                    <label htmlFor="lote" className="pr-6">Nuevo Fecha de Ingreso</label>
                    <input type="date" id="ingresoFecha" name="ingresoFecha" value={formHeader.ingresoFecha} onChange={handleIngresoFechaChange} />
                </div>
                <div className='flex flex-row justify-between pb-2'>
                    <label htmlFor="lote" className="pr-6">Nuevo Fecha de Llegada</label>
                    <input type="date" id="llegadaFecha" name="llegadaFecha" value={formHeader.llegadaFecha} onChange={handleLlegadaFechaChange} />
                </div>
                <button
                    onClick={ModHeaderData}
                    className="bg-[#54e9d1] w-[150px] font-bold h-[50px] m-auto border-solid border-[2px] border-[#000] rounded-[10px] mb-[20px]">
                    Actualizar Datos
                </button>
            </div >
        </div >
    )
}
export default ModHeader;