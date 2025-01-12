import { create } from "zustand"

export const useFileContextMenuStore = create((set) => ({
    x : null ,
    y : null ,
    isOpen : false ,
    File : null ,
    setX : (incomingX) => {
       set({
        x : incomingX
       }) 
    },
    setY : (incomingY) => {
        set({
            y : incomingY
        })
    },
    setIsopen : (incomingIsopen) => {
        set({
            isOpen : incomingIsopen
        })
    },
    setFile : (incomingFile) => {
         set({
            file : incomingFile
         })
    }  
}))