import { useEffect } from "react";
import { useAuthContext } from "../Contexts/AuthContext";

function NoProducts() {

    return (
        <div className="drop-shadow-2xl inset-0 z-10">
            <div className=" w-[100%] mx-auto rounded-lg shadow-xl bg-teal-300 sm:max-w-[500px]">
                    <img className="  mx-auto drop-shadow-2xl" src={require('../images/gato-sad.png')} alt='no hay productos'/>
                <div className="pb-6 text-center" >
                    <h5
                        className="mb-2 text-[2.5rem] font-medium leading-tight text-neutral-900 ">
                        No hay productos
                    </h5>
                </div>
            </div>
        </div>
    )

}

export default NoProducts;