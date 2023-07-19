import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { RiErrorWarningLine } from "react-icons/ri";
import { Outlet, Link } from 'react-router-dom';

function AlertLote(props) {
    return (
        <div className='bg-red-600 z-[60] border-solid border-[2px] border-[#000] rounded-[3px] p-4 justify-center items-center mx-10 my-4'>
            <div className="flex justify-end">
                <button onClick={props.handleClose}>
                    <FaTimes className="text-xs hover:text-[#a5d5d5]" />
                </button>
            </div>
            <div className='item-center text-center text-white'>
                < RiErrorWarningLine className='text-4xl' />
                ADVERTENCIA : EXISTEN LOTES QUE DEBERIAN HABER LLEGADO
                <button className="bg-[#54e9d1] w-[150px] font-bold h-[50px] mx-auto flex items-center justify-center border-solid border-[2px] border-[#000] rounded-[10px] mb-[20px]" type="submit">
                    Ir
                </button>
            </div>

        </div>
    );
}
export default AlertLote;