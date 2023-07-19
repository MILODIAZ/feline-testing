import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { RiErrorWarningLine } from "react-icons/ri";
import { Outlet, Link } from 'react-router-dom';

function AlertLote(props) {
    return (
        <div className='bg-[#fc7494] z-[60] border-solid border-[2px] border-[#000] rounded-[3px] p-4 justify-center items-center mx-10 my-4'>
            <div className="flex justify-end ">
                <button onClick={props.handleClose}>
                    <FaTimes className="text-xs hover:text-[#a5d5d5]" />
                </button>
            </div>
            <div className='text-center'>
                <div className="flex items-center justify-center mb-2">
                    <RiErrorWarningLine className='text-3xl' />
                    <span className="ml-2">ADVERTENCIA: EXISTEN LOTES QUE DEBERÍAN HABER LLEGADO</span>
                </div>
                <div className='text-xs'>
                    PARA VER EL DETALLE, INGRESA A LA SECCIÓN PRODUCCIÓN
                </div>
            </div>
        </div>

    );
}
export default AlertLote;