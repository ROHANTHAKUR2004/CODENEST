import { create } from "zustand";

export const useActiveFileTabStore = create((set) =>{
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