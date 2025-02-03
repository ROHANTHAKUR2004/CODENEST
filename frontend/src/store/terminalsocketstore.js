import { create } from "zustand";

export const useterminalsocketstore = create(( set ) => {

    return {
        terminalsocket :null,
        setterminalsocket : (incomingsocket)=> {
            set({
                terminalsocket : incomingsocket
            });
        }
    }
})