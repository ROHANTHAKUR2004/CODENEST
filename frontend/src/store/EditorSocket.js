import { create } from "zustand";

export const useEditorSocketStore = create((set) =>({
    editorsocket : null ,
    seteditorSocket : (incomingSocket) => {
          set ({
              editorsocket : incomingSocket 
          })
    }
}));