import { create } from "zustand";

export const UseActiveFileTabStore = create((set) =>{
      return {
        activeFileTab: null,
        setactiveFiletab : (path, value, extension) => {
            set({
                activeFileTab : {
                    path : path,
                    value : value,
                    extension : extension
                }
            })
        }

      }
})